import {Dispatch, SetStateAction} from 'react'
import {createContext} from 'react'
import { RGBColor } from 'react-color'
 
export interface IColorContext {
    color: RGBColor,
    setColor: Dispatch<SetStateAction<RGBColor>>
}

const ColorContext = createContext<IColorContext | null>(null)
export default  ColorContext
