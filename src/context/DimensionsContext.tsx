import {Dispatch, SetStateAction} from 'react'
import {createContext} from 'react'

export interface IDimensions {
    width: number,
    height: number,
    ratio: number
}

interface IDimensionsContext {
    dimensions: IDimensions,
    setDimensions: Dispatch<SetStateAction<IDimensions>>
}

export default createContext<IDimensionsContext | null>(null)