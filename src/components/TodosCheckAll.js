import React from 'react'
import PropTypes from 'prop-types'

const TodosCheckAll = ({ remainingTodosCount, checkAllTodos }) => {
  return (
    <div><label><input type="checkbox" checked={remainingTodosCount() === 0} onChange={(event) => checkAllTodos(event)} /> Check All</label></div>
  )
}

TodosCheckAll.propTypes = {
  remainingTodosCount: PropTypes.func.isRequired,
  checkAllTodos: PropTypes.func.isRequired
}
export default TodosCheckAll
