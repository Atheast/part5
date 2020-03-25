import React, {useState} from 'react';
import loginService from '../services/login';

const Login = ({setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({username,password});
      setUsername('');
      setPassword('');
      setUser(user);
      window.localStorage.setItem('loggedUser',JSON.stringify(user));
    } catch(e) {
      console.log('aa');
      setError('Invalid username or password');
      setTimeout(() => setError(null), 3000);
    }
  };

  return(
    <div className="login">
      <h2>Log in </h2>
      <ErrorMessage error={error} />
      <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button id="LogIn">Log In</button>
      </form>
    </div>
  );
};

const ErrorMessage = ({error}) => {
  if(error) {
    return(
      <h2 className="error">{error}</h2>
    );
  } else {
    return '';
  }
};

export default Login;