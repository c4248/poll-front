import React from 'react'
import './loader.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'

export const CreateQuestion = (props) => {
    if(props.currentStep !== 1){
        return null
    }
    return (
        <div>
            <input
                autoFocus
                spellCheck={false}
                className={props.error ? "input-form-error": "input-form"}
                value={props.questionName} 
                onChange={props.questionOnChange}
                onKeyPress={props.onEnter}
                placeholder="ask"
            >    
            </input>
        </div>
    )
}
    
export class CreateChoices extends React.Component {

    constructor(props){
        super(props)
        this.inputRef = React.createRef()
    }
    componentDidMount(){
        if(this.inputRef.current){
            this.inputRef.current.focus()
        }  
    }
    componentDidUpdate(){
        if(this.inputRef.current){
            this.inputRef.current.focus()
        }
    }


    render(){

        if(this.props.currentStep === 2 || this.props.currentStep === 3){
            return (
                <div onKeyPress={this.props.choiceEnter}>
                    <p className="create_poll_title">
                        {this.props.questionName}
                    </p>
                    {this.props.choices.map(choice=>
                        <p 
                            className="li_choice" key={choice}
                            onClick={()=>{
                                if(this.props.currentStep === 2){
                                    this.props.removeChoice(choice)
                                }
                            }}
                        >
                        {choice}
                        
                        </p>
                    )}
                    {
                        this.props.currentStep === 2 &&
                        <div className="choice_input_add">
                        <input
                            spellCheck={false} 
                            ref={this.inputRef}
                            autoFocus 
                            className={this.props.error ? "input-form-error": "input-form" }
                            placeholder={this.props.error ? this.props.error==="include" ? "included choice" :"at least 2 choices" : "choice"}
                            value={this.props.choice} 
                            onChange={this.props.choiceOnChange}
                        ></input>
                        {/* <button className="choice_add_button" onClick={this.props.choiceAdd}>Add</button> */}
                        </div>
                    }
                    
                </div>
            )
        }
        else {
            return null;
        }
    }
    
}

// export const ChooseChart = (props) => {
//     if(props.currentStep !== 3){
//         return null
//     }
//     return (
//         <div>
//             <div className="chart_choices">
//                 <div 
//                     onClick={()=> props.handleOptionChange('bar')}
//                     className={props.selectedOption==='bar' ? "chart_choice_selected": "chart_choice"}
//                 >
//                     <FontAwesomeIcon size="lg" icon={faChartBar} />
//                 </div>
//                 <div 
//                     onClick={()=> props.handleOptionChange('pie')}
//                     className={props.selectedOption==='pie' ? "chart_choice_selected": "chart_choice"}
//                 >
//                     <FontAwesomeIcon size="lg" icon={faChartPie} />
//                 </div>
//             </div>
//             {/* <input 
//                 type="radio" 
//                 value="bar" 
//                 checked={props.selectedOption === 'bar'} 
//                 onChange={props.handleOptionChange}/>
//                 Bar Chart
//             <input 
//                 type="radio" 
//                 value="pie" 
//                 checked={props.selectedOption === 'pie'} 
//                 onChange={props.handleOptionChange}/>
//                 Pie Chart */}
//         </div>
//     )
// }

export const FinishForm = (props) => {
    if(props.currentStep !== 4){
        return null
    }
    if(props.pollId){
        return (
            <div className="finish_form">

                <Link onClick={props.linkClicker} to={`/${props.pollId}`} style={{textDecoration:'none'}} >
                <div className="finished-icon">
                    <FontAwesomeIcon className="icon-size"icon={faChartBar}></FontAwesomeIcon>
                    <p>go to poll</p>
                </div>
                </Link> 
            </div>
        )
    }
    return (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
    
}
