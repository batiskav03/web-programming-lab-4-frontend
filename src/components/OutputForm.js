import React from 'react'
import ReactDOM from 'react-dom'
import TextInput from './TextInput'
import Button from './Button'

export default function outputForm(props) {

    return (
        <form>
            <TextInput 
            label={props.label[0]}
            handleFunc={props.inputFuncs[0]}
            />
            <TextInput 
            label={props.label[1]}
            handleFunc={props.inputFuncs[1]}
            />
            <Button onClick={props.btnFunc}  name={props.btnName} />
        </form>
    )
}