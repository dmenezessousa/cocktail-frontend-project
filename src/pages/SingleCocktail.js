import React, {useState, useEffect} from 'react'
import Loading from '../components/lib/Loading'
import { useParams, Link } from 'react-router-dom'
import axiosBackend from "../components/lib/AxiosBackend"
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
      setLoading(true);
      async function getCocktail(){
        try{
          const response = await fetch(`${url}${id}`);
          const data = await response.json()
          if(data.drinks){
            const {
              strDrink:name,
              strDrinkThumb:image, 
              strAlcoholic:info, 
              strCategory:category,
              strGlass:glass,
              strInstructions: instructions,
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
            } = data.drinks[0]

            const ingredients = [
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5,
            ]
            const newCocktail = {
              name, image, info,category,glass, instructions, ingredients
            }
            setCocktail(newCocktail);
          }else{
            setCocktail(null)
          }
          setLoading(false)
        }catch(e){
          console.log(e);
          setLoading(false)
        }
      }
      getCocktail()
    }, [id])

    if(loading){
      return <Loading/>
    }

    if(!cocktail){
      return <h2 className="section-title"> no cocktail to display</h2>
    }

    const {
      name,
      image,
      category, 
      info, 
      glass, 
      instructions,
      ingredients} = cocktail;

      async function handleAddToMyFavorites(cocktailDetails){
        try{
          await axiosBackend.post("/api/users/cocktail/add-cocktail",{
            title: cocktailDetails.name,
            cocktailPoster: cocktailDetails.image,
            cocktailID: id,
            cocktailOwner: "",
          });
          toast.success("Added To Favorites", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            position: "top-center",
          });
        }catch(e){
          console.log(e);
        }
      }
  return (
    <section className= "section cocktail-section">
      <Link  to="/" className="btn btn-primary">back home</Link>
      <h2 style={{marginTop: 40}} className="section-title">{name}</h2>
      <div style={{marginTop: 100}} className="drink">
        <img src={image} alt={name}/>
        <div className="drink-info">
          <p><span className="drink-data"> name:</span>{name}</p>
          <p><span className="drink-data"> category:</span>{category}</p>
          <p><span className="drink-data"> info:</span>{info}</p>
          <p><span className="drink-data"> glass:</span>{glass}</p>
          <p><span className="drink-data"> instructions:</span>{instructions}</p>
          <p><span className="drink-data"> ingredients:
          </span>{ingredients.map((item,index)=>{
              return item ? <span key={index}>{item}</span> : null
          })}</p>
        </div>
      </div>
      <button 
      style={{ marginLeft: 100}} 
      className="btn btn-primary"
      onClick={()=>handleAddToMyFavorites(cocktail)}
      >
      ADD TO FAVORITES
      </button>
    </section>
  )
}

export default SingleCocktail
