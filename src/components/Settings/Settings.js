import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/settingsA'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Settings extends React.Component{

    componentDidMount(){
        this.props.getUser()
        
    }
    componentDidUpdate(){
    }
    state = {
        modalIsOpen: false
    }

    toggleOpen = () => {
        this.setState({modalIsOpen:true})
    }

    toggleClose = () => {
        this.setState({modalIsOpen:false})
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
                    {this.props.settings.userData  && this.props.settings.userData.userPosts.polls.map(poll=>(
                        <p key={poll.name}>{poll.name}</p>
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
        getUser: ()=> dispatch(actions.getUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)