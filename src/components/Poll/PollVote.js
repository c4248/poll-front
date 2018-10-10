import React from 'react'
import './PollVote.css'



class PollVote extends React.Component{

    constructor(props){
        super(props)
        this.selectChoice = this.selectChoice.bind(this)
        this.addSubmit = this.addSubmit.bind(this)
    }

    state = {
        selected: null,
        voted: false
    }

    selectChoice(selected){
        this.setState({selected})
    }

    addSubmit(){
        this.props.addCount(this.state.selected)
        this.setState({selected: null, voted: true})
    }

    render(){
        if(this.state.voted){
            return (
                <h3>your vote has been counted</h3>
            )
        }
        return(

            <div className="pollvote_container">
                {this.props.choices && this.props.choices.map(choice=>(
                    <div onClick={()=>this.selectChoice(choice.id)}
                    className={ this.state.selected === choice.id ? "pollvote_choice_selected":"pollvote_choice"} key={choice.id}>
                        {choice.choice}
                    </div>
                ))}
                <button className="submit_vote_button" onClick={this.addSubmit}>
                    Vote
                </button>
            </div>
            

            // <div className="poll_Vote_Vote">
            // <h1 className="abs_poll_title">{this.props.title}</h1>
            // <div className="abs_poll_choices">
            //     {this.props.choices && this.props.choices.map(choice=>
            //         <div 
            //             onClick={()=>this.selectChoice(choice.id)} 
            //             className={choice.id == this.state.selected ?
            //                 "poll_Vote_choice_selected":
            //                 "poll_Vote_choice"
            //             }
            //             key={choice.id}
            //         >
            //             <p className="poll_vote_choice_title">{choice.choice}</p>
            //         </div>
            //     )}

            // </div>
                
            // <button className="submit_vote_button" onClick={this.addSubmit}>
            //     Vote
            // </button>
            // </div>
        )
    }
}

export default PollVote