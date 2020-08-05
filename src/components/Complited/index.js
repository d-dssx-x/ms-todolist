import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.scss'

const Complited = ({tasks, showList, currentList}) => {
  const [open, setOpen] = useState(false)

  const openHandler = () => {
    return setOpen((prev) => !prev)
  }

  return (
    <>
      <div
        onClick={openHandler}
        className="complited">
        <div className="complited__icon">
          {!open &&
            <i className="fas fa-angle-right"/>
          }
          {open &&
            <i className="fas fa-angle-down"/>
          }
        </div>
        <div className="complited__title">
          Complited
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

Complited.propTypes = {
  tasks: PropTypes.array.isRequired,
  showList: PropTypes.bool,
  currentList: PropTypes.string.isRequired,
}


export default Complited
