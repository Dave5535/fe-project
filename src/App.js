import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useLocation, Redirect } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import Info from './components/Info';
import Welcome from './components/Welcome';
import Group from './components/Group';
import Social from './components/Social';
import Contacts from './components/Contacts';


const App = () => {

    // what is seen in the page 
    return (
        <div className='container'>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/info" component={Info} />
                    <Route path="/chat" component={Chat} />

                    <Route path="/group" component={Group} />
                    <Route path="/social" component={Social} />
                    <Route path="/contacts" component={Contacts} />

                    <Route path="/register" component={Register} />
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
            <Link className="logo navbar-brand text-white d-flex justify-content-center" to="/"><img src="logo.png" alt="logo" /></Link>
                <ul className="nav me-auto">
                    <li className="nav-item">
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/info">Info</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/chat">Chat</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/group">Group</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/social">Social</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/contacts">Contacts</Link>
                    </li>
                </ul>

                <Link type='button' className='btn btn-primary m-2' to="/login">Login</Link>
                <Link type='button' className='btn btn-primary' to="/register">Registrera</Link>
            </div>
        </nav>
    );
}

const NotFound = () => {
    return (
        <div className='container'>

          <img  src="logo.png" className='rounded mx-auto d-block' alt='Teater stickornas loga' width="50" height="50"/>
           <br/>
            <h4 className='text-center'>Fel 404: Sidan kunde inte hittas!</h4>
            

        </div>
    );
}


export default App;
