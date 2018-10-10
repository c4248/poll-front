import React from 'react'
import ChoiceInput from './ChoiceInput'


const PollForm = ( props ) => (
    <form>
        <p>Input question: </p>
        <input 
            value={props.questionValue}
            onChange={props.questionNameChange} 
            type="text"
        />
        <br />
        <ul>
            {props.choices.map(choice=><li key={choice}>{choice}</li>)}
        </ul>
        <ChoiceInput addChoice={props.addChoice}/>

        <button type="button" onClick={props.submitQuestion}>Submit</button>

    </form>

)


export default PollForm