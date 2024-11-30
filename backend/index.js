import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const port = 4000
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(()=>console.log('Connected'))

// image storage

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename: (req,file,cb) =>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use('/images',express.static('upload/images'))

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:true,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// create products

const Product = mongoose.model('Product',{
    id:{ type: Number, required:true },
    name : { type:String, required:true },
    image : { type:String, required: true },
    category : {type:String, required: true},
    new_price: { type:Number, required: true },
    old_price: { type:Number, required:true },
    date: {type:Date, default:Date.now },
    available :{type:Boolean, default: true}
})

app.post('/addproduct', async (req,res)=>{

    const products =await Product.find({})
    let id;
    if(products.length>0){
        let last_product_arr = products.slice(-1)
        let last_product = last_product_arr[0]
        id = last_product.id + 1
    }else{
        id = 1
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    })
    console.log(product)
    product.save()
    console.log("saved")
    res.json({
        success:true,
        name:req.body.name
    })

})

// Delete product

app.delete('/removeproduct/:id',async (req,res)=>{
    await Product.findOneAndDelete({id:req.params.id})
    res.json({
        success:true,
        name:req.body.name
    })
})

//Get all products

app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({})
    res.json({products})
})

//get new collections

app.get('/newcollections', async (req,res)=>{
    const products = await Product.find({})
    const newcollection = products.slice(-8)
    res.json(newcollection)
})

//get popular in women

app.get('/popularinwomen', async (req,res)=>{
    let products = await Product.find({category:"women"})
    let product_in_women = products.slice(0,4)
    res.json(product_in_women)
})

//Register and login schema

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData:{ type:Object },
    date:{ type:Date, default:Date.now }
});

const User = mongoose.model("users",UserSchema)

//-------------- Register ----------

app.post('/register',async (req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    let cart = {}

    try{
        const user =await User.findOne({email:email})
        if(user){
            return res.json({message:"Email already exists"})
        }else{
            const hashPassword =await bcrypt.hash(password.toString(),10)

            for (let i=0;i<300;i++){
                cart[i]=0
            }

            const user = await User.create({
                name:name,
                email:email,
                password:hashPassword,
                cartData:cart
            })
                const token = jwt.sign({ id: user._id }, "jwt-private-key", { expiresIn: '1h' });
                res.json({Status:"Success",token})
        }
    }catch(error){
        console.log(error)
    }
})

//--------------------- Login ----------------------------
app.post('/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    try{
        const user =await User.findOne({email:email})
        if(user){
            const comparePassword =await bcrypt.compare(password,user.password)
            if (!comparePassword) return res.json({Status:'Invalid credentials'});
            const token = jwt.sign({ id: user._id }, "jwt-private-key", { expiresIn: '1h' });
            res.json({Status:"Success", token});
        }else{
            return res.json({message:"Email already exists"})
        }
    }catch(error){
        console.log(error)
    }
})

// middleware

const verifyUser = (req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        res.json({Status:"Unauthorized"})
    }else{
        jwt.verify(token,"jwt-private-key",(err,decoded)=>{
            if(err){
                res.json({Status:"Unauthorized"})
            }else{
                req.user = decoded
                next()
            }
        })
    }
}

//add cartdata

app.post('/addtocart',verifyUser, async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.json({Status:"Added"})
})

// remove cartdata

app.post('/removefromcart',verifyUser, async(req,res)=>{
    let userData = await User.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.json({Status:"Removed"})
})

//== cartdata value

app.get('/getcart',verifyUser, async(req,res)=>{
    console.log("getCart")
    let userData = await User.findOne({_id:req.user.id})
    res.json(userData.cartData)
})

app.listen(port,()=>{
    console.log("Server running")
})