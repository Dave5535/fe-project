import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, useHistory, useParams, useLocation, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './Store/userSlice';

import Login from './components/Login';
import Chat from './components/Chat';
import Info from './components/Info';
import Welcome from './components/Welcome';
import Settings from './components/Settings';
import Crud from './components/Crud';
import Calendar from './components/Calendar';
import Documents from './components/Documents';

const App = () => {

    return (
        <div className='container'>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/info" component={Info} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/documents" component={Documents} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/hantera_Anvandare" component={Crud} />
                    <Route path="/login" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </Router>

        </div>
    )

}
const Header = () => {
    const [admin, setAdmin] = useState(false);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user !== null && user.role === "admin") {
            setAdmin(true);
        }
    }, [user]);

    if (user !== null)

        return (
            <nav className='navbar navbar-expand-sm bg-light navbar-light shadow rounded mb-3'>
                <div className="container-fluid">
                    <Link className="logo navbar-brand d-flex justify-content-center" to="/"><img src="./Image/logo.png" alt="logo" /></Link>
                    <ul className="nav me-auto">
                        <li className="nav-item">
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="selected" className="nav-link text-black" to="/" exact={true}>Hem</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="selected" className="nav-link text-black link" to="/info">Info</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="selected" className="nav-link text-black link" to="/chat">Chat</NavLink>
                        </li>
                        <li className="nav item">
                            <NavLink activeClassName="selected" className='nav-link text-black link' to="/calendar">Kalender</NavLink>
                        </li>
                        <li className="nav item">
                            <NavLink activeClassName="selected" className='nav-link text-black link' to="/documents">Dokument</NavLink>
                        </li>
                        <li className="nav-item" >
                            <NavLink activeClassName="selected" className="nav-link text-black link" to="/settings" ><div className='fas fa-cog'></div></NavLink>
                        </li>
                    </ul>
                    {admin && <>
                        <Link type='button' className='btn btn-primary' to="/hantera_Anvandare">Hantera Användare</Link>
                    </>}

                </div>
            </nav>
        );
}

const NotFound = () => {
    return (
        <div className='container'>

            <img src="logo.png" className='rounded mx-auto d-block' alt='Teater stickornas logo' width="50" height="50" />
            <br />
            <h4 className='text-center'>Fel 404: Sidan kunde inte hittas!</h4>
        </div>
    );
}


export default App;