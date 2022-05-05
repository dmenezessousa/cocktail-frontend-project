import React from 'react'
import CocktailList from '../components/cocktail/CocktailList'
import SearchForm from '../components/SearchForm'

const Home = () => {
  window.location.reload(false)
  return (
    <main>
      <SearchForm/>
      <CocktailList/>
    </main>
  )
}

export default Home
