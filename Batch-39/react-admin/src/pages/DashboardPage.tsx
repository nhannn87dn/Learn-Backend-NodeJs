import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  return <div>
    Dashboard

      <button onClick={()=>{
        navigate('/login')
      }}>Login</button>

    </div>;
};

export default DashboardPage;
