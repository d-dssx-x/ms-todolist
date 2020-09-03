import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  addToMyDayTask,
  removeFromMyDayTask,
  hideModal,
  switchDoneTask,
  switchImprtntTask,
  moveTaskToList,
  showListModal,
  hideListModal,
  showDeleteAlert,
  addDueToDay,
  addDueTomorrow,
  deleteDue} from '../../redux/actions'
import PropTypes from 'prop-types'
import './index.scss'

const ModalWindow = () => {
  const modal = useSelector((state) => state.system).modal
  const task = useSelector((state) => state.tasks)
      .find((el) => el.id === modal.id)
  const dispatch = useDispatch()

  const lists = useSelector((state) => state.lists)
      .filter((el) => el.type === 'custom')
  const listsLength = lists.length > 8 ? 8 : lists.length

  const [cord, setCord] = useState({
    x: null,
    y: null,
  })


  useEffect(() => {
    const height = document.documentElement.clientHeight
    if (modal.show) {
      if (height - modal.y < 350) {
        return setCord({
          x: modal.x,
          y: modal.y - 200,
        })
      }
      return setCord({
        x: modal.x,
        y: modal.y,
      })
    }
  }, [modal])


  const deleteHandler = (id) => {
    return dispatch(showDeleteAlert({
      type: 'task',
      id,
    }))
  }

  const onMouseOverHandler = (event) => {
    const hight = document.documentElement.clientHeight
    const width = document.documentElement.clientWidth
    const position = {
      left: -250,
      top: 200,
    }
    if (width/2 > event.pageX) {
      position.left = 150
    }
    if (event.pageY + 400 > hight && listsLength > 2) {
      position.top = listsLength * (-5)
    }


    dispatch(showListModal({...position}))
  }

  return (
    <>
      {modal.show &&
        <div
          onClick={()=>dispatch(hideModal())}
          style={{left: cord.x, top: cord.y}}
          className="modal">
          {!task.important &&
            <Button
              id={modal.id}
              title="Mark at important"
              icon="fas fa-star"
              onClick={(id) => dispatch(switchImprtntTask(id))}
              onMouseOver={() => dispatch(hideListModal())}
            />

          }
          {task.important &&
            <Button
              id={modal.id}
              title="Remove importance"
              icon="far fa-star"
              onClick={(id) => dispatch(switchImprtntTask(id))}
              onMouseOver={() => dispatch(hideListModal())}
              active
            />

          }
          {!task.myday &&
              <Button
                id={modal.id}
                title="Add to My Day"
                icon="fas fa-sun"
                onClick={(id) => dispatch(addToMyDayTask(id))}
                onMouseOver={() => dispatch(hideListModal())}
              />}
          {task.myday &&
            <Button
              id={modal.id}
              title="Remove from My Day"
              icon="far fa-sun"
              onClick={(id)=> dispatch(removeFromMyDayTask(id))}
              active
              onMouseOver={() => dispatch(hideListModal())}
            />
          }
          {!task.done &&
            <Button
              id={modal.id}
              title="Mark as completed"
              done
              _doneClass
              onClick={(id) => dispatch(switchDoneTask(id))}
              onMouseOver={() => dispatch(hideListModal())}
            />
          }
          {task.done &&
            <Button
              id={modal.id}
              title="Mark not completed"
              done
              onClick={(id) => dispatch(switchDoneTask(id))}
              active
              onMouseOver={() => dispatch(hideListModal())}
            />
          }
          <div className="modal__cell">
            <Button
              id={modal.id}
              title="Due today"
              icon="far fa-calendar"
              onClick={(id) => dispatch(addDueToDay(id))}
              onMouseOver = {() => dispatch(hideListModal())}/>
            <Button
              id={modal.id}
              title="Due tomorrow"
              icon="far fa-calendar-minus"
              onClick={(id) => dispatch(addDueTomorrow(id))}
              onMouseOver = {() => dispatch(hideListModal())}/>
            {task.due &&
            <Button
              id={modal.id}
              title="Remove due day"
              icon="far fa-calendar-times"
              onClick={(id) => dispatch(deleteDue(id))}
              onMouseOver = {() => dispatch(hideListModal())}/>
            }
          </div>
          <div className="modal__cell">
            <Button
              id={modal.id}
              title="Move task to..."
              icon="fas fa-list"
              showArrow
              onClick={() => {}}
              onMouseOver = {onMouseOverHandler}/>
            <ModalList id={modal.id}/>
          </div>
          <Button
            id={modal.id}
            title="Delete task"
            icon="fas fa-trash"
            onClick={deleteHandler}
            onMouseOver={() => dispatch(hideListModal())}
            isDelete
          />
        </div>
      }
    </>
  )
}

const Button = ({
  id,
  title,
  icon,
  onClick,
  isDelete,
  active,
  done,
  _doneClass,
  showArrow,
  onMouseOver}) => {
  const deleteClass = isDelete ?
      ['modal__wrapper_delete', 'modal__button_delete'] : ['', '']
  const activeClass = active ? 'modal__button_active' : ''
  const doneClass = _doneClass ? 'modal__circle_done' : ''

  return (
    <div className={`modal__wrapper ${deleteClass[0]}`}>
      <button
        onMouseOver={onMouseOver}
        onClick={() => onClick(id)}
        className={`modal__button ${deleteClass[1]} ${activeClass}`}>
        {!done &&
          <div className="modal__icon">
            <i className={icon}/>
          </div>
        }
        {done &&
          <div className={`modal__circle ${doneClass} ${activeClass}`}/>
        }
        <div className="modal__title">
          {title}
        </div>
        {showArrow &&
          <div
            className="modal__chevron">
            <i className="fas fa-chevron-right"/>
          </div>
        }
      </button>
    </div>
  )
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  isDelete: PropTypes.bool,
  active: PropTypes.bool,
  done: PropTypes.bool,
  _doneClass: PropTypes.bool,
  showArrow: PropTypes.bool,
  onMouseOver: PropTypes.func.isRequired,
}


const ModalList = ({id}) => {
  const lists = useSelector((state) => state.lists)
      .filter((el) => el.type === 'custom')
  const dispatch = useDispatch()
  const modal = useSelector((state) => state.system).modalList

  const moveTask = (id, listId) => {
    return dispatch(moveTaskToList({
      id,
      listId,
    }))
  }

  return (
    <>{modal.show &&
        <div
          id='list'
          style={{...modal}}
          className="list-modal">
          <ListBtn
            icon="fa-home"
            title="Tasks"
            id={id}
            listId={'tasks'}
            onClick={moveTask}
          />
          {lists.map((el, i) => <ListBtn
            id={id}
            listId={el.id}
            key={i}
            title={el.title}
            icon="fa-tasks"
            onClick={moveTask}
          />)}
        </div>
    }
    </>
  )
}

ModalList.propTypes = {
  id: PropTypes.string.isRequired,
}

const ListBtn = ({id, listId, icon, title, onClick}) => {
  return (
    <button
      onClick={() => onClick(id, listId)}
      className="list-modal__button">
      <div className="list-modal__icon">
        <i className={`fas ${icon}`}/>
      </div>
      <div className="list-modal__title">
        {title}
      </div>
    </button>
  )
}

ListBtn.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default ModalWindow
