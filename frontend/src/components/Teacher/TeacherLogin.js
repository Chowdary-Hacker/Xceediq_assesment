import { useNavigate} from "react-router-dom";
import { useState } from "react";
function TeacherLogin(){
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const handleAdmissionNumberChange = (event) => {
      setAdmissionNumber(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // You can perform form validation and submit data to backend here
      console.log('Submitting form:', { admissionNumber, password });
      nav('/StudentDashboard');
    };
  
    return (
      <div className="registration-container">
        <h2>Teacher Login</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="admissionNumber">User Name:</label>
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
export default TeacherLogin;