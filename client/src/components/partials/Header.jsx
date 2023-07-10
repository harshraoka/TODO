import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header(searchText, setsearchText) {
  const refresh = () => window.location.reload(true)
  const navigation = useNavigate()
  const [user, setuser] = useState(null)
  
  useEffect(() => {
    const u = localStorage.getItem('user');
    setuser(u);
  }, [])
  
  const handleLogout = () => {
    localStorage.clear();
    navigation("/register")
    refresh()
    
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Task Managment</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor03">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home
            <span className="visually-hidden">(current)</span>
          </Link>
        </li>
       
        {
          user ? <li className="nav-item">
          <Link className="nav-link" onClick={handleLogout} style={{cursor:'pointer'}}>Logout</Link>
        </li>
        :
        <> <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li></>
        }
        
        
      </ul>
  
    </div>
  </div>
</nav>
  )
}

export default Header