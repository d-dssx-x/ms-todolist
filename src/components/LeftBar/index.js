import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import {Link, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {addNewList} from '../../redux/actions'
import moment from 'moment'


const LeftBar = () => {
  const [className, setClassName] = useState('')
  const [open, setOpen] = useState(false)

  const location = useLocation()

  const onOpenPressHandler = () => {
    if (open) {
      setClassName('left-bar_close')
      return setOpen(false)
    } else {
      setClassName('left-bar_open')
      return setOpen(true)
    }
  }

  const onOpenAddButton = () => {
    setClassName('left-bar_open')
    return setOpen(true)
  }

  const [active, setActive] = useState({
    todos: false,
    important: false,
    myDay: false,
  })

  useEffect(() => {
    const arr = location.pathname.split('/')
    setActive({[arr[arr.length - 1]]: true})
  }, [location])

  const customList = useSelector((state) => state.lists)
      .filter((el) => el.type !== 'main')

  const tasks = useSelector((state) => state.tasks)
  const tasksSize = tasks.length
  const importantSize = tasks
      .filter((el) => el.important).length

  const currentDay = moment().format('L')
  const myDaySize = tasks
      .filter((el) => el.due === currentDay).length
  return (
    <div className={`left-bar ${className}`}>
      <div className="left-bar__header">
        <button
          onClick={onOpenPressHandler}
          className="left-bar__btn">
          <i className="fas fa-bars"/>
        </button>
      </div>
      <div className="left-bar__list">
        <Link to="/MyDay">
          <Button
            active={active.myDay}
            title={'MyDay'}
            icon={'fa-sun'}
            size={myDaySize}
          />
        </Link>
        <Link
          className="link"
          to="/todos"
        >
          <Button
            active={active.todos}
            title={'Tasks'}
            icon={'fa-home'}
            size={tasksSize}
          />
        </Link>
        <Link
          className="link"
          to="/important"
        >
          <Button
            active={active.important}
            title={'Important'}
            icon={'fa-star'}
            size={importantSize}/>
        </Link>
        <div className="custom">
          {
            customList.map((el) => <ButtonCustom
              {...el}
              key={el.id}
              active={active[el.id]}
            />)
          }
          <AddButton show={onOpenAddButton} />
        </div>
      </div>
    </div>
  )
}


const Button = ({title, icon, active, size}) => {
  const classes = active ? 'left-bar__category_active' : ''
  return (
    <div className={`left-bar__category ${classes}`}>
      <div className="left-bar__btn-cat">
        <i className={`fas ${icon}`}/>
      </div>
      <span className="left-bar__title">{title}</span>
      <span className="left-bar__size">{size !== 0 && size}</span>
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  size: PropTypes.number,
}

const ButtonCustom = ({active, title, id}) => {
  const size = useSelector((state) => state.tasks)
      .filter((el) => el.listId === id).length
  return (
    <Link
      className="link custom"
      to={`/list/${id}`}>
      <Button
        active={active}
        title={title}
        icon={'fa-tasks'}
        size={size}
      />
    </Link>
  )
}

ButtonCustom.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.string.isRequired,
}

const AddButton = ({active, show}) => {
  const classes = active ? 'left-bar__category_active' : ''
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const onClickHandler = () => {
    return show()
  }

  const onChangeHandler = (event) => {
    return setValue(event.target.value)
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (value.trim()) {
        dispatch(addNewList(value))
        return setValue('')
      }
    }
  }

  return (
    <div
      onClick={onClickHandler}
      className={`left-bar__category ${classes}`}>
      <div className="left-bar__wrapper">
        <div className="left-bar__btn-cat">
          <i className={`fas fa-plus`}/>
        </div>
        <input
          value={value}
          placeholder="Add a list"
          className="left-bar__input"
          onChange={onChangeHandler}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  )
}

AddButton.propTypes = {
  active: PropTypes.bool,
  show: PropTypes.func,
}

export default LeftBar
