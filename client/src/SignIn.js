import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from 'axios'
import Swal from 'sweetalert2'

const SignIn = () => {
  let navigate = useNavigate();


  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  return (
    <div className="container-sign-in">
      <div className="sign-in">
        <h1 className="sign-in-label">การเข้าสู่ระบบ</h1>

        <input onChange={(text) => {
          setEmail(text.target.value)
        }} placeholder="example@gmail.com"></input>
        <input onChange={(text) => {
          setPassword(text.target.value)
        }} placeholder="123456789"></input>

        <button className="btn-sign-in" onClick={() => {
          if (email && password) {
            axios.post('http://localhost:3001/SignIn', {
              email: email,
              password: password
            }).then((res) => {
              if (res.data.success) {
                Swal.fire('Success')
                setTimeout(() => {
                  localStorage.setItem('user', email)
                  navigate('/home')
                }, 1500)
              } else {
                Swal.fire("ชื่อผู้ใช้หรือรหัสผ่านผิด")
              }
            })
          }
        }}>เข้าสู่ระบบ</button>

      </div>
    </div>
  );
};

export default SignIn;
