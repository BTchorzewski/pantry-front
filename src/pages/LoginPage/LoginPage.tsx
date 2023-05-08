import React, { useEffect, useRef, useState } from 'react';
import { JwtPayload, LoginReq, LoginRes } from '../../types';
import { AxiosError, AxiosInstance } from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { authSelector, login } from '../../redux/authSlice/authSlice';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const authStore = useSelector(authSelector);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: userEmail,
      password: userPassword,
    } as LoginReq;
    // @ts-ignore
    const res = await dispatch(login(data));
    if (res.error) {
      setErrorMsg('Wrong password or email.');
    }
  };

  if (authStore.auth.isAuth) {
    navigate('/pantries');
  }

  return (
    <>
      <Grid
        item
        bgcolor='yellow'
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      ></Grid>
      <Grid item xs={12} sm={12} md={10} lg={5} xl={3}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '3rem 0',
            '> *': {
              marginTop: '1.6rem',
            },
            md: {
              width: '100%',
            },
            backgroundColor: 'white',
            padding: '3rem',
          }}
          component='form'
        >
          <Typography
            variant='h2'
            align='left'
            sx={{
              color: 'primary.dark',
            }}
          >
            Login
          </Typography>
          <TextField
            fullWidth
            id='email'
            label='Email'
            type='text'
            value={userEmail}
            onChange={(e) => {
              e.preventDefault();
              setUserEmail(e.target?.value);
            }}
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            value={userPassword}
            onChange={(e) => {
              e.preventDefault();
              setUserPassword(e.target?.value);
            }}
          />
          <Button
            variant={'contained'}
            color={'primary'}
            size={'medium'}
            type={'submit'}
            onClick={onSubmit}
          >
            Login
          </Button>
        </Container>
        {!errorMsg ? null : (
          <Alert
            variant='outlined'
            severity='error'
            onClose={() => {
              setErrorMsg('');
            }}
          >
            Wrong password or email
          </Alert>
        )}
      </Grid>
    </>
  );
};
