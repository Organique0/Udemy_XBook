
import { useEffect } from "react";
import CodeEditor from './code-editor';
import Resizable from "./resizable";

import { Buffer } from 'buffer';
import Preview from './preview';
import { Cell } from "../states";
import { useAction } from "./hooks/use-action";
import { useTypedSelector } from "./hooks/use-typed-selector";
import '../styles/code-cell.css';
import { useCumulativeCode } from "./hooks/use-cumulative-code";

//important for jsx syntax highlighting
window.Buffer = Buffer;

interface CodeCellProps {
    cell: Cell,
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useAction();
    const bundle = useTypedSelector(state => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id)

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode);
            return;
        }
        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cumulativeCode, cell.id, createBundle]);

    //my solution for changing element on resizing
    //using css is probable a better idea. mine was a bit laggy at times
    //btw, the whole reason for this is the fact that we don't want our cursor ->
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
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)} />
                </Resizable>
                {/* {!resizing ? <Preview code={code} /> : <div>hello</div>} */}
                <div className="progress-wrapper">
                    {!bundle || bundle.loading ? (
                        <div className="progress-cover">
                            <progress className="progress is-small is-primary" max="100">Loading</progress>
                        </div>
                    ) : <Preview code={bundle.code} bundleError={bundle.err} />}
                </div>
            </div>
        </Resizable>
    )
}

export default CodeCell;
