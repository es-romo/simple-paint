import './ToolBox.css'
import ColorPicker from './ColorPicker'
import Dimensions from './Dimensions'
import Tools from './Tools'

function ToolBox() {
    return(
        <div className='ToolBox'>
            <Tools/>
            <ColorPicker/>
            <Dimensions/>
        </div>
    )
}

export default ToolBox