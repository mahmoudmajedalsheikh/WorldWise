import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'
import Logo from './Logo'
import styles from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav/>
      {/* <Outlet/> similar to compustion {children property} */}
      <Outlet/>

      {/* <p>List of cities</p> */}
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} By WorldWise Inc.
        </p>
      </footer>
    </div>
  )
}

export default Sidebar