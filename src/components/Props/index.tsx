import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { addressOf } from './addresses';

/*
 * The Props section.
 *
 * The props themselves are NOT copied. A forty-row table would be out of date
 * the day it was written, and would duplicate documentation that is already
 * maintained elsewhere.
 *
 * What only this site can supply is the translation: a page here is named
 * after what it reproduces ("Accordion"), while Ant Design calls the component
 * something else ("Collapse"). Anyone reading on would otherwise search under
 * the wrong name.
 *
 * The list comes from the page's front matter, not from a second file. It is
 * there anyway - and what an example imports merely for layout (`Space` on 69
 * pages, `Typography` on 64) does not belong in a section about the
 * component's props.
 */

const NameCard = ({ name }: { name: string }) => (
  <a
    href={addressOf(name)}
    target="_blank"
    rel="noreferrer"
    className="props-card"
  >
    <span className="props-card__name">{name}</span>
    <span className="props-card__hint">API reference on ant.design</span>
  </a>
);

export const Props = (): React.ReactElement | null => {
  const { frontMatter } = useDoc();
  const components = (frontMatter as { antd_components?: string[] }).antd_components;
  if (!components || components.length === 0) return null;

  return (
    <section className="props-section">
      <h2 id="props">Props</h2>
      <p>
        {components.length === 1
          ? 'This page is drawn with one Ant Design component. Its full list of props lives in Ant Design’s own documentation, which is kept up to date there rather than copied here.'
          : 'This page is drawn with the components below. Their full lists of props live in Ant Design’s own documentation, which is kept up to date there rather than copied here.'}
      </p>
      <div className="props-cards">
        {components.map((name) => (
          <NameCard key={name} name={name} />
        ))}
      </div>
    </section>
  );
};

export default Props;
