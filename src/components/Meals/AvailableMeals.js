import Cards from "../UI/Cards"
import DUMMY_MEALS from "./dummy-meals"
import MealItem from "./MealItem"

function AvailableMeals(){
    const temp = DUMMY_MEALS

    return(
        <div className="mealsss">
            
            <ul>
                {
                    temp.map(meal=>(
                        
                            <MealItem
                                key={meal.id}
                                id={meal.id}
                                name={meal.name}
                                description={meal.description}
                                price={meal.price}
                            />
                        
                    ))
                }
            </ul>
            
        </div>
    )
}

export default AvailableMeals