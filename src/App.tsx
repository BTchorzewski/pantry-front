import React, { useEffect } from 'react';
import './App.css';
// import { Navigation } from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { itemsActionRedux } from './redux/authSlice/authSlice';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import ResponsiveAppBar from './components/AppBar/ResponsiveAppBar';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(itemsActionRedux.refreshAuth());
  }, []);

  return (
    <Box className='App'>
      <CssBaseline />
      {/* <Navigation /> */}
      <ResponsiveAppBar />
      <Grid container justifyContent='center' component='main'>
        <Outlet />
      </Grid>
    </Box>
  );
}

export default App;
