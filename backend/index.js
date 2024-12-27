import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import Product from './model/productSchema.js'
import User from './model/userSchema.js'
import {v2 as cloudinary} from 'cloudinary'


dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const app = express()
const port = process.env.PORT
const dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:["https://e-commerce-admin-87jj.onrender.com"],
    // origin:["http://localhost:3000"],
    methods:["POST","GET","PUT","DELETE"],
    credentials: true
}))

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Connected'))

// image storage

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ message: 'No file uploaded' });
    }
    const result = await cloudinary.uploader.upload_stream({ resource_type: 'auto'},(error, result) => {
        if (error) {
          return res.json({ message: 'Error uploading file', error });
        }
        res.status(200).json({
          success: true,
          image_url: result.secure_url,
        });
      }
    );
    result.end(req.file.buffer);

  } catch (error) {
    console.error(error);
    res.json({ message: 'Server error' });
  }
});


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
    product.save()
    res.json({
        success:true,
        name:req.body.name
    })

})

// Delete product

app.delete('/removeproduct/:id',async (req,res)=>{
    const data = await Product.findOne({id:req.params.id})
    const imageUrl = data.image

    await cloudinary.uploader.destroy(imageUrl.split('/').pop().split('.')[0])

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
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '10d'});
                res.cookie("token", token, {
                    maxAge:10*24*60*1000,
                    httpOnly: false,
                    secure: true, 
                    sameSite:"strict"
                  })
                res.json({Status:"Success"})
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
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '10d' });
            res.cookie("token", token, {
                maxAge:10*24*60*1000,
                httpOnly: false,
                secure: true, 
                sameSite:"strict"
              })
            res.json({Status:"Success"});
        }else{
            return res.json({message:"Email already exists"})
        }
    }catch(error){
        console.log(error)
    }
})

// middleware

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        res.json({Status:"No token"})
    }else{
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
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

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(dirname,"/frontend/build")))
    app.use("*",(req,res)=>{
        res.sendFile(path.resolve(dirname,"frontend","build","index.html"))
    })
}

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})