import { BrowserRouter, Routes, Route} from "react-router-dom"
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import { useState } from "react"
import { useEffect } from "react"
import CountryList from "./components/CountryList"
import City from './components/City'
// import  from ''
const BASE_URL = 'http://localhost:8000'


function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(function(){
    async function fetchCities() {
        setIsLoading(true);
      try{
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }catch{
        alert("error fetching data")
      }finally{
        setIsLoading(false);
      }
  }
    fetchCities();
  }, []);

return(<>
  <BrowserRouter>
  <Routes>

    <Route path="/" element={<Homepage/>}></Route>
    {/*or <Route index element={<Homepage/>}></Route> */}
    <Route path="pricing" element={<Pricing/>}/>
    <Route path="product" element={<Product/>}/>
    <Route path="*" element={<PageNotFound/>}/>

    <Route path="/app" element={<AppLayout/> }>
      {/* Nested Routes */}
      {/* index Route default  child Route*/}
      <Route index element={<CityList cities={cities} isLoading={isLoading}/>} />
      {/*  */}
      <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
      {/* How to path data and store it in link / Params / and share it in all Application */}
      <Route path="cities/:id" element={<City />} />

      <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
      <Route path="form" element={<p>Form</p>} />
    </Route>

    <Route path="login" element={<Login/> }/>
  </Routes>
  </BrowserRouter>

</>)
}

export default App
