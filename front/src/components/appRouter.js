import React, { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRouts, publicRouts} from '../routs'
import { Context } from '../index';
import { observer } from 'mobx-react-lite';



const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRouts.map(({path, Component}) => {
                return <Route key={path} path={path} element={<Component/>} exact />
            })}
            {publicRouts.map(({path, Component}) => {
                return <Route key={path} path={path} element={<Component/>} exact />
            })} 
            <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
    );
};

export default observer(AppRouter);