import React from 'react'

class ChoiceInput extends React.Component {

    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    state = {
        value: ''
    }

    onChange(e){
        this.setState({value: e.target.value})
    }
    
    onClick(choice){
        this.props.addChoice(this.state.value)
        this.setState({value: ''})
    }


    render(){
        return(
            <div>
                <input value={this.state.value} onChange={this.onChange}/>
                <button type="button" onClick={this.onClick}>Add a Choice</button>
            </div>
        )
    }
}

export default ChoiceInput