import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import TextEditor from './components/text-editor';
//import CodeCell from './components/code-cell';
import { Provider } from 'react-redux';
import { store } from './states';
import CellList from './components/cell-list';

//for some reason this is super important for jsx syntax highlighting 
//why? I don't know really
import { Buffer } from 'buffer';
// @ts-expect-error ts does not know about it
window.Buffer = Buffer;

function App() {

  return (
    <Provider store={store}>
      <div>
        {/* <TextEditor />
        <CodeCell /> */}
        <CellList />
      </div>
    </Provider>
  )
}

export default App
