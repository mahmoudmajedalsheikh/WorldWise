// import AppNav from "../components/AppNav";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from './AppLayout.module.css'
import ProtectedRoute from '../pages/ProtectedRoute'

export default function AppLayout() {
  return (
  <div className={styles.app}>
    <ProtectedRoute>
      <Sidebar/>
      <Map/>
      <User/>
    </ProtectedRoute>
  </div>
  )
}
