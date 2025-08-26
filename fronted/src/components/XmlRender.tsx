import React from "react";
import { Highlight, type Language, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language: Language;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return Highlight({
    code: code.trim(),
    language,
    theme: themes.oneDark,
    children: ({ style, tokens, getLineProps, getTokenProps }) => (
      <pre
        style={style}
        className="rounded-sm p-4 text-sm overflow-x-auto bg-muted"
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    ),
  });
};
