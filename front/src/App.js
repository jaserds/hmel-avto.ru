import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/appRouter'
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import LoadingAnimation from './components/Loaders/SpinnerLoader'
import CarsServices from './services/CarsServices';

function App() {
  const {user} = useContext(Context)
  const [load, isLoad] = useState(true)

  useEffect(() => {

      CarsServices.deletePhotoCar()
    
      if (localStorage.getItem('token')) {
          user.checkAuth().then(data => { 
              user.setIsAuth(true)
              user.setIsUser(data.data.userDto)
        }).catch(error => {
          user.logout()
        }).finally(() => {isLoad(false)})
      } else {
        isLoad(false)
      }
  }, [])

  if (load){
    return <LoadingAnimation />
  }

  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
