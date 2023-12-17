import MonacoEditor, { useMonaco, loader, OnMount, BeforeMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useEffect, useRef } from 'react';
import './code-editor.css';
import { emmetJSX } from 'emmet-monaco-es';
import { editor } from 'monaco-editor';
import './syntax.css';
//import * as monaco from 'monaco-editor';

/* import Hightlighter from 'monaco-jsx-highlighter';
import codeShift from 'jscodeshift'; 
declare module 'monaco-jsx-highlighter';*/

interface CodeEditorProps {
    initialValue: string,
    onChange: (value: string) => void,
}

import { JSXTypes } from 'monaco-jsx-highlighter';

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
        monaco.editor.defineTheme('myCustomTheme', {
            "base": "vs-dark",
            "inherit": true,
            "rules": [],
            "colors": {
                "focusBorder": "#ffcc66b3",
                "foreground": "#707a8c",
                "widget.shadow": "#12151cb3",
                "selection.background": "#409fff40",
                "icon.foreground": "#707a8c",
                "errorForeground": "#ff6666",
                "descriptionForeground": "#707a8c",
                "textBlockQuote.background": "#1c212b",
                "textLink.foreground": "#ffcc66",
                "textLink.activeForeground": "#ffcc66",
                "textPreformat.foreground": "#cccac2",
                "button.background": "#ffcc66",
                "button.foreground": "#1f2430",
                "button.hoverBackground": "#fac761",
                "button.secondaryBackground": "#707a8c33",
                "button.secondaryForeground": "#cccac2",
                "button.secondaryHoverBackground": "#707a8c80",
                "dropdown.background": "#242936",
                "dropdown.foreground": "#707a8c",
                "dropdown.border": "#707a8c45",
                "input.background": "#242936",
                "input.border": "#707a8c45",
                "input.foreground": "#cccac2",
                "input.placeholderForeground": "#707a8c80",
                "inputOption.activeBorder": "#ffcc664d",
                "inputOption.activeBackground": "#ffcc6633",
                "inputOption.activeForeground": "#ffcc66",
                "inputValidation.errorBackground": "#242936",
                "inputValidation.errorBorder": "#ff6666",
                "inputValidation.infoBackground": "#1f2430",
                "inputValidation.infoBorder": "#5ccfe6",
                "inputValidation.warningBackground": "#1f2430",
                "inputValidation.warningBorder": "#ffd173",
                "scrollbar.shadow": "#171b2400",
                "scrollbarSlider.background": "#707a8c66",
                "scrollbarSlider.hoverBackground": "#707a8c99",
                "scrollbarSlider.activeBackground": "#707a8cb3",
                "badge.background": "#ffcc6633",
                "badge.foreground": "#ffcc66",
                "progressBar.background": "#ffcc66",
                "list.activeSelectionBackground": "#63759926",
                "list.activeSelectionForeground": "#cccac2",
                "list.focusBackground": "#63759926",
                "list.focusForeground": "#cccac2",
                "list.focusOutline": "#63759926",
                "list.highlightForeground": "#ffcc66",
                "list.deemphasizedForeground": "#ff6666",
                "list.hoverBackground": "#63759926",
                "list.inactiveSelectionBackground": "#69758c1f",
                "list.inactiveSelectionForeground": "#707a8c",
                "list.invalidItemForeground": "#707a8c4d",
                "list.errorForeground": "#ff6666",
                "tree.indentGuidesStroke": "#8a919959",
                "listFilterWidget.background": "#1c212b",
                "listFilterWidget.outline": "#ffcc66",
                "listFilterWidget.noMatchesOutline": "#ff6666",
                "list.filterMatchBackground": "#5c467266",
                "list.filterMatchBorder": "#69538066",
                "activityBar.background": "#1f2430",
                "activityBar.foreground": "#707a8ccc",
                "activityBar.inactiveForeground": "#707a8c99",
                "activityBar.border": "#1f2430",
                "activityBar.activeBorder": "#ffcc66b3",
                "activityBarBadge.background": "#ffcc66",
                "activityBarBadge.foreground": "#1f2430",
                "sideBar.background": "#1f2430",
                "sideBar.border": "#1f2430",
                "sideBarTitle.foreground": "#707a8c",
                "sideBarSectionHeader.background": "#1f2430",
                "sideBarSectionHeader.foreground": "#707a8c",
                "sideBarSectionHeader.border": "#1f2430",
                "minimap.background": "#1f2430",
                "minimap.selectionHighlight": "#409fff40",
                "minimap.errorHighlight": "#ff6666",
                "minimap.findMatchHighlight": "#695380",
                "minimapGutter.addedBackground": "#87d96c",
                "minimapGutter.modifiedBackground": "#80bfff",
                "minimapGutter.deletedBackground": "#f27983",
                "editorGroup.border": "#171b24",
                "editorGroup.background": "#1c212b",
                "editorGroupHeader.noTabsBackground": "#1f2430",
                "editorGroupHeader.tabsBackground": "#1f2430",
                "editorGroupHeader.tabsBorder": "#1f2430",
                "tab.activeBackground": "#1f2430",
                "tab.activeForeground": "#cccac2",
                "tab.border": "#1f2430",
                "tab.activeBorder": "#ffcc66",
                "tab.unfocusedActiveBorder": "#707a8c",
                "tab.inactiveBackground": "#1f2430",
                "tab.inactiveForeground": "#707a8c",
                "tab.unfocusedActiveForeground": "#707a8c",
                "tab.unfocusedInactiveForeground": "#707a8c",
                "editor.background": "#1f2430",
                "editor.foreground": "#cccac2",
                "editorLineNumber.foreground": "#8a919966",
                "editorLineNumber.activeForeground": "#8a9199cc",
                "editorCursor.foreground": "#ffcc66",
                "editor.inactiveSelectionBackground": "#409fff21",
                "editor.selectionBackground": "#409fff40",
                "editor.selectionHighlightBackground": "#87d96c26",
                "editor.selectionHighlightBorder": "#87d96c00",
                "editor.wordHighlightBackground": "#80bfff14",
                "editor.wordHighlightStrongBackground": "#87d96c14",
                "editor.wordHighlightBorder": "#80bfff80",
                "editor.wordHighlightStrongBorder": "#87d96c80",
                "editor.findMatchBackground": "#695380",
                "editor.findMatchBorder": "#695380",
                "editor.findMatchHighlightBackground": "#69538066",
                "editor.findMatchHighlightBorder": "#5c467266",
                "editor.findRangeHighlightBackground": "#69538040",
                "editor.rangeHighlightBackground": "#69538033",
                "editor.lineHighlightBackground": "#1a1f29",
                "editorLink.activeForeground": "#ffcc66",
                "editorWhitespace.foreground": "#8a919966",
                "editorIndentGuide.background": "#8a91992e",
                "editorIndentGuide.activeBackground": "#8a919959",
                "editorRuler.foreground": "#8a91992e",
                "editorCodeLens.foreground": "#b8cfe680",
                "editorBracketMatch.background": "#8a91994d",
                "editorBracketMatch.border": "#8a91994d",
                "editor.snippetTabstopHighlightBackground": "#87d96c33",
                "editorOverviewRuler.border": "#171b24",
                "editorOverviewRuler.modifiedForeground": "#80bfff",
                "editorOverviewRuler.addedForeground": "#87d96c",
                "editorOverviewRuler.deletedForeground": "#f27983",
                "editorOverviewRuler.errorForeground": "#ff6666",
                "editorOverviewRuler.warningForeground": "#ffcc66",
                "editorOverviewRuler.bracketMatchForeground": "#8a9199b3",
                "editorOverviewRuler.wordHighlightForeground": "#80bfff66",
                "editorOverviewRuler.wordHighlightStrongForeground": "#87d96c66",
                "editorOverviewRuler.findMatchForeground": "#695380",
                "editorError.foreground": "#ff6666",
                "editorWarning.foreground": "#ffcc66",
                "editorGutter.modifiedBackground": "#80bfffcc",
                "editorGutter.addedBackground": "#87d96ccc",
                "editorGutter.deletedBackground": "#f27983cc",
                "diffEditor.insertedTextBackground": "#87d96c1f",
                "diffEditor.removedTextBackground": "#f279831f",
                "diffEditor.diagonalFill": "#171b24",
                "editorWidget.background": "#1c212b",
                "editorWidget.border": "#171b24",
                "editorHoverWidget.background": "#1c212b",
                "editorHoverWidget.border": "#171b24",
                "editorSuggestWidget.background": "#1c212b",
                "editorSuggestWidget.border": "#171b24",
                "editorSuggestWidget.highlightForeground": "#ffcc66",
                "editorSuggestWidget.selectedBackground": "#63759926",
                "debugExceptionWidget.border": "#171b24",
                "debugExceptionWidget.background": "#1c212b",
                "editorMarkerNavigation.background": "#1c212b",
                "peekView.border": "#63759926",
                "peekViewTitle.background": "#63759926",
                "peekViewTitleDescription.foreground": "#707a8c",
                "peekViewTitleLabel.foreground": "#cccac2",
                "peekViewEditor.background": "#1c212b",
                "peekViewEditor.matchHighlightBackground": "#69538066",
                "peekViewEditor.matchHighlightBorder": "#5c467266",
                "peekViewResult.background": "#1c212b",
                "peekViewResult.fileForeground": "#cccac2",
                "peekViewResult.lineForeground": "#707a8c",
                "peekViewResult.matchHighlightBackground": "#69538066",
                "peekViewResult.selectionBackground": "#63759926",
                "panel.background": "#1f2430",
                "panel.border": "#171b24",
                "panelTitle.activeBorder": "#ffcc66",
                "panelTitle.activeForeground": "#cccac2",
                "panelTitle.inactiveForeground": "#707a8c",
                "statusBar.background": "#1f2430",
                "statusBar.foreground": "#707a8c",
                "statusBar.border": "#1f2430",
                "statusBar.debuggingBackground": "#f29e74",
                "statusBar.debuggingForeground": "#242936",
                "statusBar.noFolderBackground": "#1c212b",
                "statusBarItem.activeBackground": "#707a8c33",
                "statusBarItem.hoverBackground": "#707a8c33",
                "statusBarItem.prominentBackground": "#171b24",
                "statusBarItem.prominentHoverBackground": "#00000030",
                "statusBarItem.remoteBackground": "#ffcc66",
                "statusBarItem.remoteForeground": "#242936",
                "titleBar.activeBackground": "#1f2430",
                "titleBar.activeForeground": "#cccac2",
                "titleBar.inactiveBackground": "#1f2430",
                "titleBar.inactiveForeground": "#707a8c",
                "titleBar.border": "#1f2430",
                "extensionButton.prominentForeground": "#242936",
                "extensionButton.prominentBackground": "#ffcc66",
                "extensionButton.prominentHoverBackground": "#fac761",
                "pickerGroup.border": "#171b24",
                "pickerGroup.foreground": "#707a8c80",
                "debugToolBar.background": "#1c212b",
                "debugIcon.breakpointForeground": "#f29e74",
                "debugIcon.breakpointDisabledForeground": "#f29e7480",
                "debugConsoleInputIcon.foreground": "#ffcc66",
                "welcomePage.tileBackground": "#1f2430",
                "welcomePage.tileShadow": "#12151cb3",
                "welcomePage.progress.background": "#1a1f29",
                "welcomePage.buttonBackground": "#ffcc6666",
                "walkThrough.embeddedEditorBackground": "#1c212b",
                "gitDecoration.modifiedResourceForeground": "#80bfffb3",
                "gitDecoration.deletedResourceForeground": "#f27983b3",
                "gitDecoration.untrackedResourceForeground": "#87d96cb3",
                "gitDecoration.ignoredResourceForeground": "#707a8c80",
                "gitDecoration.conflictingResourceForeground": "",
                "gitDecoration.submoduleResourceForeground": "#dfbfffb3",
                "settings.headerForeground": "#cccac2",
                "settings.modifiedItemIndicator": "#80bfff",
                "keybindingLabel.background": "#707a8c1a",
                "keybindingLabel.foreground": "#cccac2",
                "keybindingLabel.border": "#cccac21a",
                "keybindingLabel.bottomBorder": "#cccac21a",
                "terminal.background": "#1f2430",
                "terminal.foreground": "#cccac2",
                "terminal.ansiBlack": "#171b24",
                "terminal.ansiRed": "#ed8274",
                "terminal.ansiGreen": "#87d96c",
                "terminal.ansiYellow": "#facc6e",
                "terminal.ansiBlue": "#6dcbfa",
                "terminal.ansiMagenta": "#dabafa",
                "terminal.ansiCyan": "#90e1c6",
                "terminal.ansiWhite": "#c7c7c7",
                "terminal.ansiBrightBlack": "#686868",
                "terminal.ansiBrightRed": "#f28779",
                "terminal.ansiBrightGreen": "#d5ff80",
                "terminal.ansiBrightYellow": "#ffd173",
                "terminal.ansiBrightBlue": "#73d0ff",
                "terminal.ansiBrightMagenta": "#dfbfff",
                "terminal.ansiBrightCyan": "#95e6cb",
                "terminal.ansiBrightWhite": "#ffffff"
            },

        });
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
                height="500px"
                language='javascript'
                theme={'myCustomTheme'}
                loading="hello, wait just a second..."
                options={{
                    fontLigatures: true,
                    fontFamily: 'Fira Code', //nope
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