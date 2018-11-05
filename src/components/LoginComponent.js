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



            
       <br/><br/><br/><br/> <br/><br/> <br/><br/>
        To be fixed. Header and Nav shouldn't be here -_- I know how to do it,
        but I don't have time so charaaan
        <br/><br/><br/><br/> <br/><br/> <br/><br/>
        WALA PANI FUCTION,  nd ka ni kalogin, i true lang ang auth sa reducer. <br/>
        3 lang pwede mo maedit as of now <br/>
        Header <br/>
        Navbar <br/>
        Login <br/>
        </div>
    );
}