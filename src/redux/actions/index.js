export const ADD_LIST = 'LISTS/ADD_LIST'
export const CHANGE_TITLE_LIST = 'LISTS/CHANGE_TITLE_LIST'

export const ADD_TASK = 'TASKS/ADD_TASK'
export const SWITCH_DONE_TASK = 'TASKS/SWITCH_DONE_TASK'
export const SWITCH_IMPRTNT_TASK = 'TASKS/SWITCH_IMPRTNT_TASK'


export const addNewList = (title) => {
  return {
    type: ADD_LIST,
    title,
  }
}


export const addTask = (values) => {
  return {
    type: ADD_TASK,
    values: {
      title: values.title,
      listId: values.listId,
      important: values.important,
    },
  }
}
export const switchDoneTask = (values) => {
  return {
    type: SWITCH_DONE_TASK,
    values: {
      id: values.id,
      done: values.done,
    },
  }
}

export const switchImprtntTask = (values) => {
  return {
    type: SWITCH_IMPRTNT_TASK,
    values: {
      id: values.id,
      important: values.important,
    },
  }
}

export const changeTitleList = (values) => {
  return {
    type: CHANGE_TITLE_LIST,
    values: {
      id: values.id,
      title: values.title,
    },
  }
}
