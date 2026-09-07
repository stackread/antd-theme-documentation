import { useState } from 'react';
import * as React from 'react';
import * as antd from 'antd';
import * as icons from '@ant-design/icons';
import dayjs from 'dayjs';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
/*
 * `@theme-original`, not `@theme`: `@theme/CodeBlock` is this site's own
 * wrapper, which in turn embeds this Example. A cycle that only shows up at
 * runtime as "Element type is invalid".
 */
import CodeBlock from '@theme-original/CodeBlock';
import styles from './Example.module.css';

/**
 * An example - the running component and its source in one.
 *
 * The code block IS the example. What appears below as source is the same
 * string that runs above; the two cannot drift apart, rather than merely being
 * unlikely to.
 *
 * The scope an example draws on follows below. The import lines in the source
 * stay - they belong to the example and should be readable - but are stripped
 * before execution. Running them would need a module resolver in the browser.
 *
 * `dayjs` is in scope because Ant Design's date components compute with it: a
 * date example without `dayjs` could set no value, only an empty one.
 *
 * `@ant-design/icons` likewise. It is the same set Ant Design's own components
 * draw their icons from - the loading glyph of a `Select` is
 * `data-icon="loading"` out of exactly this package. A different set would
 * bring more icons and a second drawing language.
 */

/*
 * `default` has to come out of the scope.
 *
 * `@ant-design/icons` has a default export. Spreading the module puts a
 * `default` key into the scope - and react-live turns every key into a
 * binding: `const default = ...`. That is a keyword, and every example on
 * every page fails with `Unexpected token 'default'`.
 *
 * The default export itself is useful - it is Ant Design's `Icon`, which
 * mounts custom SVG. It comes back below under its proper name.
 */
const { default: IconComponent, ...iconSet } = icons;

/*
 * Individually AND as a whole.
 *
 * The spread names are the ordinary case: an example writes
 * `<SettingOutlined />`. The icon page needs the module as a whole, though -
 * it lists all 846 and cannot name them one by one. `Icon` (the default
 * export) comes along for the same reason: custom SVG are mounted with it.
 */
const scope = {
  React,
  ...React,
  ...antd,
  antd,
  dayjs,
  ...iconSet,
  icons: iconSet,
  Icon: IconComponent,
};

/*
 * No `default` key may survive in the scope - react-live turns every key
 * into a binding, and `const default = ...` is a syntax error on every
 * example of every page. The icons spread is guarded above, but WHICH
 * namespace carries a `default` depends on the bundler's ESM interop:
 * the deployed build (registry install, no workspace) surfaced one
 * through a spread that the local build does not. Stripped here, after
 * all spreads, whatever its origin.
 */
delete (scope as { default?: unknown }).default;

/**
 * Brings the source into the shape react-live can run.
 *
 * Three edits, all purely syntactic:
 *   1. Strip imports - the scope already supplies the names.
 *   2. Turn `export default` into an assignment.
 *   3. Append a `render` call.
 *
 * Deliberately no library for this: every example follows the same shape
 * (`export default () => ...`), and a tool that could do more would also
 * silently accept more.
 */
const transform = (sourceText: string): string => {
  const withoutImports = sourceText.replace(/^\s*import\s[^;]*;?\s*$/gm, '');
  const named = withoutImports.replace(
    /export\s+default\s+/,
    'const __Example = '
  );
  if (named === withoutImports) {
    // No `export default` - then the block is an expression.
    return `render(${withoutImports.trim()})`;
  }
  return `${named}\nrender(<__Example />)`;
};

export const Example = ({
  sourceText,
  language = 'tsx',
}: {
  sourceText: string;
  language?: string;
}) => {
  const [showSource, setShowSource] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sourceText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* Clipboard refused - no reason to disturb the example. */
    }
  };

  return (
    <LiveProvider code={sourceText} scope={scope} transformCode={transform} noInline>
      <div className={styles.frame}>
        <div className={styles.preview}>
          <LivePreview />
        </div>
        <LiveError className={styles.error} />

        {showSource && (
          <div className={styles.source}>
            <CodeBlock language={language}>{sourceText.trim()}</CodeBlock>
          </div>
        )}

        <div className={styles.toolbar}>
          <antd.Button size="small" onClick={() => setShowSource((z) => !z)}>
            {showSource ? 'Hide source' : 'Show source'}
          </antd.Button>
          <antd.Button size="small" type="text" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </antd.Button>
        </div>
      </div>
    </LiveProvider>
  );
};

export default Example;
