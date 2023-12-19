import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/code-cell';
import { Provider } from 'react-redux';
import { store } from './states';

//for some reason this is super important for jsx syntax highlighting 
//why? I don't know really
import { Buffer } from 'buffer';
import TextEditor from './components/text-editor';
// @ts-expect-error ts does not know about it
window.Buffer = Buffer;

function App() {

  return (
    <Provider store={store}>
      <div>
        <TextEditor />
        <CodeCell />
      </div>
    </Provider>
  )
}

export default App
