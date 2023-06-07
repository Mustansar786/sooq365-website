import React, { useEffect } from 'react'
import styles from './style.module.css'


const Tabs = ({ panes,defaultTab,setActiveIndex}) => {
  useEffect(() => {
      setActiveIndex(defaultTab)
  }, [defaultTab])
  

  return (
    <>
      <div className={styles.Tab}>
        <ul className={styles.itemContainer}>
          {panes.map((item,index) => (
            <li
              key={index}
              onClick={() => setActiveIndex(item)}
              className={
                defaultTab?.menuItem === item.menuItem
                  ? `${styles.active} ${styles.item}`
                  : styles.item
              }
            >
              {item?.menuItem}
            </li>
          ))}
        </ul>
      </div>
      <div>{defaultTab?.render()}</div>
    </>
  )
}
export default Tabs
