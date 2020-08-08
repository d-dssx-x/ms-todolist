import React, {useState, useEffect} from 'react'
import './index.scss'
import {useHistory, useLocation} from 'react-router-dom'


const Header = () => {
  const history = useHistory()
  const {pathname} = useLocation()
  const [prevPath, setPrevPath] = useState('')
  const [searchTitle, setSearchTitle] = useState('')

  const onChangeHandler = (event) => {
    return setSearchTitle(event.target.value)
  }

  useEffect(() => {
    if (!prevPath) return history.push('/tasks')
    if (searchTitle) {
      history.push(`/search/${searchTitle}`)
    } else {
      history.push(`/${prevPath}`)
    }
  }, [searchTitle])

  useEffect(() => {
    if (pathname.split('/')[1] !== 'search') {
      setPrevPath(pathname.split('/')[1])
    }
  }, [pathname])

  return (
    <header className="header">
      <h2 className="header__logo">To Do List</h2>
      <div className="header__input-wrapper">
        <div className="header__button header__button_left">
          <i className="fas fa-search"></i>
        </div>
        <input
          onChange={onChangeHandler}
          placeholder="Search"
          value={searchTitle}
          className="header__input"/>
        <div
          onClick={()=> setSearchTitle('')}
          className="header__button header__button_right ">
          <i className="fas fa-times"/>
        </div>
      </div>
      <div className="header__setting"></div>
    </header>
  )
}

export default Header
