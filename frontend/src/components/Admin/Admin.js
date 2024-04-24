import { useNavigate } from "react-router-dom";
import React, {useState } from "react";
import {Bar} from "react-chartjs-2";
import {Chart, LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip } from "chart.js";
Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip)
function Admin(){
    const nav = useNavigate();
    const labels = ['Apr','May','June'];
    const [data, setData] = useState({labels, datasets:[{label:'Amount of fee collected day wise',data:[5,6,9], backgroundColor:'pink'}]});
    const options={
        plugins:{legend:{position:'bottom'},title:{display:true, text:""}}
    };
   return(
    <div className="App">
        <div>           
             <Bar options={options} data={data}/>
        </div>
        <div><button onClick={()=>nav('/AdminAssistReg')}>Create Admin assistant </button></div>
    </div>
        );}
   
export default Admin;