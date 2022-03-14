import React,{useEffect, useRef}  from 'react'
import { useGlobalContext } from './context/context'

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext();
  const searchValue = useRef("");
  useEffect(()=>{
    searchValue.current.focus()
  },[])
  const searchCocktail = () =>{
    setSearchTerm(searchValue.current.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
  };
  return (
    <section className="seaction search">
      <form style={{marginTop: 100}} className="search-form" onSubmit={handleSubmit}>
        <div style={{backgroundColor: "#111"}} className="form-control">
          <label htmlFor="name">
              search your favorite cocktail
          </label>
          <input 
            type="text" 
            id="name" 
            ref={searchValue}
            onChange={searchCocktail}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
