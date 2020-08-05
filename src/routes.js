import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import TaskPage from './pages/TasksPage'
import AuthPage from './pages/AuthPage'
import ImportantPage from './pages/ImportantPage'
import CustomPage from './pages/CustomPage'
import MyDay from './pages/MayDay'


export const useRouter = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/todos">
          <TaskPage />
        </Route>
        <Route path="/important">
          <ImportantPage />
        </Route>
        <Route path="/list/:name?">
          <CustomPage />
        </Route>
        <Route path="/MyDay">
          <MyDay />
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
