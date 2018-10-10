import React from 'react'
import './UserSettings.css'
import { Link } from 'react-router-dom'
import {faHome, faCog} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreatePollModal from '../CreatePollModal/CreatePollModal'
import Settings from '../Settings/Settings'

const UserSettings = (props) => (

    <div className="user-settings">
        <Settings></Settings>
        <Link style={{textDecoration: 'none'}} className="user-settings-Link" to="/">
            <div className="settings-item settings-item-name with-icon" title="User Settings">
            <FontAwesomeIcon icon={faCog} style={{paddingBottom: "4px",paddingRight:".2rem"}}/>
            {props.username}
            </div>
        </Link>
        <Link style={{textDecoration: 'none'}} className="user-settings-Link" to="/" title="Home">
        <div className="settings-item settings-item-name with-icon" title="User Settings">
            <FontAwesomeIcon icon={faHome} style={{paddingBottom: "4px",paddingRight:".2rem"}}/>
            home
        </div>
        </Link>
        <CreatePollModal>
        </CreatePollModal>     
        <div
            onClick={()=>{
                props.logout()
            }} 
            title="Log Out"
        >
            <div className="settings-item settings-item-name">logout</div>
        </div>
        
        
    </div>
)

export default UserSettings