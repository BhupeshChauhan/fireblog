import './App.css';
import { Col, Row } from 'react-bootstrap';
import { useUserAuth } from './Context/UserAuthContext';
import UnAuthRoutes from './Routes/UnAuthRoutes';
import AuthRoutes from './Routes/AuthRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import EditorRoutes from './Routes/EditorRoutes';
import Loader from './util/Loader';

function App() {
    const { user } = useUserAuth();

    const Routes = () => {
        console.log(user, "user")
        if (!user) {
            return <UnAuthRoutes />;
        } else if (user?.Role?.user === true && user.Role.editor === false && user.Role.admin === false) {
            return <AuthRoutes />;
        } else if (user?.Role?.user === true && user.Role.editor === true && user.Role.admin === false) {
            return <EditorRoutes />;
        } else if (user?.Role?.user === true && user.Role.editor === true && user.Role.admin === true) {
            return <AdminRoutes />;
        } else {
            return <Loader />;
        }
    }
    
    return <Routes />;
}

export default App;