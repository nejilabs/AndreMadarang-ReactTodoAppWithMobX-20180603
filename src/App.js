import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as classnames from 'classnames';

class App extends Component {
  // START: TEMPLATE
  render() {
    return (
      <div className="App">
        {/* START: HEADER */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {/* END: HEADER */}


        {/* START: TODO CONTAINER */}
        <div className="Todo-container">
          <input type="text" className="todo-input" placeholder="What needs to be done" onKeyUp={this.addTodo} ref={this.todoInput} />

          {/* Start: Display Todos */}
          {this.state.todos.map((todo, index) => {
            return (
              <div className="todo-item" key={todo.id}>
                <div className="todo-item-left">
                  <input type="checkbox" onChange={(event) => this.checkTodo(todo, index, event)} />

                  {todo.editing ? (
                    <input
                      type="text"
                      className="todo-item-edit"
                      onDoubleClick={(event) => this.doneEditTodo(todo, index, event)}
                      onKeyUp={(event) => {
                        if (event.key === "Enter") {
                          this.doneEditTodo(todo, index, event)
                        } else if (event.key === "Escape") {
                          this.cancelEditTodo(todo, index, event)
                        }
                      }}
                      defaultValue={todo.title}
                      autoFocus
                    />
                  ) : (
                    <div
                      className={classnames({ 'todo-item-label': true, 'completed': todo.completed })}
                      onDoubleClick={(event) => this.editTodo(todo, index, event)}
                    >
                      {todo.title}
                    </div>
                  )}
                </div>
                <div className="remove-item" onClick={() => this.deleteTodo(index)}>
                  &times;
                </div>
              </div>
            )
          })}
          {/* End: Display Todos */}


          {/* START: Select All and Item Remaining Counter */}
          <div className="extra-container">
            <div><label><input type="checkbox" /> Check All</label></div>
            <div>remaining items left</div>
          </div>
          {/* END: Select All and Item Remaining Counter */}


          {/* START: Extra Buttons */}
          <div className="extra-container">
            <div>
              <button >All</button>
              <button>Active</button>
              <button >Completed</button>
            </div>

            <div>
              {/* <transition name="fade"> */}
              <button >Clear Completed</button>
              {/* </transition> */}
            </div>
          </div>
          {/* END: Extra Buttons */}
        </div>
        {/* END: TODO CONTAINER */}

      </div >
    );
  }
  // END: TEMPLATE

  // START: STATES
  state = {
    todos: [
      {
        'id': 0,
        'title': 'Title1',
        'completed': false,
        'editing': false,
      },
      {
        'id': 1,
        'title': 'Title2',
        'completed': false,
        'editing': false,
      },
    ],
    todoId: 3,
  }
  todoInput = React.createRef();
  // END: STATES


  // START: METHODS
  /**
   * START: 
   * @name: addTodo()
   * @description: adds new todo
   * @param event
   */
  addTodo = (event) => {
    if (event.key === 'Enter') {
      const todoInput = this.todoInput.current.value;

      //if input value is empty, do not add
      if (todoInput.trim().length === 0) {
        return;
      }

      // Start: Add new todo to todos for display
      this.setState((prevState, props) => {
        let newTodoId = prevState.todoId++;

        let newTodos = [
          ...prevState.todos,
          {
            id: newTodoId,
            title: todoInput,
            completed: false,
          }
        ]
        return { todos: newTodos }
      })
      // End: Add new todo to todos for display
      this.todoInput.current.value = ""
    }
  }
  // END: addTodo()

  /**
   * START: 
   * @name: deleteTodo()
   * @description: deletes todo
   * @param index
   */
  deleteTodo = index => {
    // Start: Deletes todo 
    this.setState((prevState, props) => {
      let todos = prevState.todos;

      //have the index, and just remove that 1.
      todos.splice(index, 1);

      return {
        todos: todos
      }
    })
    // End: Deletes todo 
  }
  // END: deleteTodo()

  /**
   * @name checkTodo()
   * @description checks unchecks a todo
   * @param todo, index
   */
  checkTodo = (todo, index, event) => {
    todo.completed = !todo.completed;
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos.splice(index, 1, todo);
      return { todos };
    });
  }
  // // END: checkTodo()

  /**
 * @name editTodo()
 * @description edits a todo
 * @param todo, index
 */
  editTodo = (todo, index, event) => {
    todo.editing = true;

    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos.splice(index, 1, todo);

      return { todos };
    });
  }
  // END: editTodo()

  /**
* @name doneEditTodo()
* @description updates todo after pressing "Enter"
* @param todo, index, event
*/
  doneEditTodo = (todo, index, event) => {
    event.persist();
    todo.editing = false;
    todo.title = event.target.value;

    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos.splice(index, 1, todo);
      return { todos };
    });

  }
  // END: doneEditTodo()

  /**
* @name cancelEditTodo()
* @description cancel updating todo after pressing "Escape"
* @param todo, index, event
*/
  cancelEditTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = false;
      todos.splice(index, 1, todo);
      return { todos };
    });
  }
  // END: cancelEditTodo()

  // END: METHODS

}

export default App;
