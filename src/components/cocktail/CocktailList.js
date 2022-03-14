import React from 'react'
import Cocktail from './Cocktail'
import Loading from '../lib/Loading'
import { useGlobalContext } from '../context/context'

const CocktailList = () => {
  const {cocktails, loading} = useGlobalContext();

  //Loading handler
  if(loading){
    return <Loading/>
  }

  if(cocktails.length < 1){
    return(
      <h2 className="section-title">no cocktails matched your search criteria</h2>
    )    
  }
  return (
    <section className="section">
      <h2 className="section-title">Cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((item)=>{
          return <Cocktail key={item.id} {...item}/>
        })}
      </div>
    </section>
  )
}

export default CocktailList
