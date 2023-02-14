import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {currentFuncValue, arrayValueOnSegment} from '../utils/mathFunc'
import Button from './Button'
import Slider from './Slider'
import OutputForm from './OutputForm'

function CanvasGraph(props) {
    const [leftLimit, setLeftLimit] = useState(0)
    const [rightLimit, setRightLimit] = useState(1400)
    //todo: del countState
    const [count, setCount] = useState(0)
    //todo: разобартся с useRef
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const WIDTH = 700
    const HEIGHT = 350
    const DPI_HEIGHT = HEIGHT * 2
    const DPI_WIDTH = WIDTH * 2
    
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.style.width = WIDTH + "px"
        canvas.style.height = HEIGHT + "px"
        canvas.width = DPI_WIDTH
        canvas.style.border = "2px solid black"
        canvas.height = DPI_HEIGHT
        const ctx = canvas.getContext("2d")
        ctxRef.current = ctx
        drawCurveLine((x) => Math.log(x) * 25, ctx)
        drawCurveLine((x) => (1/150)*x*x + 100 , ctx)
        drawCurveLine((x) => -x/2 + 880, ctx)
        handleDots(count, leftLimit, rightLimit)
    },[])

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            //todo: del countstate
            setCount(count + 1)
            handleDots(count, leftLimit, rightLimit)
        }, 100)
        return () => clearInterval(dotsInterval)
    }, [rightLimit, leftLimit, count])

    function drawCurveLine(func, ctx, accuracy = 0.2) {
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.strokeStyle = "#fffff"
        let x = 0
        arrayValueOnSegment(func, 0, DPI_WIDTH, accuracy)
            .forEach(point => {
                ctx.lineTo(x, DPI_HEIGHT - point )
                x += accuracy
        });
        ctx.stroke()
    }

    function handleDots(count, leftLimit, rightLimit) {
        //todo: del count
        fetch(`http://localhost:8080/getDots?leftLimit=${leftLimit}&rightLimit=${rightLimit}&count=${count}`)
        .then(response => response.json())
        .then((data) => {
            dotsProcessering(data)
        })
    }
    

    function drawPoint(x,y,weight,height,color) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.beginPath()
        ctx.fillStyle = color ;
        ctx.fillRect(x,DPI_HEIGHT - y,weight,height)
        ctx.fill()
    }

    function dotsProcessering(dots) {
        Array.from(dots).forEach((dot) => {
            drawPoint(dot.x, dot.y, 10, 10, "black")
        })
    }

    function handleClickDot(evt) {
        const rect = canvasRef.current.getBoundingClientRect()
        let x = (evt.clientX - rect.left) * 2
        let y = DPI_HEIGHT - parseInt((evt.clientY - rect.top) * 2)
        drawPoint(x ,y , 15, 15, "red")
        fetch(`http://localhost:8080/saveDot`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                x: x,
                y: y,
                user: "max",
                result: null,
            })
        }).then(response => response.json()).then(data => props.handleTable(data))
    } 

    function handleFormDot(evt) {
        evt.preventDefault()
        const rect = canvasRef.current.getBoundingClientRect()
        let x = props.coordinatesFromForm[0]
        let y = props.coordinatesFromForm[1]
        drawPoint(x ,y , 15, 15, "red")
        fetch(`http://localhost:8080/saveDot`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: null,
                x: x,
                y: y,
                user: "max",
                result: null,
            })
        }).then(response => response.json()).then(data => props.handleTable(data))
    }
    
    let dot = {
        id: null,
        x: 123,
        y: 123,
        user: "max",
        result: null,
        date: new Date()
    }
    
    
    return (
        <div>
            <canvas
            onClick={(evt) => handleClickDot(evt)}
            id="graph" 
            ref={canvasRef}></canvas>
            <Slider
            className="leftLimit"
            min={0}
            max={1400}
            defaultValue={0}
            onChange={(evt) => {
                setLeftLimit(evt.target.value)
            }}
            label="Область прорисовки по X (все что левее - не прорисовываеться):"
            />
            <Slider
            className="rightLimit"
            min={0}
            max={1400}
            defaultValue={1400}
            onChange={(evt) => {
                setRightLimit(evt.target.value)
                
            }}
            label="Область прорисовки по X (все что правее - не прорисовываеться):"
            />
            <OutputForm 
                label={["Введите Х:", "Введите Y:"]}
                inputFuncs={props.inputFuncs}
                btnFunc={(evt) => handleFormDot(evt)}
                btnName={"submit"}
                />
            
        </div>
    )
    
}

export default CanvasGraph 