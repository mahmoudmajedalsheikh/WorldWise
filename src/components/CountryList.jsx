
import styles from './CountryList.module.css'
import CountryItem from '../components/CountryItem'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import {useCities} from '../contexts/CitiesContext'


const CountryList = () => {
  const {cities,isLoading} = useCities();
  if (isLoading) return <Spinner/>;
  // console.log(cities)
  // ------------------------------------
  if(!cities.length) return <Message  message="Add your First City By Click in City on Map"/>

  // -------------------------------------


const countries = cities.reduce((arr, city) => {
  if (!arr.map((el) => el.country).includes(city.country))
    return [...arr, { country: city.country, emoji: city.emoji }];
  else return arr;
}, []);



return (
  <ul className={styles.countryList}>
    {countries.map((country) => (
      <CountryItem country={country} key={country.country} />
    ))}
  </ul>
);
}

export default CountryList