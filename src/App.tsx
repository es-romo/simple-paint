import {useState} from 'react'
import {RGBColor} from 'react-color'
import ColorContext from './state/Color'
import Title from './components/Title'
import './App.css';

function App() {  

  const [color,setColor] = useState<RGBColor>({r:0,g:0,b:0,a:1})

  return (
    <div className="App">
      <Title/>
      <ColorContext.Provider value={{color, setColor}}>
      </ColorContext.Provider>
    </div>
  );
}

export default App;
