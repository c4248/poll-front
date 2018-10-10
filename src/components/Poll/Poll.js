import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/pollA'
import { persistAuth, refreshAccess, getUser } from '../../store/actions/authA'
import BarChart from './BarChart'
import Layout from '../Layout/Layout'
import PollVote from './PollVote'
import './Poll.css'

class Poll extends React.Component{
    constructor(props){
        super(props)
        this.container = React.createRef()
        this.setWidth = this.setWidth.bind(this)
    }

    state={
        width: null,
        height: null,
    }

    componentDidMount(){
        this.props.persistAuth()
        this.props.refreshAccess()
        this.props.getUser()
        this.props.getPoll(this.props.match.params.id)
        this.setWidth()
        window.addEventListener('resize', ()=>{
            this.setWidth()
        })   
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.props.persistAuth()
            this.props.refreshAccess()
            this.props.getPoll(this.props.match.params.id)
        }
        if(prevState.width === null){
            this.setWidth()
        }
        
    }

    addClick = (payload) => {
        this.props.addCount(payload)
    }

    delClick = (payload) => {
        this.props.delCount(payload)
    }

    setWidth(){
        if(this.container.current){
            this.setState({
                width:this.container.current.getBoundingClientRect().width,
                height: window.innerHeight
            })
        }
        
    }

    render(){
        let choices = <p>Loading</p>
        let barchart = <p>Loading</p>
        
        if(this.props.poll.choices){
            if(!localStorage.getItem('access_token')){
                choices = null
            }
            else if(this.props.votes && this.props.votes.includes(parseInt(this.props.match.params.id,10))){
                choices = null
            } else {
                choices = (
                        <PollVote 
                            title={this.props.poll.name}
                            choices={this.props.poll.choices}
                            addCount={this.props.addCount}
                        ></PollVote>
                )
            }
            
            barchart = (
                <BarChart 
                    data={this.props.poll.choices} 
                    size={[this.state.width>1200 ? 1200 : this.state.width, this.state.height-415>600 ? 600: this.state.height-415]}
                    title={this.props.poll.name} 
                    totalVotes={this.props.poll.totalVotes}
                >
                </BarChart>
            )
        }
        return (
            <div ref={this.container}>
                <Layout></Layout>
                <div className="poll_vote_container">
                    <div className="bar_chart_container">
                        {barchart}
                    </div>
                    {choices}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        poll: state.poll,
        votes: state.auth.user.votes,
    }
}


export default connect(mapStateToProps, 
    {
        getPoll: actions.getPoll, 
        addCount: actions.addCountToPoll, 
        delCount:actions.delCountFromPoll,
        persistAuth, 
        refreshAccess,
        getUser
    })(Poll)