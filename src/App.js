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
const Welcome = () => {
    return (

        <div className='container'>
            <h4 className='text-center'>Välkommen!</h4>
            <div className='text-center'>Hit kommer nyanläda personer så ett Välkommande och den senaste nyheterna kan vara här.</div>
        </div>
    );
}
const Info = () => {
    return (
        <div className='container'>
            <h4 className='text-center'>Info!</h4>
           <div className='text-center'> här kan Möten och Event läggas up för att alla ska se.</div>
        </div>
    );
}
    
const ChatDemo = () => {
    return (

        <div className='container'>

            <h4 className='text-center'>Chat!</h4>
            <div className='text-center'>Chater mellan en person eller grup av personer.</div>
        </div>
    );
}
const Group = () => {
    return (
        <div className='container'>
            <h4 className='text-center'>Klasser!</h4>
            <div className='text-center'>Klasser/grupper skapade av lärare!</div>
        </div>
    );
}
const Social = () => {
    return (
        <div className='container'>
            <h4 className='text-center'>Sociala medier!</h4>
            <div className='text-center' >här kan man länka se alla relaterade länkar till andra medier teaterstickorna har</div>
        </div>
    );
}
const Contacts = () => {
    return (
        <div className='container'>
            <h4 className='text-center'>Kontakter saknas!</h4>
        </div>
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
