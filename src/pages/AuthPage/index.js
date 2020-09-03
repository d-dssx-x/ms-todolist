import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AuthFields from '../../components/AuthFields'
import AuthButtons from '../../components/AuthButtons'
import {clearAlert, login, registration} from '../../redux/actions'

import './index.scss'

const AuthPage = () => {
  const dispatch = useDispatch()
  const {alertMsg} = useSelector((state) => state.system)
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const fieldsHandler = (event) => {
    return setValues({
      ...values,
      [event.target.name]: event.target.value.trim(),
    })
  }

  const onClickHandler = (event) => {
    switch (event.target.name) {
      case 'reg':
        return dispatch(registration(values))
      case 'log':
        return dispatch(login(values))
      default:
        return
    }
  }

  useEffect(() => {
    if (alertMsg) {
      alert(alertMsg.message)
      dispatch(clearAlert())
    }
  }, [alertMsg])

  return (
    <div className="auth">
      <h1>To Do List</h1>
      <AuthFields
        values={values}
        onChange={fieldsHandler}
      />
      <AuthButtons
        onClick={onClickHandler}
      />
    </div>
  )
}


export default AuthPage
