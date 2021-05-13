import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import TodosRemaining from './components/TodosRemaining';
import TodoItem from './components/TodoItem';
import TodosCheckAll from './components/TodosCheckAll';
import TodosFiltered from './components/TodosFiltered';
import TodosClearCompleted from './components/TodosClearCompleted';

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
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {this.filteredTodos().map((todo, index) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  checkTodo={this.checkTodo}
                  doneEditTodo={this.doneEditTodo}
                  cancelEditTodo={this.cancelEditTodo}
                  deleteTodo={this.deleteTodo}
                  editTodo={this.editTodo}
                />
              )
            })}
          </ReactCSSTransitionGroup>
          {/* End: Display Todos */}


          {/* START: Select All and Item Remaining Counter */}
          <div className="extra-container">
            <TodosCheckAll remainingTodosCount={this.remainingTodosCount} checkAllTodos={this.checkAllTodos} />
            <TodosRemaining remaining={this.remainingTodosCount()} />
          </div>
          {/* END: Select All and Item Remaining Counter */}


          {/* START: Extra Buttons */}
          <div className="extra-container">
            {/* Start: Filter Buttons */}
            <TodosFiltered filter={this.state.filter} updateFilter={this.updateFilter} />
            {/* End: Filter Buttons */}


            {/* Start: Clear Completed Button */}
            {this.completedTodosCount() > 0 &&
              <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                <TodosClearCompleted clearCompletedTodos={this.clearCompletedTodos} />
              </ReactCSSTransitionGroup>

            }
            {/* End: Clear Completed Button */}


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
    filter: ''
  }
  todoInput = React.createRef();
  // END: STATES

  // START: COMPUTED
  /**
* @name remainingTodosCount()
* @description counts remaining items
* @param 
*/
  remainingTodosCount = () => {
    return this.state.todos.filter(todo => !todo.completed).length
  }
  // END: remainingTodosCount()


  /**
* @name completedTodosCount()
* @description counts completed items
* @param 
*/
  completedTodosCount = () => {
    return this.state.todos.filter(todo => todo.completed).length
  }
  // END: completedTodosCount()

  /**
* @name updateFilter()
* @description counts completed items
* @param 
*/
  updateFilter = filter => {
    this.setState({ filter: filter })
  }

  /**
* @name filteredTodos()
* @description filtered todo data
* @param 
*/
  filteredTodos = () => {
    if (this.state.filter === 'all') {
      return this.state.todos;
    } else if (this.state.filter === 'active') {
      return this.state.todos.filter(todo => !todo.completed);
    } else if (this.state.filter === 'completed') {
      return this.state.todos.filter(todo => todo.completed);
    }
    return this.state.todos;
  }
  // END: filteredTodos()
  // END: COMPUTED


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

  /**
* @name clearCompletedTodos()
* @description clears completed todos
* @param 
*/
  clearCompletedTodos = () => {
    this.setState((prevState, props) => {
      return { todos: prevState.todos.filter((todo) => !todo.completed) }
    }
    );

  }
  // END: clearCompletedTodos()

  /**
* @name checkAllTodos()
* @description Select all Todos
* @param todo, index, event
*/
  checkAllTodos = (event) => {
    event.persist();

    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todos.forEach(todo => todo.completed = event.target.checked)
      return { todos };
    });

  }
  // END: checkAllTodos()




  // END: METHODS

}

export default App;
