import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const SideBar = () => {


  let [resize, setResize] = useState(false)

  let [open, setOpen] = useState(true)

  let navigate = useNavigate()


  const over = (event) => {
    if (resize) {
      setOpen(true)
    }
  }


  return (
    <div>

      <div
        onClick={() => {
          setOpen(!open);
          setResize(!resize)
        }}
        className="hamburger"
      >
        <img src={require('../images/hamburger_menu.png')}></img>
      </div>


      {open ? <div className='nav-left' onMouseOut={() => {
        if (resize) {
          setOpen(false)
        }
      }}>
        <p className='nav-header-text-show'>BOT TRADE</p>
        <div className='cut'></div>

        <div className='lists-show'>
          <p onClick={() => {
            navigate('/dashboard')
          }}>Dashboard</p>

          <p onClick={() => {
            navigate('/trade')
          }}>Trade</p>

          <p onClick={() => {
            navigate('/buysell')
          }}>Buy & Sell</p>

          <p onClick={() => {
            navigate('/history')
          }}>History</p>

          <p onClick={() => {
            navigate('/key')
          }}>API KEY</p>

          <p onClick={() => {
            localStorage.removeItem('user')
          }}>Sign Out</p>
        </div>

      </div> : <div className='nav-left-resize' onMouseOver={(event) => {
        if (resize) {
          setOpen(true)
        }
      }}>
        <div className='cut-resize'></div>
        <div onMouseOver={(event) => over(event)} className='lists-close'>
          <p onMouseOver={(event) => over(event)}>Dashboard</p>
          <p onMouseOver={(event) => over(event)}>Trade</p>
          <p onMouseOver={(event) => over(event)}>Buy & Sell</p>
          <p onMouseOver={(event) => over(event)}>History</p>
          <p onMouseOver={(event) => over(event)}>API KEY</p>
          <p onMouseOver={(event) => over(event)}>Sign Out</p>
        </div>
      </div>}

    </div>
  );
};

export default SideBar;