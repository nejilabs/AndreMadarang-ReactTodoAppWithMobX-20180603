import React from 'react'
import PropTypes from 'prop-types'
import * as classnames from 'classnames';


const TodosFiltered = ({ filter, updateFilter }) => {
  return (
    <div>
      <button className={classnames({ 'active': filter === 'all' })} onClick={() => updateFilter('all')}>All</button>
      <button className={classnames({ 'active': filter === 'active' })} onClick={() => updateFilter('active')}>Active</button>
      <button className={classnames({ 'active': filter === 'completed' })} onClick={() => updateFilter('completed')}>Completed</button>
    </div>
  )
}

TodosFiltered.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired
}
export default TodosFiltered
