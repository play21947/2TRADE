import React, { useState } from 'react'
import SideBar from './componenets/SideBar'
import Header from './componenets/Header'
import axios from 'axios'
import Bottom from './componenets/Bottom'
import Swal from 'sweetalert2'


const Key = () => {

    let [apikey, setApiKey] = useState('')
    let [secretkey, setSecretKey] = useState('')


    const SendKeyToDB = () => {
        axios.post('http://localhost:3001/key', {
            apikey: apikey,
            secretkey: secretkey
        }).then((res) => {
            if (res.data.success) {
                Swal.fire('Updated Api Key!')
            }
        })
    }

    return (
        <div>

            <div className='home-container'>
                <div className='profit'>
                    <p>ตั้งค่า</p>
                </div>
            </div>

            <div className='container-key'>
                <p>ตั้งค่า API KEY AND SECRET KEY</p>
                <label>API KEY</label>
                <input onChange={(text) => {
                    setApiKey(text.target.value)
                }}></input>
                <label>SECRET KEY</label>
                <input onChange={(text) => {
                    setSecretKey(text.target.value)
                }}></input>
                <button onClick={() => {
                    SendKeyToDB()
                }}>CONFIG</button>

            </div>

            <button onClick={() => {
                Swal.fire({
                    title: 'ต้องการออกจากระบบ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ออกจากระบบ',
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({title: 'ออกจากระบบเสร็จสิ้น', icon: 'success', timer: 1500, showConfirmButton: false})
                        // Logout
                    }
                })
            }} className='quit'>ออกจากระบบ</button>

            <Bottom />
        </div>
    )
}

export default Key