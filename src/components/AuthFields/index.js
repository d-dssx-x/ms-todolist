import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const AuthFields = ({onChange, values}) => {
  return (
    <div className="auth__fields">
      <Field
        value={values.email}
        onChange={onChange}
        placeholder="Email"
        name="email"
        type="text"
      />
      <Field
        value={values.password}
        onChange={onChange}
        placeholder="Password"
        name="password"
        type="password"
        isPass
      />
    </div>
  )
}

export default AuthFields


AuthFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
}

const Field = ({value, onChange, placeholder, name, type = 'text', isPass}) => {
  const inputRef = useRef(null)

  const classNames = isPass ? 'auth__field auth__show_pass' : 'auth__field'
  const [visPass, setVisPass] = useState(false)

  const showPassword = () => {
    if (!visPass) {
      inputRef.current.type = 'text'
      setVisPass(true)
    } else {
      inputRef.current.type = 'password'
      setVisPass(false)
    }
    inputRef.current.focus()
  }

  return (
    <div className="auth__field-wrapper">
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        type={type}
        className={classNames}
      />
      {isPass &&
      <div
        role="button"
        onClick={showPassword}
        className="auth__show">
        {!visPass &&
          <i className="fas fa-eye"/>
        }
        {visPass &&
          <i className="fas fa-eye-slash"/>
        }
      </div>}
    </div>
  )
}

Field.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  isPass: PropTypes.bool,
}


