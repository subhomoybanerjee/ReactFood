import { useContext } from "react"
import CartContext from "../../Store/cart-context"
import Cards from "../UI/Cards"
import './MealItem.css'
import MealItemForm from "./MealItemForm"


function MealItem(props){

    const cartCtx=useContext(CartContext)
    const addToCartHandler=amount=>{

        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        })

        
    }
    
    
    return(
        <Cards className="meal">
            <section>
                <h3>
                    {props.name}
                </h3>
                <div className="description">
                    {props.description}
                </div>
                <div className="price">
                    {'$'+props.price.toFixed(2)}
                </div>
            </section>

            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.id}/>
            </div>
        </Cards>

    )
}

export default MealItem