import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/mainComponent';
const store = ConfigureStore();



function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div>
    <Main/>
    </div>
    </BrowserRouter>
    </Provider>
    
   
  );
}

export default App;
