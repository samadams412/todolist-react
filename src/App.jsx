
import { useState } from "react";
import "./assets/style.css"

export default function App(){
  //state variable is immutable, it cannot be updated
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id) {
          return {...todo, completed};
        }
        return todo;
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    //when you need the current value of state you must pass a function not just a value
    setTodos((currentTodos => {
      return [
        ...todos, {id: crypto.randomUUID(), title: newItem, completed: false}
      ]
    }))
    setNewItem("");
   
  }
  console.log(todos);
  return(
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Add Item</label>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item"></input> 
        </div>
        <button className="btn">Add</button>
      </form>
      <h1>ToDo List</h1>
      <ul className="list">
        {/* Short circuiting to determine if todos contains any todo */}
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
          return(
            //react uses key so that we know which todo element to update
            //not a good idea to use index of the array because if we delete there could be bugs
            <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed} 
              onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                {todo.title}
            </label>
            {/* Must pass the function to onClick because otherwise it will call deleteTodo right away */}
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
          </li>
          )
        })}
      </ul>
    </>
    );
};