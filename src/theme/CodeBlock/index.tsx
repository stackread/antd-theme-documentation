import type { ReactElement } from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import type { WrapperProps } from '@docusaurus/types';
import { Example } from '@site/src/components/Example';

type Props = WrapperProps<typeof CodeBlockType>;

/**
 * Intercepts ```tsx interactive.
 *
 * Everything else passes to Docusaurus unchanged. The marker lives in
 * `metastring` - whatever follows the language on the fence.
 */
export default function CodeBlock(props: Props): ReactElement {
  const marker = (props as { metastring?: string }).metastring ?? '';
  if (marker.split(/\s+/).includes('interactive') && typeof props.children === 'string') {
    return <Example sourceText={props.children} />;
  }
  return <OriginalCodeBlock {...props} />;
}
