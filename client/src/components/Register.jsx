import React from 'react'
import { useState, useEffect } from 'react'
import { register } from '../services/api.js'
import { ToastContainer, toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import Header from './partials/Header.jsx'

function Register() {
  const navigation = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user){
      navigation('/')
    }
  }, [])
  

  const [errors, seterrors] = useState(null)

  const [form, setform] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const handleReg = () =>{
    navigation('/login')
  }
  const handleSubmit = async () => {
    const result = await register(form)
    if (result.status === 200) {
      if (result.data.status === 201) {
        seterrors(result.data.data)
        toast(result.data.message)
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem('user',JSON.stringify(result.data.data));
        navigation('/')
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message)
        return;
      }
    }
    else {
      toast('something went wrong, please try again')
    }
  }

  return (
    <>
    <Header/>
    <div className='container'>
      
      <ToastContainer />
      <div className='row justify-content-md-center mt-4'>
        <div className='col-lg-5 card border-primary mb-3'>
          <div className='card-header h4 text-center'>
            Register an account
          </div>
          <div className='card-body'>
            <div className='form-group'>
              <label className='col-form-label mt-4'>
                Name
              </label>
              <input onChange={handleInputChange} type="text" name='name' className='form-control' placeholder='Enter name' />
              {
                errors?.name && (
                  <small id="emailHelp" class="form-text text-muted">
                    {errors.name.msg}
                  </small>
                )
              }
            </div>
            <div className='form-group'>
              <label className='col-form-label mt-4'>
                Username
              </label>
              <input onChange={handleInputChange} type="text" name='username' className='form-control' placeholder='Enter Username' />
              {
                errors?.username && (
                  <small id="emailHelp" class="form-text text-muted">
                    {errors.username.msg}
                  </small>
                )
              }
            </div>

            <div className='form-group'>
              <label className='col-form-label mt-4'>
                Email
              </label>
              <input onChange={handleInputChange} type="email" name='email' className='form-control' placeholder='Enter Email ID' />
              {
                errors?.email && (
                  <small id="emailHelp" class="form-text text-muted">
                    {errors.email.msg}
                  </small>
                )
              }
            </div>
            <div className='form-group'>
              <label className='col-form-label mt-4'>
                Password
              </label>
              <input onChange={handleInputChange} type="password" name='password' className='form-control' placeholder='Enter Password' />
              {
                errors?.password && (
                  <small id="emailHelp" class="form-text text-muted">
                    {errors.password.msg}
                  </small>
                )
              }
            </div>

            <div className='row justify-content-md-center form-group mt-4'>
              <button type='button' onClick={handleSubmit} className='col-sm-6 btn btn-outline-success center mr-2'>
                Register Now
              </button>
              <button type='button' onClick={handleReg} className='col-sm-6 btn btn-outline-danger center'>
                Already have an account
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default Register