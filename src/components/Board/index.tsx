import './Board.css'
import Canvas from './Canvas'
import {useRef, useEffect, useState, useContext} from 'react'
import ColorContext from '../../context/ColorContext'
import DimensionsContext from '../../context/DimensionsContext'
import ToolContext, {ToolOption} from '../../context/ToolContext'

export default function Board() {
    
    //Context
    const color = useContext(ColorContext)!.color
    const dimensions = useContext(DimensionsContext)!.dimensions
    const tool = useContext(ToolContext)!.tool
    
    //Hooks
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [board, setBoard] = useState<Canvas | null>(null)
    
    useEffect(() => {
        setBoard(new Canvas(canvasRef))
    }, [])

    useEffect(() => {
        if (board){
            board.init(dimensions.width,dimensions.height, dimensions.ratio)
        }
    },[board,dimensions.width,dimensions.height,dimensions.ratio])

    //Event Handlers
    function handleCLick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>){
        const {x, y} = getPixelOrigin(e.pageX, e.pageY)
        switch (tool) {
            case ToolOption.PENCIL:
                board!.drawPixel(x,y,color)
                break;
            case ToolOption.FILL:
                board!.fill(x,y,color)
                break;
        }
    }
    //Helper functions
    function getPixelOrigin(x: number,y: number){
        const canvas = canvasRef.current!
        const rect = canvas.getBoundingClientRect()
        const left = rect.left + window.scrollX;
        const top = rect.top + window.scrollY;
        const right = rect.right  + window.scrollX;
        const bottom = rect.bottom + window.scrollY;
    
        const originX = Math.trunc(((x - left) / (right - left) * canvas.width) / dimensions.ratio) * dimensions.ratio
        const originY = Math.trunc(((y - top) / (bottom - top) * canvas.height) / dimensions.ratio) * dimensions.ratio
        return {
            x: originX,
            y: originY
        }
    }

    return(
        <div className='board'>
            <canvas 
                ref={canvasRef}
                onClick={ e => handleCLick(e)}
            >    
            </canvas>
        </div>
    )
}