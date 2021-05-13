import React from 'react'
import PropTypes from 'prop-types'
import * as classnames from 'classnames';


const TodoItem = ({
  todo,
  index,
  checkTodo,
  doneEditTodo,
  cancelEditTodo,
  deleteTodo,
  editTodo
}) => {
  return (

    <div className="todo-item">
      <div className="todo-item-left">
        <input type="checkbox" onChange={(event) => checkTodo(todo, index, event)} checked={todo.completed} />

        {todo.editing ? (
          <input
            type="text"
            className="todo-item-edit"
            onDoubleClick={(event) => doneEditTodo(todo, index, event)}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                doneEditTodo(todo, index, event)
              } else if (event.key === "Escape") {
                cancelEditTodo(todo, index, event)
              }
            }}
            defaultValue={todo.title}
            autoFocus
          />
        ) : (
          <div
            className={classnames({ 'todo-item-label': true, 'completed': todo.completed })}
            onDoubleClick={(event) => editTodo(todo, index, event)}
          >
            {todo.title}
          </div>
        )}
      </div>
      <div className="remove-item" onClick={() => deleteTodo(index)}>
        &times;
                </div>
    </div>

  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  checkTodo: PropTypes.func.isRequired,
  doneEditTodo: PropTypes.func.isRequired,
  cancelEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired
}

export default TodoItem
