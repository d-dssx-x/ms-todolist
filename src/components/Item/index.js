import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  switchDoneTask,
  switchImprtntTask,
  selectTask,
  switchTasksInList} from '../../redux/actions'
import {useDrop, useDrag} from 'react-dnd'
import {DND_ITEM} from '../../types'

const Item = ({title, id, item, index, done, listTitle, listId, important}) => {
  const classes = done ? ['item__circle_done', 'item__title_done'] : ['', '']

  const currentSelected = useSelector((state) => state.system)

  const selectedClass = currentSelected
      .selectedTasks === id ? 'wrapper_selected' : ''

  const dispatch = useDispatch()

  const iconClass = important ? ' item__icon_imprt' : ''

  const titleList = useSelector((state) => state.lists)
      .find((el) => el.id === listId).title

  const showList = listTitle === titleList ? false : true

  const doneHandler = (event) => {
    event.stopPropagation()
    return dispatch(switchDoneTask(id))
  }

  const importantHandler = (event) => {
    event.stopPropagation()
    return dispatch(switchImprtntTask(id))
  }

  const selectTaskHandler = () => {
    return dispatch(selectTask(id))
  }

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: DND_ITEM,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragI = item.index
      const hoverI = index

      if (dragI === hoverI) {
        return
      }

      dispatch(switchTasksInList({dragI, hoverI, listId}))

      item.index = hoverI
    },
  })

  const [{isDragging}, drag] = useDrag({
    item: {type: DND_ITEM, ...item, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      style={{opacity: isDragging ? 0 : 1}}
      ref={drag(drop(ref))}
      onClick={selectTaskHandler}
      className={`wrapper ${selectedClass}`}>
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
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default Item
