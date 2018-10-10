import React from 'react'

class ToolTip extends React.Component {
    constructor(props){
        super(props)
    }

    shouldComponentUpdate(){
        return true;
    }

    render(){
        if(this.props.voteObj){
            return (
                <div 
                    style={{  
                        top: this.props.x, 
                        left: this.props.y-25,
                        width: this.props.bandwidth+50
                    }} 
                    className="tooltip">
                    <p>
                    Choice: {this.props.voteObj.choice}< br/>
                    <span>Votes: {this.props.voteObj.votes}</span>
                    </p>
                </div>
            )
        }
        return null;
    }
    
}

export default ToolTip