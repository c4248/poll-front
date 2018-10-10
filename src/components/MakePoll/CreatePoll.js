import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollForm from './PollForm'
import { persistAuth, refreshAccess } from '../../store/actions/authA'
import { createQuestion, clearCreate } from '../../store/actions/createPollA'
import { Redirect, withRouter} from 'react-router-dom'

import Layout from '../Layout/Layout'

const initialState = {
    questionName: '',
    choices: [],
    error: nullcd 
}

class CreatePoll extends Component {
    
    constructor(props){
        super(props)
        this.state = initialState
        this.questionNameChange = this.questionNameChange.bind(this)
        this.addChoice = this.addChoice.bind(this)
        this.choiceChange = this.choiceChange.bind(this)
        this.submitQuestion = this.submitQuestion.bind(this)
    }

    componentDidMount(){
        this.props.persistAuth()
        this.props.refreshAccess()
    }

    componentDidUpdate(){
        if(this.props.createPoll.id){
            this.props.history.push(`/${this.props.createPoll.id}`)
            this.props.clear()
        }
    }

    questionNameChange(e){
        this.setState({questionName: e.target.value})
    }

    addChoice(choice){
        if(this.state.choices.includes(choice)){
            this.setState({error: 'choice is already included'})
        }else {
            this.setState((pState)=>(
                {
                    choices: [...pState.choices, choice], 
                    error: null
                }
            ))

        }
        
    }

    choiceChange(e,index){
        this.setState((pState)=>({choices: {...pState.choices, [index]:e.target.value}}))
    }

    submitQuestion(){
        this.props.createQuestion(
            {
                name: this.state.questionName, 
                choice_list:this.state.choices,
                user_id: this.props.auth.user_id,
                username: this.props.auth.username
            }
        )
        this.setState(initialState)
    }

    render() {
        const access = localStorage.getItem('access_token')
        return(      
            <div>
                {!access && <Redirect to="/"></Redirect>}
                <Layout></Layout>
                {this.state.error && <p>{this.state.error}</p>}
                <PollForm 
                    questionNameChange={this.questionNameChange}
                    questionValue={this.state.questionName}
                    choices={this.state.choices}
                    addChoice={this.addChoice}
                    choiceChange={this.choiceChange}
                    submitQuestion={this.submitQuestion}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        createPoll: state.createPoll,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createQuestion: (obj) => dispatch(createQuestion(obj)),
        persistAuth: () => dispatch(persistAuth()),
        refreshAccess: () => dispatch(refreshAccess()),
        clear: ()=>dispatch(clearCreate())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePoll))