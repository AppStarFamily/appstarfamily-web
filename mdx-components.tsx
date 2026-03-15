import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 style={{
        color: '#C9922A',
        fontSize: '2rem',
        fontWeight: '700',
        lineHeight: '1.2',
        marginBottom: '0.5rem',
        marginTop: '0',
        letterSpacing: '-0.01em',
      }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{
        color: '#E8E0D0',
        fontSize: '1.35rem',
        fontWeight: '700',
        lineHeight: '1.3',
        marginTop: '2.5rem',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid rgba(201, 146, 42, 0.2)',
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{
        color: '#C9922A',
        fontSize: '1.05rem',
        fontWeight: '600',
        marginTop: '1.75rem',
        marginBottom: '0.5rem',
      }}>
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p style={{
        color: '#C8C0B0',
        fontSize: '1rem',
        lineHeight: '1.75',
        marginBottom: '1.25rem',
        marginTop: '0',
      }}>
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong style={{ color: '#E8E0D0', fontWeight: '600' }}>
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em style={{ color: '#8B8FA8', fontStyle: 'italic' }}>
        {children}
      </em>
    ),
    hr: () => (
      <hr style={{
        border: 'none',
        borderTop: '1px solid #1F2937',
        margin: '2.5rem 0',
      }} />
    ),
    ul: ({ children }) => (
      <ul style={{
        listStyle: 'none',
        padding: '0',
        margin: '0 0 1.25rem 0',
      }}>
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol style={{
        listStyleType: 'decimal',
        paddingLeft: '1.5rem',
        margin: '0 0 1.25rem 0',
        color: '#C8C0B0',
      }}>
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li style={{
        color: '#C8C0B0',
        fontSize: '1rem',
        lineHeight: '1.7',
        marginBottom: '0.4rem',
        paddingLeft: '1.25rem',
        position: 'relative',
      }}>
        <span style={{
          position: 'absolute',
          left: '0',
          color: '#C9922A',
          fontWeight: '700',
        }}>◆</span>
        {children}
      </li>
    ),
    code: ({ children }) => (
      <code style={{
        backgroundColor: '#141C35',
        color: '#F0C060',
        fontSize: '0.85em',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        padding: '0.15em 0.4em',
        borderRadius: '4px',
        border: '1px solid #1F2937',
      }}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre style={{
        backgroundColor: '#080D18',
        border: '1px solid #1F2937',
        borderRadius: '8px',
        padding: '1.25rem',
        overflowX: 'auto',
        margin: '1.5rem 0',
        fontSize: '0.875rem',
        lineHeight: '1.6',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        color: '#8B8FA8',
      }}>
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{
        borderLeft: '3px solid #C9922A',
        paddingLeft: '1.25rem',
        margin: '1.5rem 0',
        color: '#8B8FA8',
        fontStyle: 'italic',
      }}>
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => (
      <span style={{ display: 'block', margin: '2rem 0' }}>
        <img
          src={src}
          alt={alt ?? ''}
          style={{
            width: '100%',
            borderRadius: '10px',
            border: '1px solid #1F2937',
            display: 'block',
          }}
        />
        {alt && (
          <span style={{
            display: 'block',
            textAlign: 'center',
            color: '#5A5E70',
            fontSize: '0.8rem',
            marginTop: '0.5rem',
            fontStyle: 'italic',
          }}>
            {alt}
          </span>
        )}
      </span>
    ),
    ...components,
  }
}
