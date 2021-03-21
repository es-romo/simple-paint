import './Dimensions.css'
import {useContext} from 'react'
import DimensionsContext from '../../../state/Dimensions'

export default function Dimensions(){
    
    //Dimension constraints
    const minSize = 1

    //Context
    const ctxDimensions = useContext(DimensionsContext)
    const {dimensions,setDimensions} = ctxDimensions!

    //Event Handler
    function changeDimensions(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target
        let number = Math.floor(Number(value))
        if (number < minSize) {
            number = minSize
        }
        setDimensions({
            ...dimensions,
            [name]: number
        })
    }

    return(
        <div className="Dimensions">
            <input
                name='width'
                type='number'
                className='Dimensions-Input'
                value={dimensions.width}
                onChange={ e => {changeDimensions(e)}}/>
            
            <p className="Dimensions-Separator">x</p>
            
            <input
                name='height'
                type='number'
                className='Dimensions-Input'
                value={dimensions.height}
                onChange={ e => {changeDimensions(e)}}/>
        </div>
    )
}