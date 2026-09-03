/*
 * Forked from @stackread/docusaurus-theme - a deliberate fork:
 * this site freezes the look it has; the package evolves for guide sites.
 * Divergence between the two is intended, not drift.
 */
import * as React from 'react';
import { Alert } from 'antd';
import { processAdmonitionProps } from '@docusaurus/theme-common';
import type { Props } from '@theme/Admonition';

/**
 * The callout block in prose.
 *
 * Docusaurus brings its own colours for `:::note` and friends, and they bear no
 * relation to this theme's. Left alone, every admonition in a site claims that
 * this is what a warning looks like here - while the Callout component one page
 * over says something else.
 *
 * The reference does not solve this with colours. Measured across six of its
 * pages, every `:::` block comes out as its own callout component rather than
 * an admonition: it SWAPS the component instead of repainting it.
 *
 * So does this file. The gain is not the saving but the singularity - the four
 * meanings stay in one place. Accent bar, glyphs, typography and padding follow
 * on their own, and a later change to the callout's anatomy now reaches prose
 * as well.
 */

/**
 * Nine keywords, four meanings.
 *
 * The keys are exactly Docusaurus 3's default admonition keywords - no more,
 * no fewer. A key that never arrives is a branch nobody reaches; a keyword
 * with no key falls through to the fallback below and is painted wrong.
 *
 * `success` is why that matters. It parses by default, and without an entry it
 * came out blue - the theme has a green meaning for it, and the block claimed
 * otherwise. A missing entry does not fail loudly; it paints something
 * plausible.
 *
 * `secondary` and `important` land on `info` deliberately rather than by
 * accident: they say "there is something here you should know", which is what
 * `note` and `info` say too. They differ in occasion, not in weight.
 */
const MEANING: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
  note: 'info',
  info: 'info',
  secondary: 'info',
  important: 'info',
  tip: 'success',
  success: 'success',
  warning: 'warning',
  caution: 'warning',
  danger: 'error',
};

export default function Admonition(rohe: Props): React.ReactNode {
  const props = processAdmonitionProps(rohe);
  /*
   * The fallback is for keywords a site adds itself through
   * `admonitions.keywords`. It cannot be reached by a default keyword - every
   * one of those has an entry above.
   */
  const art = MEANING[props.type] ?? 'info';

  /*
   * A title is optional, a body is not.
   *
   * Without a title the alert gets only `message` - the short form the
   * Callout carries anyway.
   * Otherwise the body would be the description of an empty heading, and the
   * typography tips over: heading colour at 16px for a paragraph.
   */
  const hasTitle = props.title !== undefined && props.title !== null;

  return (
    <Alert
      type={art}
      showIcon
      title={hasTitle ? props.title : props.children}
      description={hasTitle ? props.children : undefined}
      style={{ marginBottom: 'var(--ifm-paragraph-margin-bottom, 1rem)' }}
    />
  );
}
