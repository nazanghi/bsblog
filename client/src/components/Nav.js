import React from 'react'
import {NavLink} from 'react-router-dom'
// import '../styles/Nav.css'
export default ({ authenticated, currentUser, className }) => {
    return authenticated && currentUser ? (
        <header className = {className}>
            <div className="icon"></div>
            <nav>
                <NavLink activeClassName="nav-active" to="/profile">
                    Profile
                </NavLink>
                <NavLink activeClassName="nav-active" to="/discover">
                    Discover
                </NavLink>
                <NavLink activeClassName="nav-active" to="/upload">
                    CreatePost
                </NavLink>
                <NavLink
                    activeClassName ="nav-active"
                    to="/"
                    onClick={()=>localStorage.clear()}
                >
                    Log Out
                </NavLink>
            </nav>
        </header>
    ) : (
        <header className = {className}>
            <div className="icon"></div>
            <nav>
                <NavLink activeClassName="nav-active" to="/profile">
                    Profile
                </NavLink>
                <NavLink activeClassName="nav-active" to="/discover">
                    Discover
                </NavLink>
                <NavLink activeClassName="nav-active" to="/upload">
                    CreatePost
                </NavLink>
                <NavLink
                    activeClassName ="nav-active"
                    to="/"
                    onClick={()=>localStorage.clear()}
                >
                    Log Out
                </NavLink>
            </nav>
        </header>
    )
}