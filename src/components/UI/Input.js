import './Input.css'
import React from 'react'

const Input = React.forwardRef((props,ref)=>{
    return(
        <div className='input'>
            <section>
                <label htmlFor={props.input.id}>{props.label}</label>
                <input ref={ref} {...props.input}/>
            </section>
        </div>

    )
})

export default Input