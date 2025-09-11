import { useState, useEffect } from 'react'
import HomePage from './pages/home'
import {Routes, Route} from 'react-router'
import AboutPage from './pages/about'
import Header from './components/Header'
import NotFound from './pages/not-found'
import CoinDetailsPage from './pages/coin-details'


const API_URL = import.meta.env.VITE_API_URL

const App = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_desc')

  //create the function to retrieve the data and then call it on loading
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        )
        if (!res.ok) throw new Error('Failed to fetch data')
        const data = await res.json()
        setCoins(data)
      } catch (err) {
          setError(err.message)
      } finally {
          setLoading(false)
      }
    }

    fetchCoins()
  }, [limit]) // when limit updates the component rerenders

  // see chaining explanation below code.
  // includes() doesn’t change the string — it just checks if the substring is there, returning true or false. 
  // Combined with filter(), it controls which objects stay in the final array.



    //we take the filter/sorted array and display it
  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/' 
          element={
            <HomePage
              coins={coins}
              filter= {filter}f
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading = {loading}
              error={error}
            />
          } 
        />
        <Route path='/about' element={<AboutPage />}/>
        <Route path='/coin/:id' element={<CoinDetailsPage />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>    
    </>  
  )
}

export default App

/*
  *useEffect(
    () => {
      fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data')
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setCoins(data)
        setLoading(false)
      })
      .catch((err) => {
      setError(err.message)
      setLoading(false)  
      })
  }, [])
*/
  /*
    *CHAINING
    Chaining functions on an array in JavaScript involves calling multiple array methods sequentially, 
    where the output of one method serves as the input for the next. This is possible because 
    many built-in array methods in JavaScript, such as map(), filter(), sort(), and reduce(), return 
    a new array or a value that can then be further processed by another method.

    Create an instance of filterCoins and set value to coins which is an array.
    Recall filterCoins is an array (works on objects also) which you can filter and sort
    using .filter and .sort we are chaining those methods sequentially
    the result is a new array filter and sorted
    The includes() method in JavaScript determines whether an array includes a certain value among its entries,
    returning true or false as appropriate. It performs a strict equality comparison. 

  /*
  *DECLARATIVE PROGRAMMING
  In coding, "declarative mode" or declarative programming focuses on what the desired outcome is, 
  rather than how to achieve it, by defining the logic and desired state without specifying the step-by-step instructions.

  Instead of dictating the exact control flow,the programmer declares the end result, 
  allowing the system or framework to figure out the necessary steps.  
  */