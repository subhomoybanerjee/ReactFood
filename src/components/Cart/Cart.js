import Cards from '../UI/Cards'
import './Cart.css'
import Modal from '../UI/Modal'
import { useContext, useEffect } from 'react'
import CartContext from '../../Store/cart-context'
import CartItem from './CartItem'


function Cart(props){

    const cartCtx=useContext(CartContext)
    const totalAmount='$'+Math.abs(cartCtx.totalAmount).toFixed(2)
    const hasItems=cartCtx.items.length>0

    // const cartitems=[
    //     {
    //         id:'c1',
    //         name:'Sushi',
    //         amount:'2',
    //         price:'12.99'
    //     },
    //     {
    //         id:'c2',
    //         name:'oomph',
    //         amount:'3',
    //         price:'162.91'
    //     }
    // ]

    function cartItemRemoveHandler(id){
        cartCtx.removeItem(id)
        

    }

    function cartItemAddHandler(item){
        cartCtx.addItem({...item,amount:1})

    }

    return(

        <Modal onClick={props.onClick}>
            <ul className='cart-items'>
                {cartCtx.items.map(items=>
                    <CartItem
                        key={items.id}
                        name={items.name}
                        price={items.price}
                        amount={items.amount}
                        onRemove={cartItemRemoveHandler.bind(null,items.id)}
                        onAdd={cartItemAddHandler.bind(null,items)}

                    />
                )}
            </ul>

            <div className='total'>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            <div className='actions'>

                <button className='close' onClick={props.onClick}>Close</button>
                {hasItems && <button className='order'>Order</button>}
                
            </div>
        </Modal>
    )
}

export default Cart