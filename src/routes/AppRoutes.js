import { Route, Routes } from 'react-router-dom';
import Content from '../components/Content';
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/users'
                    element={
                        <PrivateRoute>
                            <Content />
                        </PrivateRoute>
                    }
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}
export default AppRoutes;