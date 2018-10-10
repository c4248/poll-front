import React from 'react'
import Modal from 'react-modal'
import './CreatePollModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faChartBar, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import { FinishForm, CreateQuestion, CreateChoices } from './Wizard'
import { connect } from 'react-redux'
import { createQuestion } from '../../store/actions/createPollA'
import { refreshAccess } from '../../store/actions/authA';

import { Redirect} from 'react-router-dom'

const initialState = {
    modalIsOpen:false,
    currentStep: 1,
    questionName: '',
    choices: [],
    choiceString: '',
    chartType: '',
    error: null,
    selectedOption: 'bar'
}

const customStyles = {
    content : {
      backgroundColor : '#343d46',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      maxWidth:'450px'
    }
  };

Modal.setAppElement("#root")

class CreatePollModal extends React.Component{
    constructor(props){
        super(props)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
        this.questionOnChange = this.questionOnChange.bind(this)
        this.choiceOnChange = this.choiceOnChange.bind(this)
        this.choiceAdd = this.choiceAdd.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onEnter = this.onEnter.bind(this)
        this.setError = this.setError.bind(this)
        this.choiceEnter = this.choiceEnter.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.linkClicker = this.linkClicker.bind(this)
        this.removeChoice = this.removeChoice.bind(this)
        this.setWindowListen = this.setWindowListen.bind(this)
    }

    state = {
        modalIsOpen:false,
        currentStep: 1,
        questionName: '',
        choices: [],
        choiceString: '',
        chartType: '',
        error: null,
        selectedOption: 'bar',
        choiceInputActive: false,
        counter: 0
    }

    setWindowListen (e){
        if(e.key === 'Enter'){
            this.onSubmit()
        }
    }

    componentDidUpdate(){
        if(this.state.currentStep === 3){
            window.addEventListener('keydown', this.setWindowListen)
        }
        if(this.state.currentStep ===4){
            window.removeEventListener('keydown', this.setWindowListen)
        }
        
    }


    _next(){
        if(this.state.currentStep === 1 && !this.state.questionName){
            this.setState({error: 'Question cannot be blank'})
        } else if(this.state.currentStep === 2 & this.state.choices.length < 2){
            this.setState({error: '2'})
        } 
        else {
            this.setState(prevState=>({
                currentStep: prevState.currentStep+1,
                error: ''
            }))
        }
    }

    _prev(){
        this.setState(prevState=>({currentStep: prevState.currentStep-1}))
    }

    openModal(){
        this.props.refreshAccess()
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal(){
        this.setState(initialState)
    }
    
    questionOnChange(e){
        this.setState({questionName: e.target.value, error: null})
    }

    choiceOnChange(e){
        if(e.target.value.length > 0){
            this.setState({choiceString: e.target.value, choiceInputActive: true})
        } else {
            this.setState({choiceString: e.target.value, choiceInputActive: false})
        }
    }

    choiceAdd(){
        if(this.state.choices.includes(this.state.choiceString)){
            this.setState({
                error: 'include',
                choiceString: ''
            })
        } else {
            this.setState(prevState=>(
                {
                    error: '',
                    choices:[...prevState.choices, prevState.choiceString]
                }), ()=>this.setState({choiceString: ''})
            )
        }
        this.setState({choiceInputActive : false})
    }

    setError(error){
        this.setState({error})
    }

    choiceEnter(e){

        if(e.key === 'Enter'){
            if(this.state.choiceString){
                this.choiceAdd()
            } 
            
            else {
                this._next()
            }
        }
    }

    removeChoice(choice){
        let choices = [...this.state.choices]
        const index = choices.indexOf(choice)
        choices.splice(index, 1)
        this.setState({choices})
    }

    handleOptionChange(selectedOption){
        this.setState({
            selectedOption
        })
    }

    onSubmit(){
        this.props.createQuestion(
            {
                name: this.state.questionName, 
                choice_list:this.state.choices,
                user_id: this.props.auth.user_id,
                username: this.props.auth.username,
                admin: this.props.auth.user_id === 1 ? true : false
            }
        )
        this._next()
    }

    linkClicker(){
        this.setState(initialState)
        this.closeModal()
    }

    onEnter(e){
        if (e.key === 'Enter'){

            this._next()
        }
    }

    render(){
        return (
            <div>
                <div onClick={this.openModal} className="settings-item settings-item-name with-icon">
                <FontAwesomeIcon icon={faChartBar}  style={{paddingRight:".2rem"}}/>
                create
                </div>
                <Modal
                    style={customStyles}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                >
                <CreateQuestion 
                    currentStep={this.state.currentStep}
                    questionOnChange={this.questionOnChange}
                    questionName={this.state.questionName}
                    onEnter={this.onEnter}
                    error={this.state.error}
                ></CreateQuestion>
                <CreateChoices 
                    currentStep={this.state.currentStep}
                    choiceOnChange={this.choiceOnChange}
                    choiceAdd={this.choiceAdd}
                    choice={this.state.choiceString}
                    choices={this.state.choices}
                    onEnter={this.onEnter}
                    questionName={this.state.questionName}
                    choiceEnter={this.choiceEnter}
                    removeChoice={this.removeChoice}
                    error={this.state.error}
                ></CreateChoices>
                <FinishForm
                    currentStep={this.state.currentStep}
                    linkClicker={this.linkClicker}
                    pollId={this.props.poll.id}
                >
                </FinishForm>
                <div className="next-prev-buttons">
                { this.state.currentStep > 1 && this.state.currentStep < 4 ? <button onClick={this._prev} className="next_button"><FontAwesomeIcon icon={faChevronLeft} /></button> : <span></span>}
                {this.state.currentStep < 3 ? 
                    <button 
                        className="next_button"
                        onClick={this.state.choiceString ? this.choiceAdd : this._next }
                    >
                    <FontAwesomeIcon icon={faChevronRight} />
                    </button>: 
                    this.state.currentStep === 3 ? <button 
                        className="next_button" 

            
                        
                    ><FontAwesomeIcon onClick={this.onSubmit} icon={faAngleDoubleRight} size="lg"/></button> : <span></span>
                }
                </div>
                </Modal>
                {this.state.currentStep > 4 ? <Redirect to={`/${this.props.poll.id}`}></Redirect> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        poll: state.createPoll,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {createQuestion, refreshAccess})(CreatePollModal)