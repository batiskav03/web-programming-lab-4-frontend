import React from 'react'
import ReactDOM from 'react-dom'

export default function Slider(props) {
    return (
        <div>
            <p>
                <input
                className={props.className}
                onChange={props.onChange} 
                type="range" 
                min={props.min} 
                max={props.max} 
                defaultValue={props.defaultValue}/>
            </p>
            <div>
                <label>{props.label}</label>
            </div>
        </div>
    )
}