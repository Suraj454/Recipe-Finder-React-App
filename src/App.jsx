import React, { useEffect, useRef, useState } from 'react'

const App = () => {

 let inputRef = useRef(null);
  const [ingredientList, setIngredientList] = useState([])
  const [loading,setLoading] = useState(false);
  const API_KEY = "b46c142bd0ae81837c2625c4be4314ad"
  const APP_ID = 'd0f9f036'

  const search = () => {
    searchForRecipie(inputRef.current.value)
     //searchForRecipie(inputRef)
  }

  const searchForRecipie = (query) => {
    setLoading(true)
    let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
    fetch(url).then(response => response.json())
    .then((res) =>
     {console.log(res.hits)
     setIngredientList(res.hits) 
      setLoading(false)
    
    })
    .catch((err) => {
     console.log(err);
     setLoading(false)
    })
   
  }

useEffect(() => {
 searchForRecipie('chiken')

},[])



  return (
    <div className='container'>
    <div className='header'>
        <input type='text' placeholder='Serach' ref={inputRef}/>
        <button onClick={search}>Serach</button>
        </div>
       
        {loading && <p>Loading...</p>}

      <div className='box'> 
        {ingredientList?.map(item => {
          return(
             <div className='card'>
             <span>{item.recipe.label}</span>
             <img src={item.recipe.image} alt=''/>
             <div className='steps'>
             {item.recipe.ingredientLines.map((step) => {
              return(
                <p>{step}</p>
              )
             
             })}
             </div>
             </div>
          );
        })}

  
    </div>

    </div>
  )
}

export default App
