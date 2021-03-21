import './Tools.css'
import {useContext} from 'react'
import ToolContext, {ToolOption} from '../../../state/Tool'

import { RiPencilFill,RiPaintFill } from 'react-icons/ri';

export default function Tools() {

    const {tool,setTool} = useContext(ToolContext)!

    return(
        <div className="Tools">
            <div 
                className={tool === ToolOption.PENCIL ? 'Tools-Container Tools-Selected' : 'Tools-Container'}>
                <RiPencilFill
                    className='Tools-Tool'
                    onClick={()=>{setTool(ToolOption.PENCIL)}}/>
            </div>
            <div 
                className={tool === ToolOption.FILL ? 'Tools-Container Tools-Selected' : 'Tools-Container'}>
                <RiPaintFill
                    className='Tools-Tool'
                    onClick={()=>{setTool(ToolOption.FILL)}}/>
            </div>
        </div>
    )
}