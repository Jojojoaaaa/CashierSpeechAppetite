import React from 'react';

export default function LoginComponent(props) {
    const {
        handlePasswordInput,
        handleLogin,
        password,
        } = props
    return (
       <div>Welcome, Admin! <br/><br/>
            <input
                type='password'
                onChange={(e) => handlePasswordInput(e.target.value)}/>
            <br/>
            <button onClick={() => handleLogin(password)}>Login</button>

        </div>
    );
}