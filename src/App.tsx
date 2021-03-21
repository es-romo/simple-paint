import {useState} from 'react'
import {RGBColor} from 'react-color'
import ColorContext from './state/Color'
import DimensionsContext, {IDimensions} from './state/Dimensions'
import Title from './components/Title'
import Board from './components/Board'
import ToolBox from './components/ToolBox'
import './App.css';

function App() {  

  const [color,setColor] = useState<RGBColor>({
    r:0,
    g:0,
    b:0,
    a:1
  })
  const [dimensions, setDimensions] = useState<IDimensions>({
    width: 20,
    height: 10 ,
    ratio: 50
  })

  return (
    <div className="App">
      <Title/>
      <ColorContext.Provider value={{color, setColor}}>
        <DimensionsContext.Provider value={{dimensions,setDimensions}}>
          <ToolBox/>
          <Board/>
        </DimensionsContext.Provider>
      </ColorContext.Provider>
    </div>
  );
}

export default App;
