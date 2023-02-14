import React from 'react'
import ReactDOM from 'react-dom'

function Footer(props) {
    return (
        <div>
            <h3>
                <p>{props.name}</p>
                <p>{props.group}</p>
                <p>{props.task}</p>
            </h3>
        </div>
    )
}

export default Footer