import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Bottom = () => {

    let navigate = useNavigate()
    

    let Pages = [
        {
            id: 0,
            title: 'หน้าหลัก',
            active: false,
            path: '/home'
        },
        {
            id: 1,
            title: 'ซื้อ / ขาย',
            active: false,
            path: '/buysell'
        },
        {
            id: 2,
            title: 'เทรด',
            active: false,
            path: '/trade'
        },
        {
            id: 3,
            title: 'ประวัติ',
            active: false,
            path: '/history'
        },
        {
            id: 4,
            title: 'ฉัน',
            active: false,
            path: '/key'
        },
    ]

    return (
        <div className='bottom-container'>
            {Pages && Pages.length > 0 ? Pages.map((item, index)=>{
                // console.log(index)
                return(
                    <div onClick={()=>{
                        navigate(item.path)
                    }} className={item.active ? 'bottom-box active' : 'bottom-box'}>
                        <p>{item.title}</p>
                    </div>
                )
            }) : null}
        </div>
    )
}


export default Bottom