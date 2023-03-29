import React, { useEffect } from 'react';
import './App.css';
import { Navigation } from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from './utils/token-session-storage';
import { itemsActionRedux } from './redux/authSlice/authSlice';
import { CssBaseline } from '@mui/material';
import ResponsiveAppBar from './components/AppBar/AppBar';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(itemsActionRedux.refreshAuth());
  }, []);

  return (
    <div className='App'>
      <CssBaseline />
      <ResponsiveAppBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
