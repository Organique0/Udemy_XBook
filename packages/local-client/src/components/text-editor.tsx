import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import '../styles/text-editor.css';
import { Cell } from '../states';
import { useAction } from "./hooks/use-action";
interface TextCellProps {
    cell: Cell,
}

const TextEditor: React.FC<TextCellProps> = ({ cell }) => {
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const { updateCell } = useAction();

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (ref.current && e.target && ref.current.contains(e.target as Node)) {
                return;
            }
            setEditing(false);
        };
        document.addEventListener('click', listener, { capture: true });

        return () => {
            document.removeEventListener('click', listener, { capture: true });
        }

    }, []);


    if (editing) {
        return (
            <div ref={ref} className='text-editor'>
                <MDEditor value={cell.content} onChange={(v) => { updateCell(cell.id, v || '') }} />
                <button onClick={() => setEditing(false)}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
        )
    }

    return (
        <div onClick={() => setEditing(true)} className='text-editor card'>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click to edit'} />
            </div>
        </div>
    )
}

export default TextEditor