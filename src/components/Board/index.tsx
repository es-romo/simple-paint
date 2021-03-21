import {useRef, useEffect, useState} from 'react'
import { RGBColor } from 'react-color'
import Canvas from './Canvas'
import './Board.css'

export default function Board() {
    
    //Temp variables
    const canvasHeight = 12
    const canvasWidth = 20
    const canvasRatio = 50
    const fillColor:RGBColor = {
        r: 128,
        g: 0,
        b: 0,
        a: 1
    }
    
    //Hook
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [board, setBoard] = useState<Canvas | null>(null)
    
    useEffect(() => {
        setBoard(new Canvas(canvasRef))
    }, [])

    useEffect(() => {
        if (board){
            board.init(canvasWidth,canvasHeight, canvasRatio)
        }
    },[board,canvasWidth,canvasHeight])

    //Event Handlers
    function handleLeftClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>){
        const {x, y} = getPixelOrigin(e.pageX, e.pageY)
        board!.drawPixel(x,y,fillColor)
    }

    function handleRightClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>){
        e.preventDefault()
        const {x, y} = getPixelOrigin(e.pageX, e.pageY)
        console.log({x,y})
        board?.fill(x,y,fillColor)
    }

    //Helper functions
    function getPixelOrigin(x: number,y: number){
        const canvas = canvasRef.current!
        const rect = canvas.getBoundingClientRect()
        const left = rect.left + window.scrollX;
        const top = rect.top + window.scrollY;
        const right = rect.right  + window.scrollX;
        const bottom = rect.bottom + window.scrollY;
    
        const originX = Math.trunc(((x - left) / (right - left) * canvas.width) / canvasRatio) * canvasRatio
        const originY = Math.trunc(((y - top) / (bottom - top) * canvas.height) / canvasRatio) * canvasRatio
        return {
            x: originX,
            y: originY
        }
    }

    return(
        <div className='board'>
            <canvas 
                ref={canvasRef}
                onClick={ e => handleLeftClick(e)}
                onContextMenu={ e => handleRightClick(e) }
            >    
            </canvas>
        </div>
    )
}