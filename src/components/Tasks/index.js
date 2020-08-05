import React, {useRef} from 'react'
import './index.scss'
import PropTypes from 'prop-types'
import Complited from '../Complited'
import Field from '../Field'
import Item from '../Item'
import {useDispatch} from 'react-redux'
import {changeTitleList, selectTask} from '../../redux/actions'
import moment from 'moment'

const Tasks = ({
  title,
  tasks,
  showList,
  listId,
  important,
  disabledInput,
  isMyDay}) => {
  const noDoneTasks = tasks.filter((el) => !el.done)
  const doneTasks = tasks.filter((el) => el.done)

  const dispatch = useDispatch()

  const ref = useRef(null)

  const refBlock = useRef(null)

  const inputHandler = (event) => {
    return dispatch(changeTitleList({
      id: listId,
      title: event.target.value,
    }))
  }

  const blurInputHandler = (event) => {
    if (event.key === 'Enter') {
      return ref.current.blur()
    }
  }

  const closeRightBarHadnler = (event) => {
    if (event.target === refBlock.current) {
      dispatch(selectTask(null))
    }
  }

  const currentTime = moment().format('LLLL').split(',')[0] + ', ' +
      moment().format('LLLL').split(',')[1]

  return (
    <div
      ref={refBlock}
      onClick={closeRightBarHadnler}
      className="tasks">
      <input
        ref={ref}
        disabled={disabledInput}
        className="tasks__title"
        value={title}
        onChange={inputHandler}
        onKeyPress={blurInputHandler}/>
      {isMyDay &&
        <div className="tasks__myday">
          {currentTime}
        </div>
      }
      <Field
        isMyDay={isMyDay}
        listId={listId}
        important={important}/>
      <div className="block">
        {noDoneTasks.map((el, i) => <Item
          listTitle={title}
          showList={showList}
          key={el.id}
          index={i}
          item={el}
          {...el}/>)
        }
        {!!doneTasks.length &&
          <Complited
            tasks={doneTasks}
            showList={showList}
          />
        }
      </div>
    </div>
  )
}

Tasks.propTypes = {
  title: PropTypes.string,
  tasks: PropTypes.array,
  showList: PropTypes.bool,
  listId: PropTypes.string.isRequired,
  important: PropTypes.bool,
  disabledInput: PropTypes.bool,
  isMyDay: PropTypes.bool,
}

export default Tasks
