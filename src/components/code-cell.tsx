
import { useState, useEffect } from "react";
import CodeEditor from './code-editor';
import bundle from '../bundler';
import Resizable from "./resizable";
//for some reason this is super important for jsx syntax highlighting 
//why? why? why? why?
import { Buffer } from 'buffer';
import Preview from './preview';
// @ts-expect-error okokok
window.Buffer = Buffer;

function CodeCell() {
    const [input, setInput] = useState("");
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setErr(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [input]);

    //my solution for changing element on resizing
    //using css is probable a better idea. mine was a bit laggy at times
    //btw, the whole reason for that is the fact that we don't want our cursor ->
    //->to go into the iframe when resizing
    /*     const [resizing, setResizing] = useState(false);
    
        const handleResizing = (isResizing: boolean) => {
            setResizing(isResizing);
        }; */

    return (
        <Resizable direction='vertical' /* onResizing={handleResizing} */>
            <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                <Resizable direction='horizontal' >
                    <CodeEditor
                        initialValue={`const app = () => {
  return (
    <div>hello</div>
    )
  }`}
                        onChange={(value) => setInput(value)} />
                </Resizable>
                {/* {!resizing ? <Preview code={code} /> : <div>hello</div>} */}
                {<Preview code={code} bundleError={err} />}
            </div>
        </Resizable>
    )
}

export default CodeCell;
