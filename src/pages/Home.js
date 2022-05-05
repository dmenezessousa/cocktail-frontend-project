import React from 'react'
import CocktailList from '../components/cocktail/CocktailList'
import SearchForm from '../components/SearchForm'

const Home = () => {
  return (
   window.location.reload(false)
    <main>
      <SearchForm/>
      <CocktailList/>
    </main>
  )
}

export default Home
