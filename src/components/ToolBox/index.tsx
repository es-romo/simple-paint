import './ToolBox.css'
import ColorPicker from './ColorPicker'
import Dimensions from './Dimensions'

function ToolBox() {
    return(
        <div className='ToolBox'>
            <ColorPicker/>
            <Dimensions/>
        </div>
    )
}

export default ToolBox