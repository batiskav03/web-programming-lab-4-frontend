import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

import CanvasGraph from './components/CanvasGraph'
import Footer from './components/Footer'
import OutputForm from './components/OutputForm' 
import OutputTable from './components/OutputTable'

export default function App(props) {
    //todo: перенести в отдельный файл и тащить константу от туда
    const dot = {
        x: "x",
        y: "y",
        user: "Пользователь",
        result: "Результат",
        date: "Дата"
    }
    const [tableData, setTableData] = useState([dot])
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    function handleX(evt) {
        setX(evt.target.value)
    }

    function handleY(evt) {
        setY(evt.target.value)
    }
    

    function handleTable(dot) {
        delete dot.id
        setTableData(tableData.concat(dot))
    }

    function handleTableByButton(evt) {
        evt.preventDefault()
        console.log(evt)
        setTableData(tableData.concat({id: null,
            x: x,
            y: y,
            user: null,
            result: null,}))
        
    }
    return (
        <div>
            <Footer 
            name="Калабухов Максим"
            group="P32131"
            task="Вариант 44526" />
            <div>
                <CanvasGraph 
                coordinatesFromForm={[x,y]}
                handleTable={handleTable}
                inputFuncs={[handleX, handleY]}
                btnFunc={handleTableByButton}
                />
                
            </div>
            <OutputTable 
            data={tableData}
            />
        </div>
    )
    
}
