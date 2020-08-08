const init = {
  lists: [
    {
      title: 'Tasks',
      id: 'tasks',
      type: 'main',
    },
    {
      title: 'Important',
      id: 'important',
      type: 'main',
    },
    {
      title: 'Add',
      id: 'add',
      type: 'custom',
    },
    {
      title: 'My Day',
      id: 'myday',
      type: 'main',
    },
  ],
  system: {
    selectedTasks: null,
    calendarType: null,
    modal: {
      show: false,
      x: null,
      y: null,
    },
    modalList: {
      show: false,
      top: null,
      left: null,
      bottom: null,
      right: null,
    },
    deleteAlert: {
      show: false,
      type: null,
      id: null,
    },
  },
  tasks: [
    {
      title: 'some 1',
      id: '1',
      done: false,
      important: true,
      listId: 'tasks',
      created: '06/08/2020',
      myday: true,
    },
  ],
}


export const saveStore = (store) => {
  try {
    const jsonStore = JSON.stringify(store)
    return localStorage.setItem('react-todo-ms-app', jsonStore)
  } catch (err) {
    console.log(err)
  }
}

export const loadStore = () => {
  try {
    const store = localStorage.getItem('react-todo-ms-app')

    if (store === null) {
      return init
    }

    return JSON.parse(store)
  } catch (err) {
    console.log(err)
  }
}
