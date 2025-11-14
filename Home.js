import React, { Fragment } from 'react'
import Header from './Header'
import Movies from './Movies'
import Footer from './Footer'
import { Outlet, useNavigate } from "react-router-dom"


function Home() { 
  const routers = useNavigate()
  return (
    <Fragment>
      <div className='main-container'>
        <div className='head-container'>
           <Header></Header>
           
        </div>

        <div className='product-list'>
            <Movies></Movies>
            
        </div>
        <div className='footer-container'>
             <Footer></Footer>
        </div>

      </div>
    </Fragment>
  )
}

export default Home