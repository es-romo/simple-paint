import {Dispatch, SetStateAction} from 'react'
import {createContext} from 'react'

export enum ToolOption {
    PENCIL,
    FILL
}

interface IToolContext {
    tool: ToolOption,
    setTool: Dispatch<SetStateAction<ToolOption>>
}

export default createContext<IToolContext | null>(null)