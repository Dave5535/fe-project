import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useLocation, Redirect } from "react-router-dom";
import Singin from './Singin';
import Login from './Login';


const App = ()=> {

    // what is seen in the page 
    return(
        <div className='container'>
            <Router>
                <Switch>
                    <Route exact path="/" component={Wellcome}/>
                    <Route exact path="/info" component={Info}/>
                    <Route exact path="/chat" component={ChatDemo}/>
                    <Route exact path="/singin" component={Singin}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="" component={NotFound}/>
                </Switch>
            </Router>


        </div>
    )

}
const Header = () => {
    return(
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark"'> 
<div className="container-fluid">
<ul className="nav me-auto">
  <li className="nav-item">
    <Link className="navbar-brand text-white d-flex justify-content-center" to="/">logo</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white" to="/info">Info</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link text-white" to="/chat">Chat</Link>
  </li>
</ul>

<Link type='button' className='btn btn-primary m-2' to="/login">Login</Link>
<Link type='button' className='btn btn-primary' to="/singin">Sign Up</Link>
      </div>
      
      
</nav>
    );
}
const Wellcome = () => {
    return (
        
        <div className='container'>
           <Header/> 
            <h4>Welcome Component!</h4>
        </div>
        );
}
const Info = () => {
    return (
        <div className='container'>
             <Header/> 
            <h4>Info Component!</h4>
        </div>
        );
}
const ChatDemo =() => {
    return (

        <div className='container'>
             <Header/> 
            <h4>ChatDemo Component!</h4>
        </div>
        );
}

const NotFound = () => {
    return (
        <div className='container'>
             
            <h4>sorry problem when loading page</h4>
        </div>
        );
}


export default App;