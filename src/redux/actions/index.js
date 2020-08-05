export const ADD_LIST = 'LISTS/ADD_LIST'
export const CHANGE_TITLE_LIST = 'LISTS/CHANGE_TITLE_LIST'

export const ADD_TASK = 'TASKS/ADD_TASK'
export const SWITCH_DONE_TASK = 'TASKS/SWITCH_DONE_TASK'
export const SWITCH_IMPRTNT_TASK = 'TASKS/SWITCH_IMPRTNT_TASK'
export const CHANGE_TITLE_TASK = 'TASKS/CHANGE_TITLE_TASK'
export const SWITCH_TASKS_IN_LIST = 'TASKS/SWITCH_TASKS_IN_LIST'
export const ADD_REMIND = 'TASKS/ADD_REMIND'

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

