import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const AuthButtons = ({onClick}) => {
  return (
    <div className="auth__buttons">
      <Button
        name="log"
        desc="Login"
        onClick={onClick}/>
      <Button
        name="reg"
        desc="Registration"
        onClick={onClick}/>
    </div>
  )
}

AuthButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default AuthButtons

const Button = ({name, desc, onClick}) => {
  const classes = name === 'log' ?
    'auth__button_second-color' :
    'auth__button_main-color'
  const [clickClass, setClickClass] = useState('')

  const onClickHandler = (event) => {
    onClick(event)
    return setClickClass('auth__button_click-anim')
  }

  const endAnimationHandler = () => {
    return setClickClass('')
  }

  return (
    <button
      name={name}
      onClick={onClickHandler}
      onAnimationEnd={endAnimationHandler}
      className={`auth__button ${classes} ${clickClass}`}>{desc}</button>
  )
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

