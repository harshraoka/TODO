import React from 'react'
import moment from 'moment/moment'
import { deleteTodoList, markTodoList } from '../../services/api'
import { toast } from 'react-toastify'

function Todo({todo,setrefreshList}) {
  const handleDelete = async() => { 
      const result = await deleteTodoList({
        todo_id:todo._id
      })

      if(result.data.status===200){
        setrefreshList(new Date())
        toast('deleted successfully')
      }
      else{
        toast('failed to delete')
      }
   }

   const handleMark = async() => { 
    const result = await markTodoList({
      todo_id:todo._id
    })

    if(result.data.status===200){
      setrefreshList(new Date())
      toast('updated successfully')
    }
    else{
      toast('failed to update')
    }
 }
  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light'>
        <div className="card-header">
            {todo.isCompleted ? ' Completed': 'Not Completed' }
        </div>
        <div className="card-body">
            <h4 className='card-title' style={{textDecoration: !todo.isCompleted ? 'line-through':'none' ,color:'black'}}>{todo.desc}</h4>
            <p className='card-text'>{moment(todo.date).fromNow()}</p>

          <div>
          <div className="actionBUttons" style={{display:'flex', justifyContent:'space-between'}}>
              <button style={{background:'red'}} onClick={handleDelete} >Delete</button>
              <div className="markTodo">
              <button onClick={handleMark} >{todo.isCompleted ? 'Mark Uncompleted' : 'Mark Completed'}</button>
            </div>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default Todo