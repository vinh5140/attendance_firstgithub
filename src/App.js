import './App.scss';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
// import { useContext } from 'react';
// import { UserContext } from './context/UserContext'

function App() {

  // const { user, room } = useContext(UserContext);
  // console.log("user: ", user);
  // console.log("room: ", room);

  // useEffect(() => {
  //   if (localStorage.getItem("Email")) {
  //     loginContext(localStorage.getItem("Email"));
  //   }
  // }, [])

  return (
    <>
      <div className='wrapper'>
        <Container>
          <Header />
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
