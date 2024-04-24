import { useNavigate } from 'react-router-dom';
const RoleSelection = () => {
 const nav = useNavigate();
  return (
    <div className="role-selection-container">
      <h2>Select Your Role</h2>

       <div> <button
         
          style={{ width: '50%' }}
          onClick={() => nav('/ParentLogin')}
        > 
          Parent  
           </button> </div>
           <div> <button
          style={{ width: '50%' }}
          onClick={() => nav('/StudentLogin')}
        >
          Student
        </button> </div>
        <div>   <button
          className="role-button"
          style={{ width: '50%' }}
          onClick={() => nav('/AdminLogin')}
        >
          Admin
        </button> </div>
        <div>    <button
          className="role-button"
          style={{ width: '50%' }}
          onClick={() => nav('/TeacherLogin')}
        >
          Teacher
        </button> </div>
  
           <div> <button
          style={{ width: '50%' }}
          onClick={() => nav('/AboutSchool')}
        > About school </button> </div>
    </div>
  );
};

export default RoleSelection;
