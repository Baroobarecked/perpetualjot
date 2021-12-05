import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from "react-router";
import { addUserSession } from "../../store/session";

import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = {
            credential: userName,
            password,
        }
        const res = await dispatch(addUserSession(credentials));
        // //console.log(res);
        setPassword('');
        if(res.user) {
            history.push('/')
        } else {
        }
    }


    return (
        <form>
            <label htmlFor='user'>Username or Email</label>
            <input type='text' name='user' value={userName} onChange={e => setUserName(e.target.value)}></input>
            <label htmlFor='password'>Password</label>
            <input type='text' name='password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button onClick={handleSubmit}>Login</button>
        </form>
    );
};

export default LoginFormPage;