import React from 'react'
import './PollButton.css'
import {Collapse} from 'react-collapse'
import {withRouter} from 'react-router-dom'
import { addCountToPoll } from '../../store/actions/pollA'
import { connect } from 'react-redux'

class PollButton extends React.Component{
    constructor(props){
        super(props)
        this.openCollapse = this.openCollapse.bind(this)
        this.viewResults = this.viewResults.bind(this)
        this.renderDate = this.renderDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        if(localStorage.getItem('access_token')){
            this.setState({message: 'you have already voted for this poll'})
        }
    }

    static getDerivedStateFromProps(props, state){
        if(!localStorage.getItem('access_token')){
            return {
                message: 'you need to be logged in to vote',
                voted: false,
                choice: null
            }
        } else if(state.voted){
            return {
                message: 'thank you for voting',
            }
        }
        return {
            message: 'you have already voted for this poll',
            voted: false
        }
    }

    state = {
        error: null, 
        isOpen: false,
        choice: null,
        voted: false,
        message: 'you need to be logged in to vote'
    }

    openCollapse(){
        this.setState((pState)=>({isOpen: !pState.isOpen}))
    }

    viewResults(){
        this.props.history.push(`/${this.props.question_id}`)
    }

    renderDate(date){
        const renderedDate = new Date(date)
        return `${renderedDate.toLocaleString() }`
    }

    onSubmit(e){
        e.preventDefault()
        if(!this.state.choice){
            this.setState({error: 'please select a choice'})
        } else {
            this.props.addCount(this.state.choice)
            this.setState({voted: true, message: 'thank you for voting'})
        }
    }

    handleChange(e){   
        this.setState({
            choice: e.target.value
        })
    }

    render(){

        let InCollapse = (<div className="choices"><p className="poll_message">{this.state.message}</p></div>)

        if (this.props.access_token){
            InCollapse = (
                <div className="choices">
                {(this.props.votes && this.props.votes.includes(this.props.question_id)) ||
                    this.state.voted
                ?        <p className="poll_message">{this.state.message}</p> :
                    <form onSubmit={this.onSubmit}>
                    <div className="choices">
                        {this.state.error && <p className="pollbutton-error">{this.state.error}</p>}
                        {this.props.choices && this.props.choices.map(choice =>(
                            <label htmlFor={choice.id} className="vote_radio" key={choice.id}>
                                <input 
                                    onChange={this.handleChange} 
                                    type="radio" 
                                    id={choice.id}
                                    value={choice.id}
                                    checked={this.state.choice === `${choice.id}`}
                                />
                                {choice.choice}
                                <span className="checkmark"></span>
                                
                            </label>
                        ))}
                    </div>
                    <button className="vote_submit_button" type="submit">Vote</button>
                    </form>
                
                }
                </div> 
            )
        }
        return (
            <div>
                <div className="listName" onClick={this.openCollapse}>
                    <div style={{paddingRight:"1rem", fontSize: "1.3rem"}}>
                        <p>{this.props.name}</p>
                        <div className="poll_button_description">
                            posted by <b>{this.props.username}</b> {"on "}  
                            {
                                this.renderDate(this.props.created_at)
                                    .slice(0, this.renderDate(this.props.created_at).indexOf(','))
                            }
                        </div>
                    </div>
                    <button 
                        className="view-results-button"
                        onClick={this.viewResults}
                    >view results</button>
                </div>
                <Collapse
                    isOpened={this.state.isOpen}
                    className="collapsed"
                >
                {InCollapse}
                    
                </Collapse>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        access_token: state.auth.access_token,
        votes: state.auth.user.votes
    }
}

export default connect(mapStateToProps, {addCount: addCountToPoll})(withRouter(PollButton))