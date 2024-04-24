import { useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
function ParentLogin(){
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const nav = useNavigate();
    const handleAdmissionNumberChange = (event) => {
      setAdmissionNumber(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post("http://localhost:3333/parentLogin",{admissionNumber:admissionNumber, password:password}).then(res=>res.json()).then(res=>{if(res.status===222){setToken(res.data.token);}}).catch();
      axios.get("http://localhost:3333/parentDashboard",{headers:{'x-token':token}}).then(res=>{if(res.status===222){nav('/ParentDashboard');}}).catch();
    };
  
    return (
      <div className="registration-container">
        <h2>Teacher Login</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="admissionNumber">Child's admission number:</label>
            <input
              type="text"
              id="admissionNumber"
              value={admissionNumber}
              onChange={handleAdmissionNumberChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
}
export default ParentLogin;