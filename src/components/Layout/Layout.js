import React from 'react'
import LoginModal from '../Layout/LoginModal'
import SignupModal from '../Layout/SignupModal'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import UserSettings from './UserSettings'
import * as actions from '../../store/actions/authA'
import { persistAuth, resetError } from '../../store/actions/authA'
import { withRouter, Link } from 'react-router-dom'

import './Layout.css'

class Layout extends React.Component{
    componentDidMount(){
        this.props.persistAuth()
    }
    render() {
        return (
            <React.Fragment>
                <div className="header-div">
                    <div className="title">
                        {/* <h1 className="title-text"> {this.props.poll.name ? this.props.poll.name.toUpperCase() : "POLL APP"}</h1> */}
                    </div>
                    {this.props.auth.access_token 
                        ?
                            <UserSettings 
                                username={this.props.auth.username}
                                logout={this.props.logout}
                            >
                            </UserSettings>
                        :
                            <div className="auth-buttons">
                            
                            <Link style={{textDecoration: "none"}}className="user-settings-Link" to="/">
                            
                                <div className="settings-item settings-item-name with-icon">
                                <FontAwesomeIcon icon={faHome} size="sm" style={{paddingBottom: "4px",paddingRight:".2rem"}}/>
                                home
                                </div>
                            </Link>
                            <LoginModal 
                                error={this.props.auth.error}
                                access_token={this.props.auth.access_token}
                                resetError={this.props.resetError}
                            ></LoginModal>
                            <SignupModal
                                access_token={this.props.auth.access_token}
                                resetError={this.props.resetError}
                                error={this.props.auth.error}
                            >
                            </SignupModal>
                            </div>

                    }
                </div>
                <link href="https://fonts.googleapis.com/css?family=Rubik|Merriweather+Sans" rel="stylesheet"></link>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return  {
        auth: state.auth,
        poll: state.poll
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        persistAuth: () => dispatch(persistAuth()),
        resetError: () => dispatch(resetError())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout))