import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const Page404 = ({type}) => {
  const title = type === 'tasks'?
      'Oops... Tasks not found.' : 'Oops... List not found.'
  const className = type === 'tasks' ? 'not-found_tasks' : ''
  return (
    <div className="not-found">
      <h1 className={`not-found__title ${className}`}>{title}</h1>
    </div>
  )
}

Page404.propTypes = {
  type: PropTypes.string,
}

export default Page404
