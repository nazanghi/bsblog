import React from 'react'
import {Link} from 'react-router-dom'

export default () => {
    return (
        <div className = "hero flex-col">
            <div className ="hero-message">
                <h1>Journey bs</h1>
                <p>travelling blah blah blah cool shit dude</p>
            </div>
            <div className ="hero-action">
                <Link to ="/register">DO IT DUDE</Link>
            </div>
        </div>
    )
}