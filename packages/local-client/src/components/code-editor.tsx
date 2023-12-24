import MonacoEditor, { OnMount, BeforeMount } from '@monaco-editor/react';
import prettier from 'prettier';
import CustomTheme from '../../CustomTheme';
import parser from 'prettier/parser-babel';
import { useEffect, useRef } from 'react';
import '../styles/code-editor.css';
import { emmetJSX } from 'emmet-monaco-es';
import { editor } from 'monaco-editor';
import '../styles/syntax.css';
//import * as monaco from 'monaco-editor';

/* import Hightlighter from 'monaco-jsx-highlighter';
import codeShift from 'jscodeshift'; 
declare module 'monaco-jsx-highlighter';*/

interface CodeEditorProps {
    initialValue: string,
    onChange: (value: string) => void,
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();
    const disposeEmmetJSXRef = useRef<any>(); //The editor supports Emmet

    //some code from : https://tlockcuff.dev/articles/vs-code-in-the-browser-with-jsx-and-types
    const activateMonacoJSXHighlighter = async (monacoEditor: editor.IStandaloneCodeEditor, monaco: typeof import("monaco-editor")) => {
        const { default: traverse } = await import('@babel/traverse')
        const { parse } = await import('@babel/parser')
        const { default: MonacoJSXHighlighter } = await import(
            'monaco-jsx-highlighter'
        )

        const monacoJSXHighlighter = new MonacoJSXHighlighter(
            monaco,
            parse,
            traverse,
            monacoEditor
        )

        monacoJSXHighlighter.highlightOnDidChangeModelContent();
        monacoJSXHighlighter.addJSXCommentCommand();
        //JSXTypes.JSXText.options.inlineClassName = "JSXText";
        //JSXTypes.JSXBracket.options.inlineClassName = "JSXBracket";
        //JSXTypes.JSXIdentifier.options.inlineClassName = "JSXIdentifier2";

        return {
            monacoJSXHighlighter,
        }
    }

    const onEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue())
        });
        //how to set theme:
        //monaco.editor.setTheme('myCustomTheme');

        //could not resolve 'lodash' in jscodeshift
        /*  const highlighter = new Hightlighter(
             window.monaco,
             codeShift,
             editor
         );
         highlighter.highLightOnDidChangeModelContent(); */

        //error: Buffer is not defined (fixed)
        activateMonacoJSXHighlighter(editor, monaco)
    };

    const handleEditorWillMount: BeforeMount = (monaco) => {
        disposeEmmetJSXRef.current = emmetJSX(monaco);
        //I have found some colors from my vs-code theme (ayu-dark)
        monaco.editor.defineTheme('myCustomTheme', CustomTheme);
    }

    useEffect(() => {
        return () => {
            disposeEmmetJSXRef.current ? disposeEmmetJSXRef.current() : null;
        };
    }, []);

    const onFormatClicked = () => {
        //CodeWhisperer said this works also, but it gives you no controll
        //editorRef.current.getAction('editor.action.formatDocument').run();

        const unformatted = editorRef.current.getModel().getValue();
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true,
        }).replace(/\n$/, '');

        editorRef.current.setValue(formatted);
    }

    return (
        <div className='editor-wrapper'>
            <button onClick={onFormatClicked} className='button button-format is-primary is-small'>format</button>
            <MonacoEditor
                onMount={onEditorDidMount}
                beforeMount={handleEditorWillMount}
                value={initialValue}
                height="100%"
                language='javascript'
                theme={'myCustomTheme'}
                loading="hello, wait just a second..."
                options={{
                    fontLigatures: true,
                    fontFamily: 'Fira Code',
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 2,
                    tabSize: 2,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    tabCompletion: 'on',
                    automaticLayout: true,
                    bracketPairColorization: {
                        enabled: true,
                        independentColorPoolPerBracketType: true,
                    },
                    trimAutoWhitespace: true,
                }}
            />
        </div>
    )

}

export default CodeEditor