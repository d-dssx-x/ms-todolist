import React, {useState} from 'react'
import AuthFields from '../../components/AuthFields'

import './index.scss'
import AuthButtons from '../../components/AuthButtons'

const AuthPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const fieldsHandler = (event) => {
    return setValues({...values, [event.target.name]: event.target.value})
  }

  return (
    <div className="auth">
      <h1>ToDo List</h1>
      <AuthFields
        values={values}
        onChange={fieldsHandler}
      />
      <AuthButtons
        onClick={(event) => console.log(event)}
      />
    </div>
  )
}


export default AuthPage
