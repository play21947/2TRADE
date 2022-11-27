import { useNavigate } from "react-router-dom"

const LandingPage = () => {

    let navigate = useNavigate()

    return (
        <div className="landing-container">
            <div className="lp-bg">

            </div>


            <div className="landing-header">
                <div onClick={()=>{
                    navigate("/buysell")
                }} className="landing-box">
                    <h1>P2TRADE</h1>
                </div>
            </div>
        </div>
    )
}

export default LandingPage