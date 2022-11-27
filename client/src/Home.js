import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Bottom from './componenets/Bottom'
import Header from './componenets/Header'

import SideBar from './componenets/SideBar'

const Home = () => {

    return (
        <div>

            <div className='home-container'>
                <div className='profit'>
                    <p>หน้าหลัก</p>
                </div>
            </div>

            <div>
                
            </div>
            
            <Bottom />
        </div>
    )
}

export default Home