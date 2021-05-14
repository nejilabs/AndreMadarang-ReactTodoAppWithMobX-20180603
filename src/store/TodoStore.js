import React from 'react'
import { observable, action, computed } from 'mobx'

class TodoStore {
  // START: OBSERVABLES
  @observable todos = [
    {
      'id': 0,
      'title': 'Title3',
      'completed': false,
      'editing': false,
    },
    {
      'id': 1,
      'title': 'Title4',
      'completed': false,
      'editing': false,
    },
  ];
  @observable todoId = 3;
  @observable filter = 'all';
  @observable todoInput = React.createRef();
  // END: OBSERVABLES



  // START: COMPUTED
  /**
* @name remainingTodosCount()
* @description counts remaining items
* @param 
*/
  @computed get remainingTodosCount() {
    return this.todos.filter(todo => !todo.completed).length
  }
  // END: remainingTodosCount()


  /**
  * @name completedTodosCount()
  * @description counts completed items
  * @param 
  */
  @computed get completedTodosCount() {
    return this.todos.filter(todo => todo.completed).length
  }
  // END: completedTodosCount()


  /**
  * @name filteredTodos()
  * @description filtered todo data
  * @param 
  */
  @computed get filteredTodos() {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }
  // END: filteredTodos()
  // END: COMPUTED




  // START: ACTIONS
  /**
     * START: 
     * @name: addTodo()
     * @description: adds new todo
     * @param event
     */
  @action addTodo = (event) => {
    if (event.key === 'Enter') {
      const todoInput = this.todoInput.current.value;

      //if input value is empty, do not add
      if (todoInput.trim().length === 0) {
        return;
      }

      const newTodo = {
        id: this.todoId,
        title: todoInput,
        completed: false,
        editing: false,
      }

      // Add new todo to todos for display
      this.todos.push(newTodo)

      this.todoId++;
      this.todoInput.current.value = ""



      console.log('addTodo')
    }
  }
  // END: addTodo()


  /**
   * START: 
   * @name: deleteTodo()
   * @description: deletes todo
   * @param index
   */
  @action deleteTodo = index => {
    this.todos.splice(index, 1);
    console.log('deleteTodo')

  }
  // END: deleteTodo()

  /**
   * @name checkTodo()
   * @description checks unchecks a todo
   * @param todo, index
   */
  @action checkTodo = (todo, index, event) => {
    todo.completed = !todo.completed;
    this.todos.splice(index, 1, todo);
    console.log('checkTodo')

  }
  // // END: checkTodo()

  /**
 * @name editTodo()
 * @description edits a todo
 * @param todo, index
 */
  editTodo = (todo, index, event) => {
    todo.editing = true;
    this.todos.splice(index, 1, todo);
    console.log('editTodo')

  }
  // END: editTodo()

  /**
* @name doneEditTodo()
* @description updates todo after pressing "Enter"
* @param todo, index, event
*/
  @action doneEditTodo = (todo, index, event) => {
    todo.editing = false;
    todo.title = event.target.value;

    this.todos.splice(index, 1, todo);
    console.log('doneEditTodo')

  }
  // END: doneEditTodo()

  /**
* @name cancelEditTodo()
* @description cancel updating todo after pressing "Escape"
* @param todo, index, event
*/
  @action cancelEditTodo = (todo, index, event) => {
    todo.editing = false;
    this.todos.splice(index, 1, todo);
    console.log('cancelEditTodo')

  }
  // END: cancelEditTodo()

  /**
* @name clearCompletedTodos()
* @description clears completed todos
* @param 
*/
  @action clearCompletedTodos = () => {
    this.todos.filter((todo) => !todo.completed)
    console.log('clearCompletedTodos')

  }
  // END: clearCompletedTodos()

  /**
* @name checkAllTodos()
* @description Select all Todos
* @param todo, index, event
*/
  @action checkAllTodos = (event) => {
    this.todos.forEach(todo => todo.completed = event.target.checked)
    console.log('checkAllTodos')
  }
  // END: checkAllTodos()

  /**
* @name updateFilter()
* @description updated the filter
* @param 
*/
  @action updateFilter = (filter) => {
    this.filter = filter
  }
  // END: ACTIONS
}

const store = new TodoStore();
export default store;