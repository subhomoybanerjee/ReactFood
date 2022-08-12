import './HeaderCartButton.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../../Store/cart-context'


function HeaderCartButton(props){

    const [btnIsHighlighted,setBtnIsHighlighted]=useState(false)
    const cartCtx=useContext(CartContext)

    const numberOfCartItems=cartCtx.items.reduce((curNumber,item)=>{
        return curNumber+item.amount
    },0)

    const button='button'
    const bump='bump'
    const btnClasses=  `${button} ${btnIsHighlighted ? bump:''}`

    useEffect(()=>{
        if(cartCtx.items.length===0){
            return
        }
        setBtnIsHighlighted(true)
        
        const timer=setTimeout(()=>{
            setBtnIsHighlighted(false)
        },300)

        return ()=>{
            clearTimeout(timer)
        }
    },[cartCtx.items])

    return(
        <button className={btnClasses} onClick={props.onClick}>

            <span className='icon'>
                <CartIcon/>
            </span>

            <span >Your Cart</span>

            <span className='badge'>
                {numberOfCartItems}
            </span>

        </button>


    )
}

export default HeaderCartButton