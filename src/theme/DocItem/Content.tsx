import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import { Props } from '../../components/Props';

/*
 * The Props section attaches itself.
 *
 * The alternative was writing one `<Props />` line into 88 pages. That would
 * have stopped being true at the first forgotten page, and renaming a single
 * component would have meant reviewing 88 places.
 *
 * Here the rule is stated once: a page with `antd_components` in its front
 * matter gets the section. A page without it does not - `Props` returns `null`
 * and a prose page stays a prose page.
 */
type Props_ = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props_): React.ReactElement {
  return (
    <>
      <Content {...props} />
      <Props />
    </>
  );
}
