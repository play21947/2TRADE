import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Strategic = () => {


    let [select, setSelect] = useState([])

    let [detail, setDetail] = useState([])

    let [investor_money, setInvestor_money] = useState(0)

    let [c1, setC1] = useState(null)
    let [c2, setC2] = useState(0)
    let [c3, setC3] = useState(0)
    let [v1, setV1] = useState(0)
    let [v2, setV2] = useState(0)
    let [v3, setV3] = useState(0)

    let [take_profit, setTake_profit] = useState(0)
    let [flex, setFlex] = useState(0)
    let [timer, setTimer] = useState(0)
    let [price_buy, setPrice_Buy] = useState(0)


    const navigate = useNavigate()

    const location = useLocation()

    let GetSpecificCoin = (sym_coin) => {
        return new Promise((resolve, reject) => {
            axios.get('https://api.bitkub.com/api/market/ticker?sym=' + sym_coin,{
                headers:{
                    'Cache-Control': 'no-cache'
                }
            }).then((res) => {
                resolve(Object.entries(res.data))
            })
        })
    }


    const GetUserOldData = (sym_coin) => {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3001/get_coin', {
                email: localStorage.getItem('user'),
                sym_coin: sym_coin
            }).then((res) => {
                resolve(res.data)
            })
        })
    }


    const UpdateData = async (email, sym_coin, price_buy, investor_money, c1, c2, c3, v1, v2, v3, take_profit, flex, timer) => {
        Swal.fire({
            title: 'ยืนยันการตั้งค่าและเริ่มเทรด',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let coin = await GetSpecificCoin(location.state.payload)

                console.log(coin)

                axios.post("http://localhost:3001/set_coin", {
                    email: email,
                    sym_coin: sym_coin,
                    last_price: coin[0][1].last,
                    investor_money: investor_money,
                    price_buy: price_buy,
                    c1: c1,
                    c2: c2,
                    c3: c3,
                    v1: v1,
                    v2: v2,
                    v3: v3,
                    take_profit: take_profit,
                    flex: flex,
                    timer: timer
                }).then((res) => {
                    if (res.data.updated) {
                        Swal.fire("อัพเดทเหรียญเสร็จสิ้น")
                        navigate('/trade')
                    } else if (res.data.inserted) {
                        Swal.fire("เพิ่มเหรียญเสร็จสิ้น")
                        navigate('/trade')
                    }
                })
            }
        })
    }


    const Main = async () => {



        let result_coin = await GetSpecificCoin(location.state.payload)

        // let inventory = await GetUserOldData(location.state.payload)




        // if (inventory.status !== 'not found') {
        //     console.log(inventory)
        //     setInvestor_money(inventory[0].investor_money)
        //     setC1(Math.abs(inventory[0].c1))
        //     setC2(Math.abs(inventory[0].c2))
        //     setC3(Math.abs(inventory[0].c3))
        //     setV1(Math.abs(inventory[0].v1))
        //     setV2(Math.abs(inventory[0].v2))
        //     setV3(Math.abs(inventory[0].v3))
        //     setTake_profit(inventory[0].take_profit)
        //     setFlex(inventory[0].flex)
        //     setTimer(inventory[0].timer / 60000)
        // }

        console.log(result_coin)


        setSelect(result_coin)
    }

    const price_cover = (nagative_percent) => {
        let convert_nagative = Math.abs(nagative_percent)
        if (select && select.length > 0 && price_buy && nagative_percent) {
            let price = price_buy - ((price_buy * convert_nagative) / 100)
            return price
        }

        return ''
    }


    useEffect(() => {
        Main()
    }, [])


    // console.log(location.state.payload)

    return (
        <div className='gap'>

            <div className='title-stategic'>
                <img onClick={() => {
                    navigate('/buysell')
                }} className='back' src={require('./images/back.png')}></img>
                <p className='setting'>Setting</p>
            </div>

            {select && select.length > 0 ? <div className='stategic-container'>
                <div className='header-stategic'>
                    <img src={'https://cdn.bitkubnow.com/coins/icon/' + select[0][0].split('THB_')[1] + '.png'}></img>
                    <p>{select[0][0].split('THB_')[1]}</p>
                </div>

                <div className='investor-money'>
                    <p>ลงทุน</p>
                    <input placeholder='0' onChange={(text) => {
                        setInvestor_money(text.target.value)
                    }}></input>
                    <p style={{ marginLeft: 15 }}>บาท</p>
                </div>

                <div className='stategic-yo'>
                    <p>ราคาเหรียญที่ตั้งซื้อ</p>
                    <input onChange={(text) => {
                        setPrice_Buy(text.target.value)
                    }} placeholder={(select[0][1].last).toFixed(2).toLocaleString()}></input>
                </div>


                <div className='stategic-split'>

                    <div className="body-stategic">
                        <div className='cover'>
                            <div>
                                <p>ไม้ที่ 1</p>
                                {price_buy && c1 ? <p className='price-buy-cover'>{price_cover(c1)} ฿</p> : null}
                            </div>
                            <div className='box-percent'>
                                <input placeholder='0' value={c1 ? c1 : ''} onChange={(text) => {
                                    setC1(-Math.abs(Number(text.target.value)))
                                    // console.log(text.target.value)
                                }}></input>
                                <p className='percent-stategic'>%</p>
                            </div>
                        </div>

                        <div className='cover'>
                            <div>
                                <p>ไม้ที่ 2</p>
                                {price_buy && c2 ? <p className='price-buy-cover'>{price_cover(c2)} ฿</p> : null}
                            </div>
                            <div className='box-percent'>
                                <input placeholder='0' value={c2 ? c2 : ''} onChange={(text) => {
                                    setC2(-Math.abs(Number(text.target.value)))
                                }}></input>
                                <p className='percent-stategic'>%</p>
                            </div>
                        </div>

                        <div className='cover'>
                            <div>
                                <p>ไม้ที่ 3</p>
                                {price_buy && c3 ? <p className='price-buy-cover'>{price_cover(c3)} ฿</p> : null}
                            </div>
                            <div className='box-percent'>
                                <input placeholder='0' value={c3 ? c3 : ''} onChange={(text) => {
                                    setC3(-Math.abs(Number(text.target.value)))
                                }}></input>
                                <p className='percent-stategic'>%</p>
                            </div>
                        </div>
                    </div>

                    <div className="body-stategic">
                        <div className='cover'>
                            {/* <p>คูณ</p> */}
                            <div className='box-percent'>
                                <input onChange={(text) => {
                                    setV1(text.target.value)
                                }}></input>
                                <p className='percent-stategic'>X</p>
                            </div>
                        </div>

                        <div className='cover'>
                            {/* <p>คูณ</p> */}
                            <div className='box-percent'>
                                <input onChange={(text) => {
                                    setV2(text.target.value)
                                }}></input>
                                <p className='percent-stategic'>X</p>
                            </div>
                        </div>

                        <div className='cover'>
                            {/* <p>คูณ</p> */}
                            <div className='box-percent'>
                                <input onChange={(text) => {
                                    setV3(text.target.value)
                                }}></input>
                                <p className='percent-stategic'>X</p>
                            </div>
                        </div>
                    </div>


                </div>


                <div className='profit-box'>
                    <div className='flex-profit'>
                        <p>กำไร (TP)</p>
                        <input placeholder='0' onChange={(text) => {
                            setTake_profit(text.target.value)
                        }}></input>
                        <p style={{ marginLeft: '10px' }}>%</p>
                    </div>

                    <div className='flex-profit'>
                        <p>Trailing Stop</p>
                        <input value={flex ? flex : ''} placeholder='0' onChange={(text) => {
                            setFlex(-Math.abs(Number(text.target.value)))
                        }}></input>
                        <p style={{ marginLeft: '10px' }}>%</p>
                    </div>
                </div>

                <div className='recap-detail'>
                    <div>
                        <p>กำไร(PNL) </p>
                        <p></p>
                    </div>
                    {/* //ต้องเปลี่ยนเป็น เปอร์เซ็นต์ของจริง มีค่าเงินลงทุนมาเกี่ยว*/}
                    {/* <p>{(((price_buy * (100 + Math.abs(take_profit))) / 100) - price_buy).toFixed(2)} บาท</p> */}
                </div>

                <div className='cooldown'>
                    <div className='flex-profit'>
                        <p>เวลาเริ่ม ทำซ้ำ</p>
                        <input placeholder='20' onChange={(text) => {
                            setTimer(text.target.value)
                        }}></input>
                        <p style={{ marginLeft: '10px' }}>นาที</p>
                    </div>
                </div>

            </div> : null}

            <div className='handle-stategic'>
                <button className='btn-setting-stategic' onClick={() => {
                    UpdateData(localStorage.getItem('user'), select[0][0], price_buy, investor_money, c1, c2, c3, v1, v2, v3, take_profit, flex, timer)
                }}>ตั้งค่า</button>
            </div>

        </div>
    )
}


export default Strategic