import React from 'react'
import CocktailList from '../components/cocktail/CocktailList'
import SearchForm from '../components/SearchForm'

const Home = () => {
  return (
   
    <main>
      window.location.reload(false)
      <SearchForm/>
      <CocktailList/>
    </main>
  )
}

export default Home
