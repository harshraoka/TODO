import React, { useState, useEffect } from 'react'
import { login } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './partials/Header.jsx';

function Login() {
    const navigation = useNavigate()
    const [form, Setform] = useState({
        username: "",
        password: "",
    })


    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user){
          navigation('/')
        }
      }, [])

    
    const [errors, seterrors] = useState(null);


    const handleChange = (e) => {
        Setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        console.log("form", form);
        const result = await login(form);
        console.log("form", result);
        seterrors(null)

        if (result.status == 200) {
            if (result.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data.data))
                navigation("/");
                return;
            }
        }
        if (result.data.status === 201) {
            seterrors(result.data.data)
            return;
        }
        if (result.data.status === 202) {
            toast(result.data.msg);
            return;
        }
    }
    return (
        
        <>
        <Header/>
         <div className='container'>
         
            <ToastContainer />
            <div className='row justify-content-center mt-4'>
                <div className="col-lg-5 card border-primary mt-4">

                    <div className="card-body">
                        <h4 className="card-title">Login now</h4>
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="form-label mt-4">Email or username</label>
                            <input type="text" onChange={handleChange} name='username' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email or username" />
                            {
                                errors?.username && (
                                    <small id="emailHelp" class="form-text text-muted">
                                        {errors.username.msg}
                                    </small>
                                )
                            }
                            <label for="exampleInputEmail1" class="form-label mt-4">Password</label>
                            <input type="password" onChange={handleChange} name='password' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password" />
                            {
                                errors?.password && (
                                    <small id="emailHelp" class="form-text text-muted">
                                        {errors.password.msg}
                                    </small>
                                )
                            }
                        </div>
                        <button type="button" className="btn btn-outline-success mt-4" onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
        </>
       
    )
}

export default Login