import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import TaskPage from './pages/TasksPage'
import AuthPage from './pages/AuthPage'
import ImportantPage from './pages/ImportantPage'
import CustomPage from './pages/CustomPage'
import MyDayPage from './pages/MayDayPage'
import PlannedPage from './pages/PlannedPage'
import SearchPage from './pages/SearchPage'
import Wrapper from './Wrapper'

export const useRouter = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/tasks">
          <Wrapper>
            <TaskPage />
          </Wrapper>
        </Route>
        <Route path="/important">
          <Wrapper>
            <ImportantPage />
          </Wrapper>
        </Route>
        <Route path="/list/:name?">
          <Wrapper>
            <CustomPage />
          </Wrapper>
        </Route>
        <Route path="/myday">
          <Wrapper>
            <MyDayPage />
          </Wrapper>
        </Route>
        <Route path="/planned">
          <Wrapper>
            <PlannedPage />
          </Wrapper>
        </Route>
        <Route path="/search/:name?">
          <Wrapper>
            <SearchPage />
          </Wrapper>
        </Route>
        <Redirect to="/tasks"/>
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
