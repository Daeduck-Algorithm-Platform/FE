"use client";

import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme?: string;
  height?: string;
  onCursorChange?: (line: number, column: number) => void;
}

export default function CodeEditor({
  value,
  onChange,
  language,
  theme = "vs-dark",
  height = "100%",
  onCursorChange,
}: CodeEditorProps) {
  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  const handleEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    // 에디터 설정
    editorInstance.updateOptions({
      minimap: { enabled: false }, // 미니맵 비활성화
      automaticLayout: true,
      wordWrap: "on",
      fontSize: 14,
      lineNumbersMinChars: 2,
      formatOnPaste: true,
      formatOnType: true,
      tabSize: 4,
      insertSpaces: true,
      trimAutoWhitespace: true,
    });

    // 커서 위치 추적
    editorInstance.onDidChangeCursorPosition((e) => {
      if (onCursorChange) {
        onCursorChange(e.position.lineNumber, e.position.column);
      }
    });
  };

  return (
    <Editor
      height={height}
      theme={theme}
      language={language}
      value={value}
      onChange={handleEditorChange}
      onMount={handleEditorMount}
      options={{
        selectOnLineNumbers: true,
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: "blink",
        cursorStyle: "line",
        renderLineHighlight: "line",
        renderWhitespace: "none",
        inlineSuggest: {
          enabled: true,
        },
        suggest: {
          showFields: true,
          showSnippets: true,
        },
      }}
    />
  );
}
