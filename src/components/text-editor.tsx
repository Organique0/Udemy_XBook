import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import '../styles/text-editor.css';

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState('# Hello World');

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
                <MDEditor value={value} onChange={(v) => { setValue(v || '') }} />
                <button onClick={() => setEditing(false)}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
        )
    }

    return (
        <div onClick={() => setEditing(true)} className='text-editor card'>
            <div className="card-content">
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    )
}

export default TextEditor