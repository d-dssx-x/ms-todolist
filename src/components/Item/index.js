import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  switchDoneTask,
  switchImprtntTask,
  selectTask,
  switchTasksInList,
  hideModal} from '../../redux/actions'
import {useDrop, useDrag} from 'react-dnd'
import {DND_ITEM} from '../../types'
import moment from 'moment'

const Item = ({
  title,
  id,
  item,
  remind,
  due,
  note,
  index,
  done,
  listTitle,
  listId,
  currentList,
  important,
  myday}) => {
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
    dispatch(hideModal())
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
      if (item.done) return
      dispatch(switchTasksInList({dragI, hoverI, listId: currentList}))
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
          <div className="item__group">
            {showList &&
              <div className="item__list">{titleList}</div>
            }
            {myday &&
              <div className="item__sun">
                <i className="far fa-sun" />
              </div>
            }
            {remind &&
              <div className="item__bell">
                <i className="far fa-bell" />
              </div>
            }
            {due &&
              <div className="item__due">
                <div className="item__calendar">
                  <i className="far fa-calendar-alt"/>
                </div>
                Due {moment(due).format('ll')}
              </div>
            }
            {note &&
              <div className="item__note">
                <i className="far fa-sticky-note"></i>
              </div>
            }
          </div>
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
      <div
        id={`item-${id}`}
        className="wrapper__click"/>
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
  remind: PropTypes.string,
  due: PropTypes.string,
  note: PropTypes.string,
  currentList: PropTypes.string.isRequired,
  myday: PropTypes.bool,
}

export default Item
