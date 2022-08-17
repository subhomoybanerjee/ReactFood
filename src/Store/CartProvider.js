import { useContext, useReducer } from "react"
import CartContext from "./cart-context"



const defaultCartState={
    items:[],
    totalAmount:0
}


const cartReducer=(state,action)=>{

    if(action.type==='ADD'){
        //console.log('state.items:'+JSON.stringify(state.items))
        
        const updatedTotalAmount=
            state.totalAmount+action.item.price*action.item.amount
    
        
        const existingCartItemIndex=state.items.findIndex(
            (item)=>item.id === action.item.id
        )

        //console.log('exisCartItemIndex: '+existingCartItemIndex)

        const existingCartItem=state.items[existingCartItemIndex]


        //console.log('existingCartItem:'+JSON.stringify(state.items[existingCartItemIndex]))
        let updatedItems

        if(existingCartItem){
            const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
            }
            //console.log('updatedItem(if):'+JSON.stringify(updatedItem))

            updatedItems=[...state.items]
            //console.log('updatedItems(if):'+JSON.stringify(updatedItems))

            updatedItems[existingCartItemIndex]=updatedItem
            //console.log('updatedItems(if)'+JSON.stringify(updatedItems))
        }
        else{
            updatedItems=state.items.concat(action.item)
            //console.log('updatedItems(else):'+JSON.stringify(updatedItems))
        }

        

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }

    else if(action.type==='REMOVE'){
        const existingCartItemIndex=state.items.findIndex(
            (item)=>item.id === action.id
        )
        
        state.items[existingCartItemIndex].amount-=1
        const totalAmount=state.totalAmount-state.items[existingCartItemIndex].price

        if(state.items[existingCartItemIndex].amount===0){
            state.items.splice(existingCartItemIndex,1)
        }

        console.log(state)
        

        return {
            items:state.items,
            totalAmount:+totalAmount       
        }

    }

    return defaultCartState
    
}



function CartProvider(props){

    const [cartState, dispatchCartAction]=useReducer(cartReducer,defaultCartState)
   

    function addItemToCartHandler(item){
        dispatchCartAction({
            type:'ADD',
            item:item
        })
    }

    function removeItemfromCartHandler(id){
        dispatchCartAction({
            type:'REMOVE',
            id:id
        })
    }

    function clearCartHandler(){
        dispatchCartAction({
            type:'SUBMISSION'
        })
    }

    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemfromCartHandler,
        clearCart:clearCartHandler
    }

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider