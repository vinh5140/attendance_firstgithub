import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = (props) => {

    const { logout, user, roomContext } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Log out succeed!");
    }

    const handleRoom = (Room, Subject) => {
        roomContext(Room, Subject);
        navigate("/users");
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" sticky='top'>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        height="30"
                        width="auto"
                        className='d-inline-block align-top'
                        alt='logo'
                    ></img>
                </Navbar.Brand>
                {((user && user.Auth) || window.location.pathname === '/') &&
                    <>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/" className='nav-link'>Home</NavLink>
                                <NavDropdown title="Rooms" id="basic-nav-dropdown">
                                    <NavDropdown title="Room A101" id="basic-nav-dropdown" drop='end' className='px-3'>
                                        <NavDropdown.Item onClick={() => handleRoom("A101", "Math1")}>Math1</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("A101", "Math2")}>Math2</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("A101", "Math3")}>Math3</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Room B201" id="basic-nav-dropdown" drop='end' className='px-3'>
                                        <NavDropdown.Item onClick={() => handleRoom("B201", "Physical1")}>Physical1</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("B201", "Physical2")}>Physical2</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Room C301" id="basic-nav-dropdown" drop='end' className='px-3'>
                                        <NavDropdown.Item onClick={() => handleRoom("C301", "C_language")}>C language</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("C301", "C++")}>C++</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("C301", "Python")}>Python</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("C301", "Java")}>Java</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Room D401" id="basic-nav-dropdown" drop='end' className='px-3'>
                                        <NavDropdown.Item onClick={() => handleRoom("D401", "English1")}>English1</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("D401", "English2")}>English2</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("D401", "English3")}>English3</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleRoom("D401", "English4")}>English4</NavDropdown.Item>
                                    </NavDropdown>
                                </NavDropdown>

                            </Nav>
                            <Nav>
                                <NavDropdown title={user && user.Email ? user.Email : "User"}>
                                    {user && user.Auth === true
                                        ? <NavDropdown.Item onClick={() => handleLogout()}><i className="fa-solid fa-right-from-bracket"></i><b> Log out</b></NavDropdown.Item>
                                        : <NavLink to="/login" className='dropdown-item'><i className="fa-solid fa-right-to-bracket"></i><b> Log in</b></NavLink>
                                    }
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                }
            </Navbar>
        </>
    )
}
export default Header;