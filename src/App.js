import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./Store/CartProvider";


function App() {

  const [hidden,setHidden]=useState(true)
  function cartHandler(){
      setHidden(true)
  }

  function hideCartHandler(){
    setHidden(false)
}

  return (
    <CartProvider>
      {!hidden && <Cart onClick={cartHandler}/>}
      <Header onClick={hideCartHandler}/>
      
      <main>
        <Meals/>
      </main>

      
      </CartProvider>
  );
}

export default App;
