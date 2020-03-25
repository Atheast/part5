import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import loginServices from './services/login';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    if(loggedUser) {
      loginServices.findUser(loggedUser.username)
        .then(() => {
          setUser(loggedUser);
        });
    }
  },[]);

  if(!user) {
    return(
      <div>
        <Login setUser={setUser}/>
      </div>
    );
  } else {
    return(
      <div>
        <Blogs user={user} setUser={setUser}/>
      </div>
    );
  }
};

export default App;
