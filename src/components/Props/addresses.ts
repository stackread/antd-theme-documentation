/*
 * Component -> its page in Ant Design's documentation.
 *
 * The ordinary case is a transliteration: `InputNumber` -> `input-number`. 47
 * of 49 components follow it; checked rather than assumed - every address was
 * requested.
 *
 * Two do not: `Row` and `Col` have no pages of their own, they belong to
 * `grid`. Both answered 404, and a link into nothing is worse than no link.
 *
 * `#api` exists: measured on `button`, `collapse` and `typography`, all three
 * with `id="api"`.
 */
const EXCEPTIONS: Record<string, string> = {
  Row: 'grid',
  Col: 'grid',
  /*
   * `Icon` comes from `@ant-design/icons`, not from `antd`, so it appears in
   * no import list and falls through the rule that a subject must be imported.
   * On the icon page it IS the subject, and the address exists (checked, 200).
   */
  Icon: 'icon',
};

/** `InputNumber` -> `input-number` */
const transliterate = (name: string) =>
  name.replace(/(?<!^)(?=[A-Z])/g, '-').toLowerCase();

/**
 * The address of a component's page in Ant Design's documentation.
 *
 * Sub-components point at their parent: `Input.Password` has no page of its
 * own, `Input` does.
 */
export const addressOf = (name: string): string => {
  const parent = name.split('.')[0];
  const path = EXCEPTIONS[parent] ?? transliterate(parent);
  return `https://ant.design/components/${path}#api`;
};

/** Every component used in the examples - for the address check. */
export const COMPONENTS = [
  'Alert', 'Avatar', 'Badge', 'Breadcrumb', 'Button', 'Card', 'Checkbox', 'Col',
  'Collapse', 'ColorPicker', 'DatePicker', 'Descriptions', 'Divider', 'Drawer',
  'Dropdown', 'Empty', 'Flex', 'Form', 'Image', 'Input', 'InputNumber', 'Layout',
  'Menu', 'Modal', 'Pagination', 'Popover', 'Progress', 'Radio', 'Row',
  'Segmented', 'Select', 'Skeleton', 'Slider', 'Space', 'Spin', 'Splitter',
  'Statistic', 'Steps', 'Switch', 'Table', 'Tabs', 'Tag', 'Timeline', 'Tooltip',
  'Tour', 'Tree', 'Typography', 'Upload', 'notification', 'Icon',
] as const;
