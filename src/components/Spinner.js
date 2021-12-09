import React, { Component } from 'react'
import Fading_lines from './Fading_lines.gif';
export default class Spinner extends Component {
    render() {
        return (
            <div className = "text-center">
                <img src={Fading_lines} alt="loading"/>
                
            </div>
        )
    }
}
