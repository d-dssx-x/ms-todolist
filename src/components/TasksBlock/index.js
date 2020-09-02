import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.scss'

const TasksBlock = ({title, tasks, showList, currentList, _open}) => {
  const [open, setOpen] = useState(_open || false)

  const classIcon = open ? 'down' : 'right'

  const openHandler = () => {
    return setOpen((prev) => !prev)
  }

  return (
    <>
      <div
        onClick={openHandler}
        className="completed">
        <div className="completed__icon">
          <i className={`fas fa-angle-${classIcon}`}/>
        </div>
        <div className="completed__title">
          {title}
        </div>
      </div>
      {open &&
        tasks.map((el, i) => <Item
          key={el.id}
          index={i}
          {...el}
          item={el}
          currentList={currentList}
          showList={showList}/>)
      }
    </>
  )
}

TasksBlock.propTypes = {
  title: PropTypes.string,
  tasks: PropTypes.array.isRequired,
  showList: PropTypes.bool,
  currentList: PropTypes.string.isRequired,
  _open: PropTypes.bool,
}


export default TasksBlock

