import {Dispatch, SetStateAction} from 'react'
import {createContext} from 'react'
import { RGBColor } from 'react-color'
 
export interface IColorContext {
    color: RGBColor,
    setColor: Dispatch<SetStateAction<RGBColor>>
}

export default createContext<IColorContext | null>(null)