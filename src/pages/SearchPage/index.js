import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Item from '../../components/Item'
import {showModal, selectTask} from '../../redux/actions'
import Page404 from '../404Page'

const SearchPage = () => {
  const {pathname} = useLocation()
  const title = pathname.split('/')[2]

  const tasks = useSelector((state) => state.tasks)

  const searchedTasks = tasks
      .filter((el) => el.title.slice(0, title.length) === title)
      .sort((a, b) => a.done - b.done)
  const dispatch = useDispatch()
  useEffect(() => {
    const onContext = (event) => {
      event.preventDefault()
      const clientHeight = document.documentElement.clientHeight
      if (event.target.id.split('-')[0] === 'item') {
        if (event.pageY + 160 < clientHeight) {
          dispatch(showModal({
            x: event.pageX,
            y: event.pageY,
            id: event.target.id.split('-')[1],
          }))
        } else {
          dispatch(showModal({
            x: event.pageX,
            y: event.pageY - 160,
            id: event.target.id.split('-')[1],
          }))
        }
        dispatch(selectTask(null))
        return false
      }
    }
    const target = document.querySelector('#tasks')
    target.addEventListener('contextmenu', onContext)
    return () => target.removeEventListener('contextmenu', onContext)
  }, [])

  return (
    <div className="tasks">
      <div className="tasks__header">
        <h2 className="tasks__title">
            Searching for {`"${title}"`}
        </h2>
      </div>
      <div
        id="tasks"
        className="block">
        {searchedTasks.map((el, i) =>
          <Item
            disableDrag
            item={el}
            key={i}
            {...el}
            index={i}
          />)}
      </div>
      {!searchedTasks.length &&
        <Page404 type='tasks'/>
      }
    </div>
  )
}

export default SearchPage
