// import logo from './logo.svg';
import { Fragment, useEffect, useState } from 'react';
import './App.css';
import './index.css'
import axios from 'axios'
// import User from './Components/User';
import {useParams,useLocation,Link} from 'react-router-dom'
function App() {
  const [users,setUsers] = useState([])
  const [searchId,setSearchId] = useState()
  
  
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(data => {console.log(data.data);
      setUsers(data.data);
    }
    )
    .catch(error => console.log(error)
    )
  },[])



  function getUserById(id){
    if(id){
      axios.get(`https://jsonplaceholder.typicode.com/users?id=`+id)
    .then(data => {console.log(data.data);
      setUsers(data.data);
    }
    )
    .catch(error => console.log(error)
    )
    }
    else{
      axios.get('https://jsonplaceholder.typicode.com/users')
    .then(data => {console.log(data.data);
      setUsers(data.data);
    }
    )
    .catch(error => console.log(error)
    )
    }
  }
  
  
  function deleteUser(id){
    let updatedUsers = users.filter((user)=>{
      return user.id!== id
    })
    setUsers(updatedUsers)
  }
  
  return (
    <>
    <h1 className='main-heading'>User Dashboard</h1>
    <div className='search-container' >
    <input type="search" value={searchId} onChange={(e)=>setSearchId(e.target.value)} />
    <button className='' onClick={()=>{
      getUserById(searchId)
    }}>Search</button>
    </div>
    
    
    <div className='users-container'>
    {
      users.map((user)=>{
        return <>
        <div className='user-container'>
        <Link to={'/user/'+user.id} key={user.id}>
        <div className='user-card'>
        <User id={user.id} name={user.name} city={user.address.city} email={user.email} key={user.id} deleteUser={deleteUser}/>
        </div>
        </Link>
        <button className='delete-button' onClick={()=>{
            deleteUser(user.id);
            console.log(users);
          }}>Delete</button>
        <button className='edit-button' >Edit</button>
        </div>
        </>
        
      })
    }
    </div>
  </>
  );
}

function User({id,name,email,city}){
  return(
      <>
      <h4>User Profile</h4>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
      <ul className="user">
          <li>{id}</li>
          <li><h4>{name}</h4></li>
          <li>{email}</li>
          <li>{city}</li>
      </ul>
      </>
  )
}

export default App;
