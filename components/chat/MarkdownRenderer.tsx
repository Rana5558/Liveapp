'use client';

import React, { memo } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

function CodeBlock({
    language,
    value,
}: {
    language: string | undefined;
    value: string;
}) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-3 rounded-lg overflow-hidden">
            {/* Language label + copy button */}
            <div className="flex items-center justify-between bg-neutral-800 px-4 py-1.5 text-xs text-neutral-400">
                <span>{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                language={language || 'text'}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    fontSize: '0.8125rem',
                    padding: '1rem',
                }}
                wrapLongLines
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
}

interface MarkdownRendererProps {
    content: string;
}

function MarkdownRendererInner({ content }: MarkdownRendererProps) {
    return (
        <Markdown
            components={{
                code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const value = String(children).replace(/\n$/, '');

                    // Inline code (no language class, short content)
                    if (!match) {
                        return (
                            <code
                                className="bg-neutral-800 text-primary px-1.5 py-0.5 rounded text-[0.8125rem]"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }

                    // Fenced code block
                    return <CodeBlock language={match[1]} value={value} />;
                },
                p({ children }) {
                    return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
                },
                ul({ children }) {
                    return <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>;
                },
                ol({ children }) {
                    return <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>;
                },
                li({ children }) {
                    return <li className="leading-relaxed">{children}</li>;
                },
                h1({ children }) {
                    return <h1 className="text-xl font-bold mb-2 mt-4">{children}</h1>;
                },
                h2({ children }) {
                    return <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>;
                },
                h3({ children }) {
                    return <h3 className="text-base font-semibold mb-1 mt-2">{children}</h3>;
                },
                blockquote({ children }) {
                    return (
                        <blockquote className="border-l-4 border-primary/50 pl-4 italic text-neutral-300 my-2">
                            {children}
                        </blockquote>
                    );
                },
                a({ href, children }) {
                    return (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 underline underline-offset-2"
                        >
                            {children}
                        </a>
                    );
                },
                hr() {
                    return <hr className="border-neutral-700 my-4" />;
                },
                table({ children }) {
                    return (
                        <div className="overflow-x-auto my-2">
                            <table className="w-full text-sm border-collapse border border-neutral-700">
                                {children}
                            </table>
                        </div>
                    );
                },
                th({ children }) {
                    return (
                        <th className="border border-neutral-700 px-3 py-1.5 bg-neutral-800 text-left font-semibold">
                            {children}
                        </th>
                    );
                },
                td({ children }) {
                    return (
                        <td className="border border-neutral-700 px-3 py-1.5">{children}</td>
                    );
                },
            }}
        >
            {content}
        </Markdown>
    );
}

export const MarkdownRenderer = memo(MarkdownRendererInner);
