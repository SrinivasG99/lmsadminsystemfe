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
        <div>
          HELLO {auth.user.name}
        </div>
        <p>
            AIEIPGEneg
        </p>
        <Button onClick={handleLogout}>logout</Button>
      </div>
    );
  };
  export default LmsAdminManagement;