import {useState} from 'react'
import {RGBColor} from 'react-color'
import ToolContext, {ToolOption} from './context/ToolContext'
import ColorContext from './context/ColorContext'
import DimensionsContext, {IDimensions} from './context/DimensionsContext'
import Title from './components/Title'
import Board from './components/Board'
import ToolBox from './components/ToolBox'
import './App.css';

function App() {  

  const [tool,setTool] = useState<ToolOption>(ToolOption.PENCIL)
  const [color,setColor] = useState<RGBColor>({
    r:0,
    g:0,
    b:0,
    a:1
  })
  const [dimensions, setDimensions] = useState<IDimensions>({
    width: 35,
    height: 25,
    ratio: 30
  })

  return (
    <div className="App">
      <Title/>
      <ColorContext.Provider value={{color, setColor}}>
        <ToolContext.Provider value={{tool,setTool}}>
          <DimensionsContext.Provider value={{dimensions,setDimensions}}>
            <ToolBox/>
            <Board/>
          </DimensionsContext.Provider>
        </ToolContext.Provider>
      </ColorContext.Provider>
    </div>
  );
}

export default App;
