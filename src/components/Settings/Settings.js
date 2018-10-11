import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/settingsA'
import './Settings.css'

const customStyles = {
    content : {
      backgroundColor : '#343d46',
      color: '#c0c5ce',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      maxWidth:'450px',
      width: '450px'
    }
  };


class Settings extends React.Component{
    // state={
    //     isDeleted: false
    // }

    componentDidMount(){
        this.props.getUser() 
    }
    state = {
        modalIsOpen: false,
        newPassword:'',
        reNewPassword:''
    }

    toggleOpen = () => {
        this.setState({modalIsOpen:true})
    }

    toggleClose = () => {
        this.setState({modalIsOpen:false})
    }

    deletePoll = (p) => {
        this.props.pollDelete(p.id)
    }

    passwordChange = (e) => {
        this.setState({newPassword: e.target.value})
    }

    rePasswordChange  = (e) => {
        this.setState({reNewPassword: e.target.value})
    }

    passwordSubmit = (e) => {
        if(this.state.newPassword === this.state.reNewPassword){
            this.props.passChange(this.props.settings.userData.userPosts.username, this.state.newPassword)
        }else{
            console.log('wtf')
        }
    }

    render(){
        return (
            <div>
                <div onClick={this.toggleOpen}>Home</div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.toggleClose}
                    style={customStyles}
                >
                    <h2>User Settings</h2>
                    <h3>Change your Password</h3>
                    <form className="password_form" onSubmit={this.passwordSubmit}>
                        New Password:
                        <input value={this.state.newPassword} onChange={this.passwordChange} type="password"/>
                        Retype new Password: 
                        <input value={this.state.reNewPassword} onChange={this.rePasswordChange} type="password"/>
                        <button type="submit">Submit</button>
                    </form>
                    <h3>List of your Polls</h3>
                    {this.props.settings.userData  && this.props.settings.userData.userPosts.polls.map(poll=>(
                        
                        <div key={poll.name} className="poll_list_item">
                            <p >
                                {poll.name}  
                            </p>
                            <div className="delete_butt" onClick={()=>this.deletePoll(poll)}>Delete</div>
                        </div>
                    ))}
                </Modal>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        settings :state.settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: ()=> dispatch(actions.getUserData()),
        pollDelete: (pollId)=> dispatch(actions.pollDelete(pollId)),
        passChange: (username,password)=> dispatch(actions.passChange(username, password)),
        userDelete: (user)=> dispatch(actions.userDelete(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)