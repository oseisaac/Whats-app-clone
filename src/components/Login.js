import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

const Login = () => {
    const [{ }, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <h1>LOGIN</h1>
            <div className="login__container">
                <img src="http://3.bp.blogspot.com/-2fVvKtxqwB0/VUXkWMb--kI/AAAAAAAACI8/ANNIWneBF2Y/s1600/Whatsapp-logo-vector.png" alt="" />

                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button onClick={signIn}>
                    SIGN IN WITH GOOGLE
            </Button>
            </div>
        </div>
    );
}

export default Login;
