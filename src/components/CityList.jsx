
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Messagge from '../components/Message'
import {useCities} from '../contexts/CitiesContext'

const CityList = () => {
  const {cities,isLoading} = useCities();

  if (isLoading) return <Spinner/>;
  if(!cities.length) return <Messagge  message="Add your First City By Click in City on Map"/>
  // console.log(cities)
  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem city={city} key={city.id} />)}
    </ul>
  )
}

export default CityList