
import { useState } from "react";
import CodeEditor from './code-editor';
import bundle from '../bundler';
//for some reason this is super important for jsx syntax highlighting 
//why? why? why? why?
import { Buffer } from 'buffer';
import Preview from './preview';
// @ts-expect-error okokok
window.Buffer = Buffer;

function CodeCell() {
    const [input, setInput] = useState("");
    const [code, setCode] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    }

    return (
        <div>
            <CodeEditor
                initialValue={`const app = () => { 
  return (
    <div>hello</div>
    )
  }`}
                onChange={(value) => setInput(value)} />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    )
}

export default CodeCell;
