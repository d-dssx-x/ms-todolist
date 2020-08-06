import React, {useState, useEffect} from 'react'
import './index.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  deleteTask,
  addToMyDayTask,
  removeFromMyDayTask,
  hideModal,
  switchDoneTask,
  switchImprtntTask} from '../../redux/actions'
import PropTypes from 'prop-types'

const ModalWindow = () => {
  const modal = useSelector((state) => state.system).modal
  const task = useSelector((state) => state.tasks)
      .find((el) => el.id === modal.id)
  const dispatch = useDispatch()
  const [cord, setCord] = useState({
    x: null,
    y: null,
  })


  useEffect(() => {
    if (modal.show) {
      setCord({
        x: modal.x,
        y: modal.y,
      })
    }
  }, [modal])


  const deleteHandler = (id) => {
    dispatch(hideModal())
    return dispatch(deleteTask(id))
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
              icon="fa-star'"
              onClick={(id) => dispatch(switchImprtntTask(id))}
            />

          }
          {task.important &&
            <Button
              id={modal.id}
              title="Remove importance"
              icon="fa-star"
              onClick={(id) => dispatch(switchImprtntTask(id))}
              active
            />

          }
          {!task.myday &&
              <Button
                id={modal.id}
                title="Add to My Day"
                icon="fa-sun"
                onClick={(id) => dispatch(addToMyDayTask(id))}
              />}
          {task.myday &&
            <Button
              id={modal.id}
              title="Remove from My Day"
              icon="fa-sun"
              onClick={(id)=> dispatch(removeFromMyDayTask(id))}
              active
            />
          }
          {!task.done &&
            <Button
              id={modal.id}
              title="Mark as complited"
              done
              _doneClass
              onClick={(id) => dispatch(switchDoneTask(id))}
            />
          }
          {task.done &&
            <Button
              id={modal.id}
              title="Mark not complited"
              done
              onClick={(id) => dispatch(switchDoneTask(id))}
              active
            />
          }
          <div className="modal__cell">
            <Button
              id={modal.id}
              title="Move task to..."
              icon="fa-list"
              showArrow
              onClick={()=>{console.log('dsadasd')}}/>
          </div>
          <Button
            id={modal.id}
            title="Delete task"
            icon="fa-trash"
            onClick={deleteHandler}
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
  showArrow}) => {
  const deleteClass = isDelete ? 'modal__button_delete' : ''
  const activeClass = active ? 'modal__button_active' : ''
  const doneClass = _doneClass ? 'modal__circle_done' : ''
  return (
    <div className="modal__wrapper">
      <button
        onClick={() => onClick(id)}
        className={`modal__button ${deleteClass} ${activeClass}`}>
        {!done &&
          <div className="modal__icon">
            <i className={`fas ${icon}`}/>
          </div>
        }
        {done &&
          <div className={`modal__circle ${doneClass} ${activeClass}`}></div>
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
  onClick: PropTypes.func.isRequired,
  isDelete: PropTypes.bool,
  active: PropTypes.bool,
  done: PropTypes.bool,
  _doneClass: PropTypes.bool,
}

export default ModalWindow
