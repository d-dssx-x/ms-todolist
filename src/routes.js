import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import TaskPage from './pages/TasksPage'
import AuthPage from './pages/AuthPage'
import ImportantPage from './pages/ImportantPage'
import CustomPage from './pages/CustomPage'
import MyDayPage from './pages/MayDayPage'
import PlannedPage from './pages/PlannedPage'
import SearchPage from './pages/SearchPage'


export const useRouter = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/tasks">
          <TaskPage />
        </Route>
        <Route path="/important">
          <ImportantPage />
        </Route>
        <Route path="/list/:name?">
          <CustomPage />
        </Route>
        <Route path="/myday">
          <MyDayPage />
        </Route>
        <Route path="/planned">
          <PlannedPage />
        </Route>
        <Route path="/search/:name?">
          <SearchPage />
        </Route>
        <Redirect to="/todos"/>
      </Switch>
    )
  }
  return (
    <Switch>
      <Route
        path="/"
        exact>
        <AuthPage />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}
