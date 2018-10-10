import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/authA'
import { withRouter } from 'react-router-dom'
import './Login.css'

class Login extends React.Component{

    constructor(props){
        super(props)
        this.onUserChange = this.onUserChange.bind(this)
        this.onPassChange = this.onPassChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.toBlur = React.createRef()
        this.toBlur2 = React.createRef()
        this.toBlur3 = React.createRef()
        this.changeRetypePass = this.changeRetypePass.bind(this)
        this.setUserNameError = this.setUserNameError.bind(this)
        this.setPasswordState = this.setPasswordState.bind(this)
    }

    state = {
        username: '',
        password: '',
        retypePass: '',
        usernameError: false,
        passwordsNotMatch: false,
    }

    handleClick(){
        if(this.state.username && this.state.password && this.state.password === this.state.retypePass){
            this.onSubmit() 
        }
    }
    componentDidMount(){
        window.addEventListener('click', this.handleClick)
    }
    componentWillUnmount(){
        window.removeEventListener('click', this.handleClick)
    }
    onUserChange(e){
        this.setState({
            username: e.target.value
        })
    }

    setPasswordState(){
        this.setState(prev=>({passwordsNotMatch: !prev.passwordsNotMatch}))
    }

    onPassChange(e){
        this.setState({
            password: e.target.value
        })
    }

    setUserNameError(){
        this.setState(pState=>({usernameError: !pState.usernameError}))
    }

    changeRetypePass(e){
        this.setState({retypePass: e.target.value})
    }

    onSubmit(){
        if(this.props.access_token){
            this.props.closeModal()
        }
        if(this.props.type === "login"){
            this.props.login(this.state.username, this.state.password)
        }else if(this.props.type === "register"){
            if(this.state.password === this.state.retypePass){
                this.props.register(this.state.username, this.state.password)
            }
            else{
                this.setState({passwordsNotMatch:true})
            }
        }       
        // this.setState({password: '', retypePass: ''})
    }

    render(){
        return (
            <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
            <form>
                {/* <p className="login-text">Username:</p>  */}
                <input 
                    spellCheck={false}
                    ref={this.toBlur2}
                    className={
                        this.props.error ? "input-form-error" :
                        this.props.type==='login' ? "input-form" :
                        this.props.userFound 
                            ? "input-form-error" 
                            : this.props.userFound === false 
                                ? "input-form-success"
                                : 'input-form'
                    }
                    onChange={this.onUserChange}
                    type="text"
                    value={this.state.username}
                    placeholder="username"
                    autoFocus
                    onFocus={(e)=>{
                        if(this.props.error){
                            this.props.resetError()
                        }
                        this.props.toggleInput()
                        
                    }}
                    onBlur={
                        (e)=>{
                            this.props.toggleInput()
                            if(this.state.username){
                                this.props.findUsername(this.state.username)
                            }
                        }
                    }
                    onKeyPress={(e)=>{
                        if(e.key === 'Enter'){
                            e.target.blur()
                            this.onSubmit()
                        }
                    }}
                />
                <br />
                <input 
                    ref={this.toBlur}
                    className={this.state.password && this.state.retypePass && this.state.passwordsNotMatch ? "input-form-error" : "input-form"}
                    onChange={this.onPassChange}
                    value={this.state.password}
                    type="password"
                    placeholder="password"
                    onFocus={(e)=>{
                        if(this.props.error){
                            this.props.resetError()
                        }
                        this.props.toggleInput()
                        
                    }}
                    onKeyPress={(e)=>{
                        if(e.key === 'Enter'){
                            e.target.blur()
                            this.onSubmit()
                        }
                    }}
                    onBlur={
                        (e)=>{
                            if(this.state.username && this.state.password && this.props.type==="login"){
                                this.onSubmit()
                            }
                            this.props.toggleInput()
                        }
                    }
                />
                <br />
                {this.props.type === 'register' && 
                    <input 
                        ref={this.toBlur3}
                        className={this.state.password && this.state.retypePass && this.state.passwordsNotMatch ? "input-form-error" : "input-form"}
                        type="password"
                        placeholder="retype password"
                        value={this.state.retypePass}
                        onChange={this.changeRetypePass}
                        onFocus={()=>{
                            this.props.toggleInput()
                            if(this.props.error){
                                this.props.resetError()
                            }
                        }}
                        onKeyPress={(e)=>{
                            if(e.key === 'Enter'){
                                e.target.blur()
                                this.onSubmit()
                            }
                        }}
                        onBlur={
                            (e)=>{
                                if(this.state.username && this.state.password === this.state.retypePass){
                                    this.onSubmit()
                                }else {
                                    this.setPasswordState()
                                }
                                this.props.toggleInput()
                            }
                        }

                    />
                }
            </form>
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        userFound: state.auth.userFound,
        error: state.auth.error
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(actions.auth(username, password)),
        register: (username, password) => dispatch(actions.register(username, password)),
        findUsername: (username)=> dispatch(actions.findUsername(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))