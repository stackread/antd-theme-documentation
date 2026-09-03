/*
 * Forked from @stackread/docusaurus-theme - a deliberate fork:
 * this site freezes the look it has; the package evolves for guide sites.
 * Divergence between the two is intended, not drift.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { themeFor, tokensFor, applyVariables, type Appearance } from '@stackread/antd-theme';
import { applyShell } from './shell';
import '@stackread/antd-theme/theme.css';

/**
 * The root of the site.
 *
 * Three layers meet here:
 *
 *   themeFor(a)       Ant Design's own tokens      --ant-*
 *   applyVariables    what Ant Design has no name for   --stackread-*
 *   applyShell        the Docusaurus shell         --ifm-*
 *
 * The appearance comes from Docusaurus, not from this theme. A reader has one
 * switch, not two.
 *
 * It reads `data-theme` on the root element rather than `useColorMode`: that
 * hook needs a provider further in, and the attribute is the truth anyway -
 * Docusaurus sets it from an inline script before the first paint, so the page
 * does not flash light.
 */

const read = (): Appearance =>
  typeof document !== 'undefined' &&
  document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';

export default function Root({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<Appearance>('light');

  useEffect(() => {
    setAppearance(read());
    const observer = new MutationObserver(() => setAppearance(read()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const t = tokensFor(appearance);

  useEffect(() => {
    applyVariables(t);
    applyShell(t);
  }, [t]);

  return <ConfigProvider theme={themeFor(appearance)}>{children}</ConfigProvider>;
}
