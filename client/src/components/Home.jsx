import React from 'react'
import Header from './partials/Header.jsx'
import Todo from './partials/Todo.jsx'
import AddTodoModal from './partials/AddTodoModal.jsx'
import { getTodoListApi, getToken } from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const navigation = useNavigate()
  const [list, setlist] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [setFilteredList, setsetFilteredList] = useState([])
  const [refreshList, setrefreshList] = useState(new Date());
  useEffect(() => {
    if(!getToken()){
      navigation('/register')
    }
    fetchTodoList()
  }, [refreshList])

  useEffect(() => {
    if(searchText===''){
      setsetFilteredList(list)
    }
    else{
      const filterlist = list.filter(todo=>todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
      setsetFilteredList(filterlist)
    }
  }, [list,searchText])
  

  async function fetchTodoList(){
    const result = await getTodoListApi()
    console.log('todolist',result)
    if(result.status===200 && result.data.status===200){
      setlist(result.data.data.todos.reverse())
    }
  }

  return (
    <div>
      <Header  searchText={searchText}  setsearchText={setsearchText}/>
            <form className="d-flex">
        <input onChange={(e)=>setsearchText(e.target.value)} value={searchText} className="form-control me-sm-2" type="search" placeholder="Search"/>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-md-center mt-4"></div>
        {
          setFilteredList.map((todo)=><Todo todo={todo} key={todo._id} setrefreshList={setrefreshList}/>)
        }
        {
          setFilteredList.length===0 && <div className='notFoundTodos'>
            <h1>NO TASKS SUCH FOUND</h1>
          </div>
        }
      </div>
      <div className='' style={{ position: 'fixed', right: 50, bottom: 50, zindex: 1030 }}>
        <button type='button' className='btn btn-outline-light' data-bs-toggle='modal' data-bs-target='#exampleModal'>ADD</button>
      </div>


      <AddTodoModal setrefreshList={setrefreshList}/>
    </div>
  )
}

export default Home