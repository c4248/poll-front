import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestions, clearQuestions } from '../../store/actions/homeA'
import { getUser } from '../../store/actions/authA'
import Layout from '../Layout/Layout'
import './Home.css'
import PollButton from './PollButton'

import { withRouter } from 'react-router-dom'

class Home extends Component {
    constructor(props){
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
    }

    state = {
        pageString: '?page=',
        pageNum: 1,
    }

    componentDidMount () {
        if(this.props.home.polls){
            this.props.clearQuestions()
        }
        this.props.onInitQuestions('')
        this.props.setUser()
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(){
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight && this.props.home.hasNext){
            this.setState((pState)=>({pageNum: pState.pageNum+1}), ()=>{
                this.props.onInitQuestions(`${this.state.pageString}${this.state.pageNum}`)
            })
        }
    }


    render() {
        return (
            <div>
            <Layout>
            </Layout>
            <div className="homeDiv">
                {this.props.home.polls && this.props.home.polls.map(question=>
                    (<React.Fragment key={question.id}>
                        <PollButton 
                            question_id={question.id}
                            name={question.name}
                            username={question.username}
                            created_at={question.created_at}
                            choices={question.choices}
                        >
                        </PollButton>
                    </React.Fragment>))}
                    {!this.props.home.polls.length > 0 && <div className="start-div">
                        Hi. If you're seeing this, then Heroku has idled and needs to start up again. Please wait.
                    </div>}
                    {this.props.home.hasNext && <div className="loading-div"></div>}
            </div>
        </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        home: state.home,
        username: state.auth.username,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitQuestions: (page) => dispatch(getQuestions(page)),
        setUser: () => dispatch(getUser()),
        clearQuestions: () => dispatch(clearQuestions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))