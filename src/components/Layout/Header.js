import './Header.css'

import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

function Header(props){
    return(
        <>
        <header className='header'>

            <h1>
                MoyMeals
            </h1>
            
            <HeaderCartButton onClick={props.onClick}/>
        
        </header>

        <div className='main-image'>
            <img src={mealsImage}/>
        </div>
        
        </>

    )
}

export default Header