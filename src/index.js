import ReactDOM from 'react-dom/client';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const greatingMessage = <div className='text-black'>Hello React!</div>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);