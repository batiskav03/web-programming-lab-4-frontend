import React from 'react'
import ReactDOM from 'react-dom'

export default function TextInput(props) {
    return(
        <div>
            <label>{props.label}</label>
            <input
            onChange={props.handleFunc}
            type="text"
            />
        </div>
    )
}