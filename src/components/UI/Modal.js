import './Modal.css' 
import ReactDOM from 'react-dom'

function Backdrop(props){
    return(
        <div onClick={props.onClick} className='backdrop'>

        </div>

    )
}

function ModalOverlay(props){
    return(

        <div className='modal'>
            <div className='content'>
                {props.children}
            </div>
        </div>
        
    )
}

const portal=document.getElementById('overlays')

function Modal(props){
    return(
        <div>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>,portal)}
            {ReactDOM.createPortal(
                <ModalOverlay>
                    {props.children}
                </ModalOverlay>,
                portal
            )}
                    
        </div>
    )
}

export default Modal