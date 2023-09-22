import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import CarStore from './store/CarStore'
import InputStore from './store/InputsStore';
import './css/style.css'
import './css/normalize.css'
import './css/jinput.css'


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
            user: new UserStore(),
            cars: new CarStore(),
            input: new InputStore(),
        }}>
        <App />
    </Context.Provider>
    );