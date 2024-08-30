import React from 'react'
import Popular from '../popular/Popular'
import NewCollection from '../newCollection/NewCollection'
import Banner from '../banner/Banner'
import Newsletter from '../newsletter/Newsletter'
import Main from '../main/Main'

const Home = () => {
  return (
    <div>
        <Main/>
        <Popular/>
        <Banner/>
        <NewCollection/>
        <Newsletter/>
    </div>
  )
}

export default Home