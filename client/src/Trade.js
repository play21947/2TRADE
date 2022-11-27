import Header from "./componenets/Header"
import SideBar from "./componenets/SideBar"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Bottom from "./componenets/Bottom"
import Swal from "sweetalert2"

const Trade = () => {

    let [Trade, setTrade] = useState([])

    let [coin, setCoin] = useState([])


    let [toggle, setToggle] = useState(1)

    const GetApi = () => {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3001/trade', {
                email: localStorage.getItem('user')
            }).then((res) => {
                resolve(res.data)
            })
        })
    }

    const getAllCoin = (coin) => {
        return new Promise((resolve, reject) => {
            try {
                axios.get('https://api.bitkub.com/api/market/ticker', {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }).then((res) => {
                    resolve(res.data)
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    const GetWallet = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.post("http://localhost:3001/api_btk", {
                    email: localStorage.getItem('user')
                }).then((res) => {
                    console.log(res.data)
                })
            } catch (err) {
                console.log(err)
            }
        })
    }





    const Main = async () => {
        let data = await GetApi()

        let cvt_coin = await getAllCoin(data[0].sym_coin)
        // let wallet = await GetWallet()


        setTrade(data)
        setCoin(Object.entries(cvt_coin))



    }

    // console.log(coin)


    useEffect(() => {
        Main()
    }, [toggle])



    return (
        <div style={{marginBottom: 80}}>

            <div className='home-container'>
                <div className='profit'>
                    <p>ข้อมูลการเทรด</p>
                </div>
            </div>

            <div className="trade-container">
                {Trade && Trade.length > 0 && coin && coin.length > 0 ? Trade.map((item) => {


                    console.log(item)

                    let test = coin.filter((items) => {

                        return item.sym_coin === items[0]
                    })

                    let convert_text = item.sym_coin.split('THB_')[1]

                    // console.log(convert_text)

                    // console.log(test[0][1].last)

                    let percent = test[0][1].last / (item.total_money / item.total_coin)

                    let name_coin = item.sym_coin.split("THB_")

                    let result

                    if (percent < 0) {
                        result = (percent - 1) * 100
                    } else {
                        result = (percent * 100) - 100
                    }

                    return (
                        <div>
                            <div className="box-trade" key={item.id}>
                                <div className="trade-img">
                                    <img src={'https://cdn.bitkubnow.com/coins/icon/' + convert_text + '.png'}></img>
                                    <h3>{name_coin}</h3>
                                </div>

                                <div className="trade-flex">
                                    <p>เงินที่ซื้อ : </p>
                                    <p className="green">{item.total_money}</p>
                                </div>

                                <div className="trade-flex">
                                    <p>ไม้ที่ : </p>
                                    <p className="green">{item.bought}</p>
                                </div>

                                {/* <div className="trade-flex">
                                    <p>ราคาเฉลี่ย : </p>
                                    {item.total_coin != 0 && item.total_coin != 0 ? <p className="green">{(item.total_money / item.total_coin).toFixed(4).toLocaleString()}</p> : <p className="green">รอออกไม้ 0 : {(item.start_price).toFixed(2)}</p>}
                                </div> */}

                                <div className="trade-flex">
                                    <p>ราคาล่าสุด : </p>
                                    <p className="green">{(test[0][1].last).toLocaleString()}</p>
                                </div>
{/* 
                                <div className="trade-flex">
                                    <p>ราคาที่ซื้อไม้ 1 : </p>
                                    <p className="green">{item.start_price - ((item.start_price * Math.abs(item.c1)) / 100)}</p>
                                </div> */}


                                {result && result != null ? result > 0 ?
                                    <div className="result-green">
                                        <p>{result.toFixed(2)} %</p>
                                    </div> : <div className="result-red">
                                        <p>{result.toFixed(2)} %</p>
                                    </div> : <div className="result-result">
                                    <p>รอออกไม้</p>
                                </div>}




                                <div className="ali">
                                    {item.tradable == 1 ? <p className="working-color">ทำงาน</p> : <p className="not-working-color">ไม่ทำงาน</p>}
                                    <div className="switch" onClick={() => {
                                        if (toggle) {
                                            console.log(toggle)
                                            axios.post("http://localhost:3001/toggle", {
                                                status: 0,
                                                email: localStorage.getItem('user'),
                                                sym_coin: item.sym_coin
                                            }).then((res) => {
                                                // console.log(res.data)
                                                if (res.data.toggled) {
                                                    setToggle(0)
                                                }
                                            })
                                        } else {
                                            console.log(toggle)
                                            axios.post("http://localhost:3001/toggle", {
                                                status: 1,
                                                email: localStorage.getItem('user'),
                                                sym_coin: item.sym_coin
                                            }).then((res) => {
                                                // console.log(res.data)
                                                if (res.data.toggled) {
                                                    setToggle(1)
                                                }
                                            })
                                        }
                                    }}>
                                        <input type="checkbox"></input>
                                        <div className={item.tradable == 1 ? "slider-active" : "slider"}></div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    )
                }) : null}
            </div>
            <Bottom />
        </div>
    )
}

export default Trade