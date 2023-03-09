import React, { useEffect } from 'react';
import './App.css';
import { Navigation } from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from './utils/token-session-storage';
import { itemsActionRedux } from './redux/authSlice/authSlice';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(itemsActionRedux.refreshAuth());
  }, []);

  return (
    <div className='App'>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
