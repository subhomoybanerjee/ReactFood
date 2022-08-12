import './Cards.css'


function Cards(props){

    const classs='card '+props.className
    return(
        <div className={classs}>
            {props.children}
        </div>
    )
}

export default Cards