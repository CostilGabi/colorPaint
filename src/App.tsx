import { useEffect, useState } from 'react'
import Canvas from './Canvas'
import { ReactComponent as Delete } from './assets/delete.svg'

function App() {

    const [deleteMode, setDeleteMode] = useState(false)
    const [numWidth, setNumWidth] = useState(2)
    const [shadoWidth, setShadoWidth] = useState(15)
    const [shadowColor, setShadowColor] = useState('yellow')
    const [lineColor, setLineColor] = useState('white')

    const handleDeleteMode = () => {
        setDeleteMode( (prevDeleteMode) => !prevDeleteMode )        
    }

    const handleNumWidthPlus = () => {
        setNumWidth( numWidth + 1 )
    }

    const handleNumWidthMinus= () => {
        
        if ( numWidth != 1 ) {
            setNumWidth( numWidth - 1 )
        }
    }

    const handleShadoWidthPlus = () => {
        setShadoWidth( shadoWidth + 2 )
    }

    const handleShadoWidthMinus= () => {
        
        if ( shadoWidth != 1 ) {
            setShadoWidth( shadoWidth - 2 )
        }
    }

    const handleShadowColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShadowColor( event.target.value )
    }

    const handleLineColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLineColor( event.target.value )
    }

    const shadowColorStyle = {
        backgroundColor: shadowColor,
        width: '20px',
        height: '20px',
        borderRadius: '50%'
    }

    const lineColorStyle = {
        backgroundColor: lineColor,
        width: '20px',
        height: '20px',
        borderRadius: '50%'
    }

    useEffect(() => {
        setDeleteMode(false)
    }, [deleteMode])

    return (

        <div className='colorpaint'>

            <div className='colorpaint-main'>

                <div className='colorpaint-main-controls'>
                
                    <div className='colorpaint-main-controls-width'>

                        <span>Line width</span>
                        <input type='text' readOnly value={numWidth} />

                        <div className='colorpaint-main-controls-width-c'>

                            <button onClick={handleNumWidthMinus}>-</button>
                            <button onClick={handleNumWidthPlus}>+</button>

                        </div>

                    </div>

                    <div className='colorpaint-main-controls-width'>

                        <span>Shadow width</span>
                        <input type='text' readOnly value={shadoWidth} />

                        <div className='colorpaint-main-controls-width-c'>

                            <button onClick={handleShadoWidthMinus}>-</button>
                            <button onClick={handleShadoWidthPlus}>+</button>

                        </div>

                    </div>

                    <div className='colorpaint-main-controls-color'>

                        <span>Shadow Color (hex or name) </span>
                        <input type='text' value={shadowColor} onChange={handleShadowColor} />

                        <div className='colorpaint-main-controls-sc-bubble' style={shadowColorStyle}></div>

                    </div>

                    <div className='colorpaint-main-controls-color'>

                        <span>Line Color (hex or name) </span>
                        <input type='text' value={lineColor} onChange={handleLineColor} />

                        <div className='colorpaint-main-controls-sc-bubble' style={lineColorStyle}></div>

                    </div>

                    <button onClick={handleDeleteMode} type='button' className='colorpaint-main-controls-delete'>

                        <Delete />
                        <span>Erase</span>

                    </button>

                </div>

                <div className='colorpaint-main-board'>

                    <Canvas thickMode={numWidth} shadowMode={shadoWidth} shadowColor={shadowColor} lineColor={lineColor} deleteMode={deleteMode} />

                </div>

            </div>

        </div>
    )
}

export default App
