import { AppBar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const LmsAdminManagement = () => {
const auth = useAuth()
const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/')
    }

    console.log("HEWOHIFWIOH");

    return (
      <div>
        <div style={{height:'1000px'}}>

        </div>
        <p style={{marginTop: '1000px'}}>Welcome {auth.user.name}</p>
        <Button onClick={handleLogout}>logout</Button>
      </div>
    );
  };
  export default LmsAdminManagement;