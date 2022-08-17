import { useEffect, useState } from "react"
import DUMMY_MEALS from "./dummy-meals"
import MealItem from "./MealItem"
import './AvailableMeals.css'

function AvailableMeals(){
    //const temp = DUMMY_MEALS

    const [meals,setMeals]=useState([])
    const [isLoading,setIsLoading]=useState(null)
    const [httpError,setHttpError]=useState('')
    
    useEffect(()=>{
        const fetchMeals=async()=>{

            
                setIsLoading(true)
                const response=await fetch('https://moyreactdb-default-rtdb.firebaseio.com/meals.json')

                if(!response.ok){
                    throw new Error('something went wrong')
                }

                const data=await response.json()
            
                const loadedMeals=[]

                for(const key in data){
                    loadedMeals.push({
                        id:key,
                        name:data[key].name,
                        description:data[key].description,
                        price:data[key].price
                    })
                }
                setMeals(loadedMeals)
                setIsLoading(false)
            
            
        }

        fetchMeals().catch((error)=>{
            setIsLoading(false)
            setHttpError(error.message)
        })
    },[])
    
    // console.log(httpError,isLoading)

    if(httpError){
        return(
            <section className="MealsError"><p>bhosda hogaya: {httpError}</p></section>
        )
    }

    return(
        <div className="mealsss">
            {isLoading && <section className="MealsLoading"><p>Loading...</p></section>}
            {!isLoading && <ul>
                {
                    meals.map(meal=>(
                        
                            <MealItem
                                key={meal.id}
                                id={meal.id}
                                name={meal.name}
                                description={meal.description}
                                price={meal.price}
                            />
                        
                    ))
                }
            </ul>}
            
        </div>
    )
}

export default AvailableMeals