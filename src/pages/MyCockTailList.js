import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Mylist.css";

import AxiosBackend from "../components/lib/AxiosBackend";
import Loading from "../components/lib/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyCockTailList() {
  const [cocktailArray, setCocktailArray] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCocktails();
  }, []);

  async function getAllCocktails() {
    try {
      let payload = await AxiosBackend.get("/users/cocktail/get-all-cocktail");
      setCocktailArray(payload.data.payload);
      setLoading(false);
    } catch (e) {
      console.log(e.response);
    }
  }

  async function handleDelete(cocktailID) {
    try {
      let payload = await AxiosBackend.delete(
        `/users/cocktail/delete-cocktail/${cocktailID}`
      );

      let newFavoriteCocktail = [...cocktailArray];
      let filteredCocktailArray = newFavoriteCocktail.filter(
        (item) => item._id !== payload.data.payload._id
      );

      setCocktailArray(filteredCocktailArray);
      toast.success("Removed From List", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        position: "top-center",
      });
    } catch (e) {
      console.log(e.response);
    }
  }
  return (
    <section className="section">
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="main_div">
            <div  style={{ display: "flex", marginTop: 100, marginLeft: -30 }}>
              <h1 style={{ color: "white" }}>My</h1>
              <h1 style={{ color: "blue", marginLeft: 5 }}>CockTails</h1>
              <h1 style={{ color: "white", marginLeft: 5 }}>List</h1>
            </div>
            {cocktailArray.map((item) => {
              return (
                <div key={item._id} className="Content_div">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontFamily: "monospace",
                    }}
                    to={{ pathname: `/cocktail/${item.cocktailID}` }}
                  >
                    <img
                      className="movie-div"
                      src={item.cocktailPoster}
                      alt={item.title}
                    />
                    <span>Title: {item.title}</span>
                    <br />
                    <span>Added by: {item.cocktailOwner.userName}</span>
                  </Link>
                  <button
                    className="w-100 btn btn-lg btn-primary"
                    style={{
                      backgroundColor: "blue",
                      color: "#fff",
                      borderRadius: 5,
                      height: 50,
                      marginTop: 5,
                      cursor: "pointer",
                      width: 225,
                    }}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyCockTailList;
