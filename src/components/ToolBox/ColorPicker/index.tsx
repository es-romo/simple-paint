import {useContext} from 'react'
import ColorContext from '../../../state/Color'
import { TwitterPicker} from 'react-color'
import './ColorPicker.css'

const presets = ['#000000','#EB144C','#FCB900','#0693E3','#00D084']

function ColorPicker(){
  const ctxColor = useContext(ColorContext)
    return(
        <TwitterPicker
        color={ctxColor?.color}
        colors={presets}
        triangle='hide'
        width='356px'
        onChange={color => ctxColor?.setColor(color.rgb)}
      />
    )
}

export default ColorPicker