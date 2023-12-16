import MonacoEditor, { useMonaco, loader, OnMount, BeforeMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useEffect, useRef } from 'react';
import './code-editor.css';
import { emmetJSX } from 'emmet-monaco-es';
//import * as monaco from 'monaco-editor';

interface CodeEditorProps {
    initialValue: string,
    onChange: (value: string) => void,
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();
    const disposeEmmetJSXRef = useRef<any>();

    const onEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue())
        });
        //monaco.editor.setTheme('myCustomTheme');
    };

    const handleEditorWillMount: BeforeMount = (monaco) => {
        // here is the monaco instance
        // do something before editor is mounted
        disposeEmmetJSXRef.current = emmetJSX(monaco);
        monaco.editor.defineTheme('myCustomTheme', {
            "base": "vs-dark",
            "inherit": true,
            "rules": [],
            "colors": {
                "focusBorder": "#e6b450b3",
                "foreground": "#565b66",
                "widget.shadow": "#00000080",
                "selection.background": "#409fff4d",
                "icon.foreground": "#565b66",
                "errorForeground": "#d95757",
                "descriptionForeground": "#565b66",
                "textBlockQuote.background": "#0f131a",
                "textLink.foreground": "#e6b450",
                "textLink.activeForeground": "#e6b450",
                "textPreformat.foreground": "#bfbdb6",
                "button.background": "#e6b450",
                "button.foreground": "#0b0e14",
                "button.hoverBackground": "#e1af4b",
                "button.secondaryBackground": "#565b6633",
                "button.secondaryForeground": "#bfbdb6",
                "button.secondaryHoverBackground": "#565b6680",
                "dropdown.background": "#0d1017",
                "dropdown.foreground": "#565b66",
                "dropdown.border": "#565b6645",
                "input.background": "#0d1017",
                "input.border": "#565b6645",
                "input.foreground": "#bfbdb6",
                "input.placeholderForeground": "#565b6680",
                "inputOption.activeBorder": "#e6b4504d",
                "inputOption.activeBackground": "#e6b45033",
                "inputOption.activeForeground": "#e6b450",
                "inputValidation.errorBackground": "#0d1017",
                "inputValidation.errorBorder": "#d95757",
                "inputValidation.infoBackground": "#0b0e14",
                "inputValidation.infoBorder": "#39bae6",
                "inputValidation.warningBackground": "#0b0e14",
                "inputValidation.warningBorder": "#ffb454",
                "scrollbar.shadow": "#11151c00",
                "scrollbarSlider.background": "#565b6666",
                "scrollbarSlider.hoverBackground": "#565b6699",
                "scrollbarSlider.activeBackground": "#565b66b3",
                "badge.background": "#e6b45033",
                "badge.foreground": "#e6b450",
                "progressBar.background": "#e6b450",
                "list.activeSelectionBackground": "#47526640",
                "list.activeSelectionForeground": "#bfbdb6",
                "list.focusBackground": "#47526640",
                "list.focusForeground": "#bfbdb6",
                "list.focusOutline": "#47526640",
                "list.highlightForeground": "#e6b450",
                "list.deemphasizedForeground": "#d95757",
                "list.hoverBackground": "#47526640",
                "list.inactiveSelectionBackground": "#47526633",
                "list.inactiveSelectionForeground": "#565b66",
                "list.invalidItemForeground": "#565b664d",
                "list.errorForeground": "#d95757",
                "tree.indentGuidesStroke": "#6c738080",
                "listFilterWidget.background": "#0f131a",
                "listFilterWidget.outline": "#e6b450",
                "listFilterWidget.noMatchesOutline": "#d95757",
                "list.filterMatchBackground": "#5f4c7266",
                "list.filterMatchBorder": "#6c598066",
                "activityBar.background": "#0b0e14",
                "activityBar.foreground": "#565b66cc",
                "activityBar.inactiveForeground": "#565b6699",
                "activityBar.border": "#0b0e14",
                "activityBar.activeBorder": "#e6b450b3",
                "activityBarBadge.background": "#e6b450",
                "activityBarBadge.foreground": "#0b0e14",
                "sideBar.background": "#0b0e14",
                "sideBar.border": "#0b0e14",
                "sideBarTitle.foreground": "#565b66",
                "sideBarSectionHeader.background": "#0b0e14",
                "sideBarSectionHeader.foreground": "#565b66",
                "sideBarSectionHeader.border": "#0b0e14",
                "minimap.background": "#0b0e14",
                "minimap.selectionHighlight": "#409fff4d",
                "minimap.errorHighlight": "#d95757",
                "minimap.findMatchHighlight": "#6c5980",
                "minimapGutter.addedBackground": "#7fd962",
                "minimapGutter.modifiedBackground": "#73b8ff",
                "minimapGutter.deletedBackground": "#f26d78",
                "editorGroup.border": "#11151c",
                "editorGroup.background": "#0f131a",
                "editorGroupHeader.noTabsBackground": "#0b0e14",
                "editorGroupHeader.tabsBackground": "#0b0e14",
                "editorGroupHeader.tabsBorder": "#0b0e14",
                "tab.activeBackground": "#0b0e14",
                "tab.activeForeground": "#bfbdb6",
                "tab.border": "#0b0e14",
                "tab.activeBorder": "#e6b450",
                "tab.unfocusedActiveBorder": "#565b66",
                "tab.inactiveBackground": "#0b0e14",
                "tab.inactiveForeground": "#565b66",
                "tab.unfocusedActiveForeground": "#565b66",
                "tab.unfocusedInactiveForeground": "#565b66",
                "editor.background": "#0b0e14",
                "editor.foreground": "#bfbdb6",
                "editorLineNumber.foreground": "#6c738099",
                "editorLineNumber.activeForeground": "#6c7380e6",
                "editorCursor.foreground": "#e6b450",
                "editor.inactiveSelectionBackground": "#409fff21",
                "editor.selectionBackground": "#409fff4d",
                "editor.selectionHighlightBackground": "#7fd96226",
                "editor.selectionHighlightBorder": "#7fd96200",
                "editor.wordHighlightBackground": "#73b8ff14",
                "editor.wordHighlightStrongBackground": "#7fd96214",
                "editor.wordHighlightBorder": "#73b8ff80",
                "editor.wordHighlightStrongBorder": "#7fd96280",
                "editor.findMatchBackground": "#6c5980",
                "editor.findMatchBorder": "#6c5980",
                "editor.findMatchHighlightBackground": "#6c598066",
                "editor.findMatchHighlightBorder": "#5f4c7266",
                "editor.findRangeHighlightBackground": "#6c598040",
                "editor.rangeHighlightBackground": "#6c598033",
                "editor.lineHighlightBackground": "#131721",
                "editorLink.activeForeground": "#e6b450",
                "editorWhitespace.foreground": "#6c738099",
                "editorIndentGuide.background": "#6c738033",
                "editorIndentGuide.activeBackground": "#6c738080",
                "editorRuler.foreground": "#6c738033",
                "editorCodeLens.foreground": "#acb6bf8c",
                "editorBracketMatch.background": "#6c73804d",
                "editorBracketMatch.border": "#6c73804d",
                "editor.snippetTabstopHighlightBackground": "#7fd96233",
                "editorOverviewRuler.border": "#11151c",
                "editorOverviewRuler.modifiedForeground": "#73b8ff",
                "editorOverviewRuler.addedForeground": "#7fd962",
                "editorOverviewRuler.deletedForeground": "#f26d78",
                "editorOverviewRuler.errorForeground": "#d95757",
                "editorOverviewRuler.warningForeground": "#e6b450",
                "editorOverviewRuler.bracketMatchForeground": "#6c7380b3",
                "editorOverviewRuler.wordHighlightForeground": "#73b8ff66",
                "editorOverviewRuler.wordHighlightStrongForeground": "#7fd96266",
                "editorOverviewRuler.findMatchForeground": "#6c5980",
                "editorError.foreground": "#d95757",
                "editorWarning.foreground": "#e6b450",
                "editorGutter.modifiedBackground": "#73b8ffcc",
                "editorGutter.addedBackground": "#7fd962cc",
                "editorGutter.deletedBackground": "#f26d78cc",
                "diffEditor.insertedTextBackground": "#7fd9621f",
                "diffEditor.removedTextBackground": "#f26d781f",
                "diffEditor.diagonalFill": "#11151c",
                "editorWidget.background": "#0f131a",
                "editorWidget.border": "#11151c",
                "editorHoverWidget.background": "#0f131a",
                "editorHoverWidget.border": "#11151c",
                "editorSuggestWidget.background": "#0f131a",
                "editorSuggestWidget.border": "#11151c",
                "editorSuggestWidget.highlightForeground": "#e6b450",
                "editorSuggestWidget.selectedBackground": "#47526640",
                "debugExceptionWidget.border": "#11151c",
                "debugExceptionWidget.background": "#0f131a",
                "editorMarkerNavigation.background": "#0f131a",
                "peekView.border": "#47526640",
                "peekViewTitle.background": "#47526640",
                "peekViewTitleDescription.foreground": "#565b66",
                "peekViewTitleLabel.foreground": "#bfbdb6",
                "peekViewEditor.background": "#0f131a",
                "peekViewEditor.matchHighlightBackground": "#6c598066",
                "peekViewEditor.matchHighlightBorder": "#5f4c7266",
                "peekViewResult.background": "#0f131a",
                "peekViewResult.fileForeground": "#bfbdb6",
                "peekViewResult.lineForeground": "#565b66",
                "peekViewResult.matchHighlightBackground": "#6c598066",
                "peekViewResult.selectionBackground": "#47526640",
                "panel.background": "#0b0e14",
                "panel.border": "#11151c",
                "panelTitle.activeBorder": "#e6b450",
                "panelTitle.activeForeground": "#bfbdb6",
                "panelTitle.inactiveForeground": "#565b66",
                "statusBar.background": "#0b0e14",
                "statusBar.foreground": "#565b66",
                "statusBar.border": "#0b0e14",
                "statusBar.debuggingBackground": "#f29668",
                "statusBar.debuggingForeground": "#0d1017",
                "statusBar.noFolderBackground": "#0f131a",
                "statusBarItem.activeBackground": "#565b6633",
                "statusBarItem.hoverBackground": "#565b6633",
                "statusBarItem.prominentBackground": "#11151c",
                "statusBarItem.prominentHoverBackground": "#00000030",
                "statusBarItem.remoteBackground": "#e6b450",
                "statusBarItem.remoteForeground": "#0d1017",
                "titleBar.activeBackground": "#0b0e14",
                "titleBar.activeForeground": "#bfbdb6",
                "titleBar.inactiveBackground": "#0b0e14",
                "titleBar.inactiveForeground": "#565b66",
                "titleBar.border": "#0b0e14",
                "extensionButton.prominentForeground": "#0d1017",
                "extensionButton.prominentBackground": "#e6b450",
                "extensionButton.prominentHoverBackground": "#e1af4b",
                "pickerGroup.border": "#11151c",
                "pickerGroup.foreground": "#565b6680",
                "debugToolBar.background": "#0f131a",
                "debugIcon.breakpointForeground": "#f29668",
                "debugIcon.breakpointDisabledForeground": "#f2966880",
                "debugConsoleInputIcon.foreground": "#e6b450",
                "welcomePage.tileBackground": "#0b0e14",
                "welcomePage.tileShadow": "#00000080",
                "welcomePage.progress.background": "#131721",
                "welcomePage.buttonBackground": "#e6b45066",
                "walkThrough.embeddedEditorBackground": "#0f131a",
                "gitDecoration.modifiedResourceForeground": "#73b8ffb3",
                "gitDecoration.deletedResourceForeground": "#f26d78b3",
                "gitDecoration.untrackedResourceForeground": "#7fd962b3",
                "gitDecoration.ignoredResourceForeground": "#565b6680",
                "gitDecoration.conflictingResourceForeground": "",
                "gitDecoration.submoduleResourceForeground": "#d2a6ffb3",
                "settings.headerForeground": "#bfbdb6",
                "settings.modifiedItemIndicator": "#73b8ff",
                "keybindingLabel.background": "#565b661a",
                "keybindingLabel.foreground": "#bfbdb6",
                "keybindingLabel.border": "#bfbdb61a",
                "keybindingLabel.bottomBorder": "#bfbdb61a",
                "terminal.background": "#0b0e14",
                "terminal.foreground": "#bfbdb6",
                "terminal.ansiBlack": "#11151c",
                "terminal.ansiRed": "#ea6c73",
                "terminal.ansiGreen": "#7fd962",
                "terminal.ansiYellow": "#f9af4f",
                "terminal.ansiBlue": "#53bdfa",
                "terminal.ansiMagenta": "#cda1fa",
                "terminal.ansiCyan": "#90e1c6",
                "terminal.ansiWhite": "#c7c7c7",
                "terminal.ansiBrightBlack": "#686868",
                "terminal.ansiBrightRed": "#f07178",
                "terminal.ansiBrightGreen": "#aad94c",
                "terminal.ansiBrightYellow": "#ffb454",
                "terminal.ansiBrightBlue": "#59c2ff",
                "terminal.ansiBrightMagenta": "#d2a6ff",
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