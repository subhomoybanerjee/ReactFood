import { useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import classes from './Checkout.module.css';

const Checkout = (props) => {

  const isEmpty=value=>value.trim()===''
  const isSixChars=value=>value.trim().length===6

  const [formInputsValidity,setFormInputsValidity]=useState({
    name:true,
    street:true,
    city:true,
    postalCode:true
  })

  const nameInputRef=useRef()
  const streetInputRef=useRef()
  const postalCodeInputRef=useRef()
  const cityInputRef=useRef()

  

  const confirmHandler = (event) => {
    event.preventDefault();
    
    const enteredName=nameInputRef.current.value
    const enteredStreet=streetInputRef.current.value
    const enteredPostalCode=postalCodeInputRef.current.value
    const enteredCity=cityInputRef.current.value

    const nameValid=!isEmpty(enteredName)
    const streetValid=!isEmpty(enteredStreet)
    const cityValid=!isEmpty(enteredCity)
    const postalValid=!isEmpty(enteredPostalCode) && isSixChars(enteredPostalCode)

    setFormInputsValidity({
      name:nameValid,
      street:streetValid,
      city:cityValid,
      postalCode:postalValid
    })

    console.log(!isEmpty(enteredPostalCode),isSixChars(enteredPostalCode))

    const formIsValid=
      nameValid&&
      streetValid&&
      cityValid&&
      postalValid

    if(!formIsValid){
      return
    }

    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postalCode:enteredPostalCode,
      city:enteredCity
    })

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name?'':classes.invalid}`} >
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputsValidity.name && <p>naam daal dhangka</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street?'':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputsValidity.street && <p>street daal dhangka</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode?'':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalCodeInputRef} type='text' id='postal' />
        {!formInputsValidity.postalCode && <p>postal daal dhangka</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city?'':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputsValidity.city && <p>sheher daal dhangka</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;