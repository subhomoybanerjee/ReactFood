import "./Cart.css";
import Modal from "../UI/Modal";
import { useContext, useEffect } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useState } from "react/cjs/react.development";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = "$" + Math.abs(cartCtx.totalAmount).toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const [isCheckout, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [didSubmit, setDidSubmit] = useState(false);

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

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  function orderHander() {
    setIsCheckOut(true);
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://moyreactdb-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
	cartCtx.clearCart()
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((items) => (
        <CartItem
          key={items.id}
          name={items.name}
          price={items.price}
          amount={items.amount}
          onRemove={cartItemRemoveHandler.bind(null, items.id)}
          onAdd={cartItemAddHandler.bind(null, items)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <>
      {!isCheckout && (
        <div className="actions">
          <button className="close" onClick={props.onClick}>
            Close
          </button>
          {hasItems && (
            <button className="order" onClick={orderHander}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && hasItems && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.onClick} />
      )}

      {modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const doneSubmission = (
    <>
      <p>submisson hogaya...</p>

      <div>
        <button className="submission" onClick={props.onClick}>
          done
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onClick}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && doneSubmission}
    </Modal>
  );
}

export default Cart;
