export const ADD_LIST = 'LISTS/ADD_LIST'
export const CHANGE_TITLE_LIST = 'LISTS/CHANGE_TITLE_LIST'

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

export const SELECT_TASK = 'SYSTEM/SELECT_TASK'
export const SHOW_CALENDAR = 'SYSTEM/SHOW_CALENDAR'
export const HIDE_CALENDAR = 'SYSTEM/HIDE_CALENDAR'


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
      due: values.due,
    },
  }
}
