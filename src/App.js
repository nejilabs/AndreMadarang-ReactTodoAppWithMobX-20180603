import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


import TodosRemaining from './components/TodosRemaining';
import TodoItem from './components/TodoItem';
import TodosCheckAll from './components/TodosCheckAll';
import TodosFiltered from './components/TodosFiltered';
import TodosClearCompleted from './components/TodosClearCompleted';

import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class App extends Component {
  // START: TEMPLATE
  render() {
    const TodoStore = this.props.TodoStore;
    return (
      <div className="App">
        {/* START: HEADER */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {/* END: HEADER */}


        {/* START: TODO CONTAINER */}
        <div className="Todo-container">
          <input type="text" className="todo-input" placeholder="What needs to be done" onKeyUp={TodoStore.addTodo} ref={TodoStore.todoInput} />

          {/* Start: Display Todos */}
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {TodoStore.todos.map((todo, index) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                />
              )
            })}
          </ReactCSSTransitionGroup>
          {/* End: Display Todos */}


          {/* START: Select All and Item Remaining Counter */}
          <div className="extra-container">
            {/* <TodosCheckAll remainingTodosCount={TodoStore.remainingTodosCount} checkAllTodos={TodoStore.checkAllTodos} />
            <TodosRemaining remaining={TodoStore.remainingTodosCount()} /> */}
          </div>
          {/* END: Select All and Item Remaining Counter */}


          {/* START: Extra Buttons */}
          <div className="extra-container">
            {/* Start: Filter Buttons */}
            <TodosFiltered filter={TodoStore.filter} updateFilter={TodoStore.updateFilter} />
            {/* End: Filter Buttons */}


            {/* Start: Clear Completed Button */}
            {/* {TodoStore.completedTodosCount() > 0 &&
              <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                <TodosClearCompleted clearCompletedTodos={TodoStore.clearCompletedTodos} />
              </ReactCSSTransitionGroup>} */}


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

  // END: STATES

  // START: COMPUTED

  // END: COMPUTED


  // START: METHODS
  // END: METHODS

}

export default App;
