import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/code-cell';

//for some reason this is super important for jsx syntax highlighting 
//why? I don't know really
import { Buffer } from 'buffer';
// @ts-expect-error ts does not know about it
window.Buffer = Buffer;

function App() {

  return (
    <div>
      <CodeCell />
    </div>
  )
}

export default App
