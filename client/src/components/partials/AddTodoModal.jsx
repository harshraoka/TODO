import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTodoApi } from '../../services/api';

function AddTodoModal({setrefreshList}) {
  const [todoDesc, settodoDesc] = useState("");
  const handleTodoSubmit = async()=>{
    console.log(todoDesc)
    
    if(todoDesc===''){
      toast('Task is required')
      return;
    }
    const result = await createTodoApi({desc:todoDesc})
    setrefreshList( new Date() )
    settodoDesc("")
    if(result.status===200 && result.data.message===200){
      toast('Task Added successfully')
      // console.log('hello tis line exist')
      // setrefreshList( new Date() )
      settodoDesc("");

    }
    else{
      toast(result.data.message)
    }
  }
  return (
    <div className="modal mt-5" id='exampleModal'>
       <ToastContainer />
    <div className="modal-dialog" role='document'>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            Add new Task
          </div>
          <button type='button' className='btn-close' data-bs-dismiss='modal'>
            <span></span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <textarea name="" className='form-control' rows={3} onChange={(e)=>{settodoDesc(e.target.value)}} placeholder='Enter the task'></textarea>
          </div>
        </div>
        <m className="modal-footer">
          <button className='btn btn-secondary' onClick={handleTodoSubmit} data-bs-dismiss="modal">Save Todo</button>
          <button className='btn btn-outline-danger' onClick={()=>{settodoDesc("")}} data-bs-dismiss="modal" >Close</button>
        </m>
      </div>
    </div>
      </div>
  )
}

export default AddTodoModal