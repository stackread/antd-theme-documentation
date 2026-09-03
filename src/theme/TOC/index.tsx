import React from 'react';
import TOC from '@theme-original/TOC';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

/*
 * "Props" belongs in the table of contents.
 *
 * The page has three `h2` headings - Component, Usage, Props - and only the
 * first two appeared on the right. The reason is structural: the Props section
 * is appended by `DocItem/Content`, so OUTSIDE the MDX, and Docusaurus builds
 * its table of contents from the MDX tree.
 *
 * The wrapper goes on `@theme/TOC`, not on `DocItem/TOC`: the latter renders
 * nothing itself, it chooses between the mobile and the desktop variant. Both
 * read `toc` from context and pass it to THIS component - here it is a prop,
 * and a prop can be extended.
 *
 * The condition is the same as for the section itself: a page with
 * `antd_components` in its front matter gets both.
 */
type TocEntry = { value: string; id: string; level: number };
type Props_ = { toc: TocEntry[] } & Record<string, unknown>;

export default function TOCWrapper(props: Props_): React.ReactElement {
  const { frontMatter } = useDoc();
  const components = (frontMatter as { antd_components?: string[] }).antd_components;
  const alreadyThere = props.toc.some((e) => e.id === 'props');
  if (!components || components.length === 0 || alreadyThere) return <TOC {...props} />;

  return <TOC {...props} toc={[...props.toc, { value: 'Props', id: 'props', level: 2 }]} />;
}
