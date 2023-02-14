import React from 'react'
import ReactDOM from 'react-dom'

class Button extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onClick}>{this.props.name}</button>
            </div>
        )
    }
}

export default Button