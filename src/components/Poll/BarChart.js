import React, { Component } from 'react'
import './BarChart.css'
import BarChartSVG from './BarChartSVG'

class BarChart extends Component {
    constructor(props){
        super(props)
        // this.createBarChart = this.createBarChart.bind(this)
        this.setXY = this.setXY.bind(this)
        this.setVote = this.setVote.bind(this)
        this.setNull = this.setNull.bind(this)
        this.setBandwidth = this.setBandwidth.bind(this)
        this.setChoiceAndVotes = this.setChoiceAndVotes.bind(this)
        this.setPermaXY = this.setPermaXY.bind(this)
        this.setPermaFalse = this.setPermaFalse.bind(this)
    }

    state = {
        x: null,
        y: null,
        voteObj: null,
        bandwidth: null,
        perma: false
    }

    setVote(voteObj){
        this.setState({voteObj})
    }

    setXY(x,y){
        let ypadded = y+15
        let xpadded = x-80
        this.setState({x:xpadded,y:ypadded})
    }

    setNull(){
        if(!this.state.perma){
            this.setState({x:null, y:null, voteObj: null, choiceName:null})
        }
        
    }

    setBandwidth(bandwidth){
        this.setState({bandwidth})
    }

    setChoiceAndVotes(choiceName, choiceVotes){
        this.setState({choiceName, choiceVotes}, ()=>console.log(this.state.choiceName))
    }

    setPermaXY(){
        this.setState({perma: true})
    }

    setPermaFalse(){
        this.setState({perma: false,choiceName: null})
    }

    render(){
        return (
            <div className="barandtip">
                <div onClick={this.setPermaFalse} className="bar-heading">
                
                    {this.state.choiceName ?
                        <div className="choicevotetitle">
                            <div className="empty">
                            </div>
                            <h1 className={this.state.choiceName.length > 200 ? "choiceName_text_small" : "choiceName_text"}>
                                {this.state.choiceName}
                            </h1>
                            <div className="vote_text">
                            {this.state.choiceVotes}
                            </div>
                            {/* <h1 className="choicevoteheading">
                                {this.state.choiceName} <br />
                                <span className="vote_text">Votes: {this.state.choiceVotes}</span>
                            </h1> */}
                        </div> :
                        <div className="choicevotetitle">
                            <div className="empty">
                            </div>
                            <h1 className={this.props.title.length > 200 ? "choiceName_text_small" : "choiceName_text"}>
                            {this.props.title}
                            </h1>
                            <div className="vote_text">
                            {this.props.totalVotes}
                            </div>
                        </div>
                    }
                </div>
                <BarChartSVG 
                    data={this.props.data} 
                    size={this.props.size}
                    setXY={this.setXY}
                    setVote={this.setVote}   
                    setNull={this.setNull} 
                    setBandwidth={this.setBandwidth}
                    setChoiceAndVotes={this.setChoiceAndVotes}
                    setPermaXY={this.setPermaXY}
                    setPermaFalse={this.setPermaFalse}

                ></BarChartSVG>
            </div>
        )
    }
}

export default BarChart