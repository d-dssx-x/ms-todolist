import React from 'react'
import Tasks from '../../components/Tasks'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Page404 from '../404Page'

const CustomPage = () => {
  const location = useLocation()
  const listId = location.pathname.split('/')[2]
  const tasks = useSelector((state) => state.tasks)
      .filter((el) => el.listId === listId)
  const list = useSelector((state) => state.lists)
      .find((el) => el.id === listId)
  return (
    <>
      {list &&
        <>
          <Tasks
            title={list.title}
            tasks={tasks}
            listId={listId}/>
        </>
      }
      {!list &&
        <Page404 />
      }
    </>
  )
}

export default CustomPage
