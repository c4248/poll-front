import React from 'react'
import Modal from 'react-modal'
import Login from '../Home/Login'
import './LoginModal.css'

const customStyles = {
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

class SignupModal extends React.Component{
    constructor(props){
        super(props)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.toggleInput = this.toggleInput.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    state = {
        modalIsOpen:false,
        inputFocused: false,
        onModal: false
    }

    componentDidMount(){
        window.addEventListener('click', this.handleClick)
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.handleClick)
    }

    handleClick(){
        if(!this.state.onModal && this.state.inputFocused){
            this.toggleInput()
        } else if(!this.state.onModal && !this.state.inputFocused){
            this.closeModal()
        }
    }

    openModal(){
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal(){
        this.setState({
            error: null,
            modalIsOpen: false
        })
    }

    toggleInput(){
        this.setState(pState=>({inputFocused: !pState.inputFocused}))
    }


    render(){
        return (
            <div>
                <div className="settings-item settings-item-name"onClick={this.openModal}>sign up</div>
                <Modal
                    style={customStyles}
                    isOpen={this.state.modalIsOpen}
                    shouldCloseOnOverlayClick= {!this.state.inputFocused}
                >
                <div 
                    onMouseEnter={()=>this.setState({onModal: true})}
                    onMouseLeave={()=>this.setState({onModal: false})}
                >
                <Login 
                    closeModal={this.closeModal}
                    access_token={this.props.access_token}
                    resetError={this.props.resetError}
                    error={this.props.error}
                    type="register"
                    toggleInput={this.toggleInput}
                ></Login>
                </div>
                </Modal>
            </div>
        )
    }
}

export default SignupModal