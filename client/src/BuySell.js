import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTime } from 'date-fns'
import SideBar from './componenets/SideBar'
import Header from './componenets/Header'
import Select from 'react-select'
import Bottom from './componenets/Bottom'
import { useNavigate } from 'react-router-dom'

const BuySell = () => {

    // let [balance, setBalanace] = useState(0)


    let navigate = useNavigate()


    let [currencies, setCurrencies] = useState([])

    let [select, setSelect] = useState(null)

    // let [coin, setCoin] = useState('')

    let [isOpen, setIsOpen] = useState(false)


    let [percent_buy, setPercent_buy] = useState(0)

    let [percent_sell, setPercent_sell] = useState(0)

    let [money, setMoney] = useState(0)


    // const getWallet = () => {
    //     return new Promise(async (resolve, reject) => {
    //         try {

    //             axios.post('http://localhost:3001/api_btk', {
    //                 email: localStorage.getItem('user')
    //             }).then((res) => {
    //                 resolve(res.data)
    //             })

    //         } catch (err) {
    //             reject(err);
    //         }
    //     });
    // }


    const getAllCoin = () => {
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

    const AllApi = async () => {

        let AllCoin = await getAllCoin()

        let cvt = Object.entries(AllCoin)

        setCurrencies(cvt)

        // console.log(cvt)


        // let wallet = await getWallet()

    }


    const PopUpCrypto = (sym) => {
        axios.get('https://api.bitkub.com/api/market/ticker?sym=' + sym).then((res) => {
            setSelect(Object.entries(res.data))
        })
    }


    const UpdateData=(sym_coin ,money, last_coin, percent_buy, buy_point, percent_sell, sell_point)=>{

        console.log("Updated!")

        axios.post('http://localhost:3001/update_market',{
            sym_coin: sym_coin,
            email: localStorage.getItem('user'),
            money: money,
            last_coin: last_coin,
            percent_buy: percent_buy,
            buy_point: buy_point,
            percent_sell: percent_sell,
            sell_point: sell_point
        }).then((res)=>{
            console.log(res.data)
        })
    }


    useEffect(() => {
        AllApi()
    }, [currencies])



    // <img src={'https://cdn.bitkubnow.com/coins/icon/' + select[0][0].split('THB_')[1] + '.png'}></img>

    // ***WHEN SUBMIT
    // let percent_buy_cal = select[0][1].last * (1 - (percent_buy / 100))
    // let percent_sell_cal = select[0][1].last * (1 + (percent_sell / 100))

    // console.log(percent_buy_cal)
    // console.log(percent_sell_cal)
    // console.log(select[0][0])

    // UpdateData(select[0][0] ,money, select[0][1].last, percent_buy, percent_buy_cal, percent_sell, percent_sell_cal)




    return (
        <div>
            {/* <SideBar /> */}
            <div className='home-container'>
                <div className='profit'>
                    <p>ซื้อ - ขาย</p>
                </div>
            </div>

            {/* {isOpen && select && select.length > 0 ? 
            <div className='show-setting'>

            </div> : null} */}

            <div className='buy-sell-container'>
                {currencies && currencies.length > 0 ? currencies.map((item) => {
                    let convert_text = item[0].split('THB_')[1]
                    return (
                        <div key={item[1].id} className='box-crypto'>
                            <div className='header-crypto'>
                                <img src={'https://cdn.bitkubnow.com/coins/icon/' + convert_text + '.png'}></img>
                                <p className="header-detail-crypto">{convert_text}</p>
                            </div>
                            <div className='detail-price'>
                                <p>ราคาล่าสุด : </p>
                                <p className='price'>{(item[1].last).toLocaleString()}</p>
                            </div>
                            <button onClick={async() => {
                                // console.log(item[0])
                                let user_storage = await localStorage.getItem('user')
                                if(user_storage){
                                    setIsOpen(true)
                                    PopUpCrypto(item[0])
                                    // setCoin(item[0])
                                    navigate('/strategic', {state: {payload: item[0]}})
                                }else{
                                    navigate('/sign_in')
                                }
                            }} className='setting-crypto'>ซื้อ</button>
                        </div>
                    )
                }) : null}
            </div>

            <Bottom/>
ac
        </div>
    )
}

export default BuySell