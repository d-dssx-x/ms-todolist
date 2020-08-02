import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import {useSelector, useDispatch} from 'react-redux'
import {switchDoneTask, switchImprtntTask} from '../../redux/actions'

const Item = ({title, id, done, listTitle, listId, important}) => {
  const classes = done ? ['item__circle_done', 'item__title_done'] : ['', '']

  const dispatch = useDispatch()

  const iconClass = important ? ' item__icon_imprt' : ''

  const titleList = useSelector((state) => state.lists)
      .find((el) => el.id === listId).title

  const showList = listTitle === titleList ? false : true

  const doneHandler = () => {
    return dispatch(switchDoneTask({
      id,
      done: !done,
    }))
  }

  const importantHandler = () => {
    return dispatch(switchImprtntTask({
      id,
      important: !important,
    }))
  }

  return (
    <div className="wrapper">
      <div className="item">
        <div
          role="button"
          onClick={doneHandler}
          className={`item__circle ${classes[0]}`}/>
        <div className="item__text">
          <div className={`item__title ${classes[1]}`}>
            {title}
          </div>
          {showList &&
          <div className="item__group">
            {titleList}
          </div>}
        </div>
        <div
          role="button"
          onClick={importantHandler}
          className={`item__icon ${iconClass}`}>
          {!important &&
            <i className="far fa-star"/>
          }
          {important &&
            <i className="fas fa-star"/>
          }
        </div>
      </div>
    </div>
  )
}

Item.propTypes = {
  title: PropTypes.string,
  done: PropTypes.bool,
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  important: PropTypes.bool,
  listTitle: PropTypes.string,
}

export default Item
