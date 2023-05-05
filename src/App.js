import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useLocation, Redirect } from "react-router-dom";

import Login from './components/Login';
import Chat from './components/Chat';
import Info from './components/Info';
import Welcome from './components/Welcome';
import Social from './components/Social';
import Contacts from './components/Contacts';
import Settings from './components/Settings';
import Crud from './components/Crud';
import Calendar from './components/Calendar';
import { useSelector } from 'react-redux';
import { selectUser } from './Store/userSlice';



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
                    
                    <Route path="/social" component={Social} />
                    <Route path="/contacts" component={Contacts} />
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
    return (
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark shadow rounded mb-3'>
            <div className="container-fluid">
                <Link className="logo navbar-brand text-white d-flex justify-content-center" to="/"><img src="./Image/logo.png" alt="logo" /></Link>
                <ul className="nav me-auto">
                    <li className="nav-item">
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">Hem</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/info">Info</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/chat">Chat</Link>
                    </li>
                    <li className="nav item">
                        <Link className='nav-link text-white' to="/calendar">Kalender</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/social">Socialt</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/contacts">Kontakter</Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link text-white" to="/settings" ><div className='fas fa-cog'></div></Link>
                    </li>
                </ul>

                <Link type='button' className='btn btn-primary m-2' to="/login">Login</Link>
                <Link type='button' className='btn btn-primary' to="/hantera_Anvandare">Hantera Användare</Link>
            </div>
        </nav>
    );
}

const NotFound = () => {
    return (
        <div className='container'>

            <img src="logo.png" className='rounded mx-auto d-block' alt='Teater stickornas loga' width="50" height="50" />
            <br />
            <h4 className='text-center'>Fel 404: Sidan kunde inte hittas!</h4>
        </div>
    );
}


export default App;
