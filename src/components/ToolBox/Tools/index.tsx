import './Tools.css'
import {useContext} from 'react'
import ToolContext, {ToolOption} from '../../../context/ToolContext'

import { RiPencilFill,RiPaintFill } from 'react-icons/ri';

export default function Tools() {

    const {tool,setTool} = useContext(ToolContext)!

    return(
        <div className="Tools">
            <div 
            onClick={()=>{setTool(ToolOption.PENCIL)}}
            className={tool === ToolOption.PENCIL ? 'Tools-Container Tools-Selected' : 'Tools-Container'}>
                <RiPencilFill className='Tools-Tool'/>
            </div>
            <div
            onClick={()=>{setTool(ToolOption.FILL)}}
            className={tool === ToolOption.FILL ? 'Tools-Container Tools-Selected' : 'Tools-Container'}>
                <RiPaintFill className='Tools-Tool'/>
            </div>
        </div>
    )
}