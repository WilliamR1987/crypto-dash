import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router'
import HomePage from './pages/home'
import AboutPage from './pages/about'
import Header from './components/Header'
import NotFound from './pages/not-found'
import CoinDetailsPage from './pages/coin-details'

const API_URL = import.meta.env.VITE_API_URL
console.log(API_URL)

// App component passes props, fetches data and manages the routes
const App = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_desc')

  //create the function to retrieve the data and then call it on loading
  //Note: One must define a function inside the useEffect function when using async await.  One cannot make the useEffect function asynchronous.
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        )        
        if (!res.ok) throw new Error('Failed to fetch data')
        const data = await res.json()
        console.log(data)
        setCoins(data)
      } catch (err) {
          setError(err.message)
      } finally {
          setLoading(false)
      }
    }

    fetchCoins()
  }, [limit]) // when limit updates the component rerenders

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

   /*
  see chaining explanation below code.
  includes() doesn’t change the string — it just checks if the substring is there, returning true or false. 
  Combined with filter(), it controls which objects stay in the final array.
  we take the filter/sorted array and display it
   */

  /*
In React applications, particularly when using a routing library like React Router, "Routes" play a fundamental role in managing navigation and rendering different components based on the URL.
The key roles of Routes in React are:
URL-Based Navigation:
Routes enable navigation within a single-page application (SPA) by associating specific URL paths with corresponding React components. This allows users to move between different "pages" or views without requiring full page reloads, providing a smoother and more responsive user experience.
Component Rendering:
Routes determine which components should be rendered based on the current URL. When the URL matches a defined route path, the associated component is rendered and displayed to the user. 
Dynamic Content Display:
Routes facilitate the display of different content or views based on user navigation. For instance, a route like /users/:id can display a specific user's profile based on the id parameter in the URL. 
Nested Routing:
Routing libraries like React Router support nested routes, allowing for the creation of complex navigation hierarchies and multi-level layouts within an application. This means a parent route can have child routes, and their respective components can be rendered within the parent's layout. 
Organizing Application Structure:
Routes provide a clear and organized way to structure the application's different views and their relationships. By defining routes, developers can easily understand how different parts of the application are connected and how users can navigate between them.
In essence, Routes act as the backbone of client-side navigation in React SPAs, mapping URLs to components and enabling dynamic and interactive user experiences.
  */