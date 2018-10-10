import React from 'react'
import Modal from 'react-modal'
import Login from '../Home/Login'
import './LoginModal.css'

let customStyles = {
    content : {
      backgroundColor : '#343d46',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    }
  };

Modal.setAppElement("#root")

class LoginModal extends React.Component{
    constructor(props){
        super(props)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.toggleInput = this.toggleInput.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    state = {
        modalIsOpen: false,
        inputFocused: false,
        onModal: false
    }

    handleClick(){
        if(!this.state.onModal && this.state.inputFocused){
            this.toggleInput()
        } else if(!this.state.onModal && !this.state.inputFocused){
            this.closeModal()
        }
    }

    componentDidMount(){
        window.addEventListener('click', this.handleClick)
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.handleClick)
    }


    
    openModal(){
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal(){
        this.setState({
            modalIsOpen: false
        })
    }

    toggleInput(){
        this.setState(pState=>({inputFocused: !pState.inputFocused}))
    }


    render(){
        return (
            <div>
                <div 
                    className="settings-item settings-item-name"
                    onClick={this.openModal}>log in</div>
                <Modal
                    style={customStyles}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick= {!this.state.inputFocused}
                >
                {/* <div className="top-login">
                    {this.props.error ? <div className="error">Incorrect Username or Password </div>: <p></p>}
                    <div  className="exit-login-button" onClick={this.closeModal}>
                    <FontAwesomeIcon size="2x" icon={faTimesCircle}></FontAwesomeIcon> 
                    </div>
                </div> */}
                <div 
                    onMouseEnter={()=>this.setState({onModal: true})}
                    onMouseLeave={()=>this.setState({onModal: false})}
                >
                <Login 
                    closeModal={this.closeModal}
                    access_token={this.props.access_token}
                    resetError={this.props.resetError}
                    error={this.props.error}
                    type="login"
                    toggleInput={this.toggleInput}
                ></Login>
                </div>
                </Modal>
            </div>
        )
    }
}

export default LoginModal