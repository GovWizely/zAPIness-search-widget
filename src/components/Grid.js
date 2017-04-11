import React from 'react'
import List from './List'

import styles from '../stylesheets/styles'

const Grid = (activePage, clickHandler) => num => (
  <List
    key={num}
    className={num === activePage ? 'active' : ''}
    styles={num === activePage ? styles.list.active : styles.list.normal}
    clickHandler={(e) => {
      e.preventDefault()
      clickHandler(num)
    }}
  >
    { num }
  </List>
)

export default Grid
