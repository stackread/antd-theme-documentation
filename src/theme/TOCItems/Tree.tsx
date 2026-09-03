/*
 * Forked from @stackread/docusaurus-theme - a deliberate fork:
 * this site freezes the look it has; the package evolves for guide sites.
 * Divergence between the two is intended, not drift.
 */
import * as React from 'react';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/TOCItems/Tree';

/**
 * The segmented rule beside the table of contents.
 *
 * The reference draws a continuous line to the left of its table of contents
 * and colours the segment belonging to the section being read. Measured:
 *
 *   top level, at rest   2px  the subdued border colour
 *   top level, active    2px  the primary text colour
 *   deeper levels        no rule
 *
 * CSS alone could not reproduce it, and the reason is structural: Docusaurus
 * renders `<li><a/><ul/></li>`. A border on the `<li>` would span the right
 * height, children included, but could not be coloured per segment - the
 * active class sits on the `<a>`, and a child cannot colour its parent.
 *
 * The reference wraps both in a `<span class="tree-item__inner">`, and so does
 * this file. The border sits on the span, and `:has()` colours it by the state
 * of the link inside.
 *
 * The class name is the reference's. Not out of convenience: anyone comparing
 * the two should find the same place under the same name.
 */
function TOCItemTree({ toc, className, linkClassName, isChild }: Props): React.ReactNode {
  if (!toc.length) return null;

  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading) => (
        <li key={heading.id}>
          <span className="tree-item__inner">
            <Link
              to={`#${heading.id}`}
              className={linkClassName ?? undefined}
              // The text comes from the heading, so it is the page's own.
              dangerouslySetInnerHTML={{ __html: heading.value }}
            />
            <TOCItemTree
              isChild
              toc={heading.children}
              className={className}
              linkClassName={linkClassName}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(TOCItemTree);
