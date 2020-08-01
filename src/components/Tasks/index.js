import React from 'react'
import './index.scss'
import PropTypes from 'prop-types'
import Complited from '../Complited'
import Field from '../Field'
import Item from '../Item'

const Tasks = ({title, tasks, showList, listId, important}) => {
  const noDoneTasks = tasks.filter((el) => !el.done)
  const doneTasks = tasks.filter((el) => el.done)
  return (
    <div className="tasks">
      <h2 className="tasks__title">{title}</h2>
      <Field
        listId={listId}
        important={important}/>
      <div className="block">
        {noDoneTasks.map((el, i) => <Item
          showList={showList}
          key={i}
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
}

export default Tasks
