import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useLocation, Redirect } from "react-router-dom";
import Register from './Register';
import Login from './Login';


const App = () => {

    // what is seen in the page 
    return (
        <div className='container'>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/info" component={Info} />
                    <Route path="/chat" component={ChatDemo} />
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
                        <Link className="nav-link text-white" to="/info">Info</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/chat">Chat</Link>
                    </li>
                </ul>

                <Link type='button' className='btn btn-primary m-2' to="/login">Login</Link>
                <Link type='button' className='btn btn-primary' to="/register">Sign Up</Link>
            </div>
        </nav>
    );
}
const Welcome = () => {
    return (

        <div className='container'>
            <h4>Welcome Component!</h4>
        </div>
    );
}
const Info = () => {
    return (
        <div className='container'>
            <h4>Info Component!</h4>
        </div>
    );
}
const ChatDemo = () => {
    return (

        <div className='container'>
            <h4>ChatDemo Component!</h4>
        </div>
    );
}

const NotFound = () => {
    return (
        <div className='container'>
            <h4>Error 404: Page Not Found!</h4>
        </div>
    );
}


export default App;