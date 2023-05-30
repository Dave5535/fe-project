import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';



import store from './Store/ConfigureStore.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
<App/>
</Provider>);
