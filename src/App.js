import React, { useState } from "react";
import "./App.css";
// import QR_code from "./images/QR_code.png"

const App = () => {

    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrdata, setQrdata] = useState("https://.in/");
    const [qrsize, setQrsize] = useState("100");

 async function generateQR(){
    setLoading(true);
    try{
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}&data=${encodeURIComponent(qrdata)}`;
        setImg(url);
    }catch(error){
        console.log("Error generating QR Code", error);
    }finally{
        setLoading(false);
    }
}

function downloadQR(){
    fetch(img)
    .then((Response)=>Response.blob())
    .then((blob)=>{
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch((error)=>{
        console.log("Error generated in QR Code", error);
    })
}

    return(
        <div className="parent">
            <div className="container">
                <h2>QR CODE GENERATOR</h2>
                {loading && <p style={{textAlign:"center", margin:"30px"}}>Please Wait...</p>}
                {img && <img src={img} alt="" className="qr-image"/>}
                <div className="data-type">
                    <p>Data for QR Code:</p>
                    <input type="text" value={qrdata} onChange={(e)=>setQrdata(e.target.value)}/>
                </div>
                <div className="size-type">
                    <p>Image Size (eg., 150):</p>
                    <input type="text" value={qrsize} onChange={(e)=>setQrsize(e.target.value)}/>
                </div>
                <div className="btn-type">
                    <button className="left-btn" onClick={generateQR} disabled={loading}>Generate QR Code</button>
                    <button className="right-btn" onClick={downloadQR}>Download QR Code</button>
                </div>
                <p style={{marginTop:"80px", textAlign:"center"}}>Developed by <span style={{color:"blue"}}>RAHAMATH</span></p>
            </div>
        </div>
    )
}

export default App;