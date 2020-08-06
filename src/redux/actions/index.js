import moment from 'moment'
export const ADD_LIST = 'LISTS/ADD_LIST'
export const CHANGE_TITLE_LIST = 'LISTS/CHANGE_TITLE_LIST'
export const DELETE_LIST = 'LISTS/DELETE_LIST'

export const ADD_TASK = 'TASKS/ADD_TASK'
export const SWITCH_DONE_TASK = 'TASKS/SWITCH_DONE_TASK'
export const SWITCH_IMPRTNT_TASK = 'TASKS/SWITCH_IMPRTNT_TASK'
export const CHANGE_TITLE_TASK = 'TASKS/CHANGE_TITLE_TASK'
export const SWITCH_TASKS_IN_LIST = 'TASKS/SWITCH_TASKS_IN_LIST'
export const ADD_REMIND = 'TASKS/ADD_REMIND'
export const DELETE_REMIND = 'TASKS/DELETE_REMIND'
export const ADD_DUE = 'TASKS/ADD_DUE'
export const DELETE_DUE = 'TASKS/DELETE_DUE'
export const ADD_NOTE = 'TASKS/ADD_NOTE'
export const ADD_TASK_MYDAY = 'TASKS/ADD_TASK_MYDAY'
export const DELETE_TASK = 'TASKS/DELETE_TASK'
export const ADD_TO_MY_DAY_TASK = 'TASKS/ADD_TO_MY_DAY_TASK'
export const REMOVE_FROM_MY_DAY_TASK = 'TASKS/REMOVE_FROM_MY_DAY_TASK'
export const MOVE_TASK_TO_LIST = 'TASKS/MOVE_TASK_TO_LIST'
export const DELETE_TASKS_BY_LISTID = 'TASKS/DELETE_TASKS_BY_LISTID'
export const ADD_DUE_TODAY = 'TASKS/ADD_DUE_TODAY'
export const ADD_DUE_TOMORROW = 'TASKS/ADD_DUE_TOMORROW'

export const SELECT_TASK = 'SYSTEM/SELECT_TASK'
export const SHOW_CALENDAR = 'SYSTEM/SHOW_CALENDAR'
export const HIDE_CALENDAR = 'SYSTEM/HIDE_CALENDAR'
export const SHOW_MODAL = 'SYSTEM/SHOW_MODAL'
export const HIDE_MODAL = 'SYSTEM/HIDE_MODAL'
export const SHOW_LIST_MODAL = 'SYSTEM/SHOW_LIST_MODAL'
export const HIDE_LIST_MODAL = 'SYSTEM/HIDE_LIST_MODAL'
export const SHOW_DELETE_ALERT = 'SYSTEM/SHOW_DELETE_ALERT'
export const HIDE_DELETE_ALERT = 'SYSTEM/HIDE_DELETE_ALERT'


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
      created: moment().format('LLLL'),
    },
  }
}
export const switchDoneTask = (id) => {
  return {
    type: SWITCH_DONE_TASK,
    id,
  }
}

export const switchImprtntTask = (id) => {
  return {
    type: SWITCH_IMPRTNT_TASK,
    id,
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

export const selectTask = (id) => {
  return {
    type: SELECT_TASK,
    id,
  }
}

export const changeTitleTask = (values) => {
  return {
    type: CHANGE_TITLE_TASK,
    values: {
      id: values.id,
      title: values.title,
    },
  }
}

export const switchTasksInList = (values) => {
  return {
    type: SWITCH_TASKS_IN_LIST,
    values: {
      dragI: values.dragI,
      hoverI: values.hoverI,
      listId: values.listId,
    },
  }
}

export const addRemind = (values) => {
  return {
    type: ADD_REMIND,
    values: {
      id: values.id,
      remind: values.remind,
    },
  }
}

export const showCalendarWin = (calendarType) => {
  return {
    type: SHOW_CALENDAR,
    calendarType: calendarType,
  }
}

export const hideCalendar = () => {
  return {
    type: HIDE_CALENDAR,
  }
}

export const addDue = (values) => {
  return {
    type: ADD_DUE,
    values: {
      id: values.id,
      due: values.due,
    },
  }
}

export const deleteRemind = (id) => {
  return {
    type: DELETE_REMIND,
    id,
  }
}
export const deleteDue = (id) => {
  return {
    type: DELETE_DUE,
    id,
  }
}

export const addNote = (values) => {
  return {
    type: ADD_NOTE,
    values: {
      id: values.id,
      note: values.note,
    },
  }
}

export const addTaskMyDay = (values) => {
  return {
    type: ADD_TASK_MYDAY,
    values: {
      title: values.title,
      listId: values.listId,
      important: values.important,
      created: moment().format('LLLL'),
    },
  }
}

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    id,
  }
}

export const showModal = (values) => {
  return {
    type: SHOW_MODAL,
    values: {
      x: values.x,
      y: values.y,
      id: values.id,
    },
  }
}

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  }
}

export const addToMyDayTask = (id) => {
  return {
    type: ADD_TO_MY_DAY_TASK,
    id,
  }
}

export const removeFromMyDayTask = (id) => {
  return {
    type: REMOVE_FROM_MY_DAY_TASK,
    id,
  }
}

export const moveTaskToList = (values) => {
  return {
    type: MOVE_TASK_TO_LIST,
    values: {
      id: values.id,
      listId: values.listId,
    },
  }
}


export const showListModal = (values) => {
  return {
    type: SHOW_LIST_MODAL,
    values: {
      top: values.top || null,
      left: values.left || null,
      bottom: values.bottom || null,
      right: values.right || null,
    },
  }
}

export const hideListModal = () => {
  return {
    type: HIDE_LIST_MODAL,
  }
}

export const showDeleteAlert = (values) => {
  return {
    type: SHOW_DELETE_ALERT,
    values: {
      type: values.type,
      id: values.id,
    },
  }
}

export const hideDeleteAlert = () => {
  return {
    type: HIDE_DELETE_ALERT,
  }
}

export const deleteList = (id) => {
  return {
    type: DELETE_LIST,
    id,
  }
}

export const deleteTasksByListId = (listId) => {
  return {
    type: DELETE_TASKS_BY_LISTID,
    listId,
  }
}

export const addDueToDay = (id) => {
  return {
    type: ADD_DUE_TODAY,
    values: {
      id,
      due: moment().format('L'),
    },
  }
}

export const addDueTomorrow = (id) => {
  return {
    type: ADD_DUE_TOMORROW,
    values: {
      id,
      due: moment().add(1, 'day').format('L'),
    },
  }
}
