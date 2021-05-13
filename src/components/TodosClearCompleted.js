import React from 'react'
import PropTypes from 'prop-types'


const TodosClearCompleted = ({ clearCompletedTodos }) => {
  return (
    <div>
      <button onClick={() => clearCompletedTodos()}>Clear Completed</button>
    </div>
  )
}

TodosClearCompleted.propTypes = {
  clearCompletedTodos: PropTypes.func.isRequired
}
export default TodosClearCompleted
