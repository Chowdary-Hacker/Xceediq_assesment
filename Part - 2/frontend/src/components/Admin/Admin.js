import { useNavigate, useLocation } from "react-router-dom";
import React, {useState, useEffect } from "react";
import {Bar} from "react-chartjs-2";
import axios from 'axios';
import {Chart, LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip } from "chart.js";
Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip)
function Admin(){
    const nav = useNavigate(); const location = useLocation(); var sessionToken, userName;
    try{
    if(location.state.sessionToken!==null){sessionToken = location.state.sessionToken; userName = location.state.userName;}else{alert("Session expired kindly login again ! (:"); nav('/adminLogin')}
    } catch(e){}
     const labels = ['Apr','May','June'];
    const [data, setData] = useState({labels, datasets:[{label:'Amount of fee collected day wise',data:[5,6,9], backgroundColor:'pink'}]});
    const options={
        plugins:{legend:{position:'bottom'},title:{display:true, text:""}}
    };
    useEffect(()=>{
        axios.get("http://localhost:3333/adminLogin/admin",{headers:{'x-token':sessionToken}}).then(res=>{if(res.status!==222){alert('authentication failed try again later (: ');nav('/adminLogin');}}).catch((e)=>{console.log(e);});
  },[]);
   return(
    <div className="app">
        {sessionToken? (<>Welcome {userName} </>) : <p></p>}
        <div>           
             <Bar options={options} data={data}/>
        </div>
        <div><button onClick={()=>nav('/AdminAssistReg', {state:{sessionToken:sessionToken}})}>Create Admin assistant </button></div>
    </div>
        );}
   
export default Admin;