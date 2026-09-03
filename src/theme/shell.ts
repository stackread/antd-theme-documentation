/*
 * Forked from @stackread/docusaurus-theme - a deliberate fork:
 * this site freezes the look it has; the package evolves for guide sites.
 * Divergence between the two is intended, not drift.
 */
/**
 * The page shell.
 *
 * Docusaurus colours itself through `--ifm-*`. Without this mapping the
 * components would wear one theme inside a shell wearing another.
 *
 * Every value here was measured on a running page rather than guessed. What is
 * deliberately NOT overridden is as informative as what is - see below.
 */

import { CHEVRON_RIGHT, glyph, type Tokens } from '@stackread/antd-theme';

/**
 * The sidebar caret, pointing up.
 *
 * Docusaurus expects an upward glyph and rotates it itself - 180 degrees when
 * open, 90 when collapsed. The reference's path points right, hence -90.
 *
 * This lives here and not in the Ant Design theme: that a caret must arrive
 * pointing up is knowledge about a host, and the theme has no host.
 */
const chevronImage = (colour: string): string =>
  glyph([{ d: CHEVRON_RIGHT, fill: colour }], -90);

/**
 * What the reference leaves alone.
 *
 * It keeps `--ifm-color-primary` on Docusaurus' default blue #3578E5, and with
 * it the active menu item, the active tab and the active breadcrumb. The
 * active menu entry of the reference's own documentation is therefore not its
 * own blue at all.
 *
 * This theme deviates deliberately and carries the brand through. Reproducing
 * a design system means its system, not its inconsistencies - and a foreign
 * blue in the navigation would be impossible to explain.
 */
export const ifmVariables = (t: Tokens): Record<string, string> => ({
  // Surfaces and type
  '--ifm-background-color': t.color.bgContainer,
  '--ifm-font-color-base': t.color.text,
  '--ifm-heading-color': t.color.textHeading,

  // Links
  '--ifm-link-color': t.color.link,
  '--ifm-link-hover-color': t.color.link,

  // Sidebar
  '--ifm-menu-color': t.color.text,
  /*
   * The active entry carries the primary colour on the primary BASE surface,
   * not the text variant on the page ground. Measured: #0B64DD on #F1F6FF,
   * weight 600.
   *
   * The reference sets its own variable to #F6F9FC and then overrides it again
   * with a rule; this sets the value that actually paints.
   */
  '--ifm-menu-color-active': t.color.primary,
  '--ifm-menu-color-background-active': t.color.primaryBg,
  '--ifm-menu-color-background-hover': t.color.primaryBg,

  // Table of contents
  '--ifm-toc-link-color': t.color.text,
  '--stackread-toc-font-size': `${t.metrics.labelFontSize}px`,

  /*
   * The sidebar's inset.
   *
   * Docusaurus sets the root list to `padding: 0`, the reference to `0 8px`.
   * The entry itself is identical in both - 4px radius, 6/8 padding, 32px
   * tall. Only the inset is missing, and without it a rounded entry touches
   * the edge of the page and stops looking rounded.
   *
   * The value comes from the size scale, not as a literal 8.
   */
  '--stackread-sidebar-inset': `${t.size.s}px`,

  // Code surfaces
  '--ifm-pre-background': t.color.bgLayout,

  // Type
  '--ifm-font-family-base': t.typography.fontFamily,
  /*
   * 14px on the ROOT, not only on body text. Docusaurus sets
   * `html { font-size: var(--ifm-font-size-base) }`, so every `rem` in the
   * whole layout shrinks with it. The reference does the same - its root font
   * size is 14px rather than the usual 16.
   */
  '--ifm-font-size-base': `${t.typography.fontSize}px`,
  '--ifm-font-weight-base': String(t.typography.weight.regular),
  // Unitless - the reference's line height is 1.5, not a pixel value.
  '--ifm-line-height-base': String(t.typography.lineHeight),

  /*
   * Headings come from the heading table, not from the font scale.
   *
   * The reference sets `--ifm-h1-font-size` to its XL font size and still
   * renders h1 at 30px, because its own title layer sits in front. Measured on
   * the running reference: h1 30/600, h2 24/600, h3 20/600 - exactly
   * `heading.l`, `.m` and `.s`.
   *
   * Trusting the declared variable rather than the rendered result would
   * reproduce every heading six points too small.
   */
  '--ifm-h1-font-size': t.typography.heading.l['font-size'],
  '--ifm-h2-font-size': t.typography.heading.m['font-size'],
  '--ifm-h3-font-size': t.typography.heading.s['font-size'],
  '--ifm-h4-font-size': t.typography.heading.xs['font-size'],
  '--ifm-h5-font-size': t.typography.heading.xxs['font-size'],
  '--ifm-h6-font-size': t.typography.heading.xxxs['font-size'],
  '--ifm-heading-font-weight': String(t.typography.heading.l['font-weight']),

  /*
   * A separate copy for the first heading.
   *
   * On `.markdown h1:first-child` Docusaurus does not set `font-size` - it
   * REDEFINES `--ifm-h1-font-size` there as `3rem`. A rule that reads the
   * variable therefore gets the shadowed value: 42px instead of 30 at a 14px
   * root. This copy sits outside its reach.
   */
  '--stackread-heading-1': t.typography.heading.l['font-size'],

  /*
   * Documentation prose is 16px, not 14.
   *
   * The root font size is 14px (the reference does the same), but the content
   * of a documentation page renders one step larger. Measured: 16px.
   * `--ifm-font-size-base` cannot express that - it sets the root, and with it
   * every `rem` in the layout.
   */
  '--stackread-body-font-size': `${t.typography.fontSizeLG}px`,

  /* For the shell, which sits outside Ant Design's variable scope. */
  '--stackread-text-primary': t.color.primaryText,

  // Shapes
  '--ifm-global-radius': `${t.shape.borderRadius}px`,
  /*
   * `borderSecondary`, not `border`.
   *
   * Measured: the line in the table of contents is the subdued border, not the
   * plain one. The difference only shows once the line breaks into segments
   * and sits next to the active blue piece - before that it was one continuous
   * grey edge, where a step too dark went unnoticed.
   */
  /*
   * The search field.
   *
   * A search plugin attaches to Docusaurus' own field, so it colours itself
   * through Docusaurus' variables - and without these three lines an input in
   * Docusaurus' grey (#EBEDF0) sits in a navbar that is otherwise ours
   * throughout.
   *
   * Shape and border do not come from here: the rounding is `2rem` in
   * Docusaurus' own stylesheet and no variable reaches it. It lives in
   * styles.css instead.
   */
  '--ifm-navbar-search-input-background-color': t.color.bgContainer,
  '--ifm-navbar-search-input-color': t.color.text,
  '--ifm-navbar-search-input-placeholder-color': t.color.textPlaceholder,

  '--ifm-toc-border-color': t.color.borderSecondary,

  /*
   * The sidebar's caret.
   *
   * The caret is a data URI in `--ifm-menu-link-sublist-icon`. Replacing the
   * variable replaces the arrow, and Docusaurus' own rotations - 180 degrees
   * when open, 90 when collapsed - stay where they are.
   *
   * A swizzle of the category component would have been the large solution to
   * a problem that has a variable.
   *
   * `-filter: none` stops Docusaurus from inverting the glyph in the dark
   * appearance; the path already carries its colour.
   */
  '--ifm-menu-link-sublist-icon': chevronImage(t.color.text),
  '--ifm-menu-link-sublist-icon-filter': 'none',

  /*
   * The focus ring, prose links included - one ring on the whole page,
   * not the browser's on links and the theme's on controls.
   */
  '--stackread-focus-color': t.focus.color,
  '--stackread-focus-width': `${t.focus.width}px`,
  '--ifm-hr-background-color': t.color.border,
  '--ifm-table-border-color': t.color.border,

  /*
   * The shell's table colours.
   *
   * Without them Docusaurus stripes every `<table>` with `rgba(0, 0, 0, .03)`
   * - including the ones a component draws itself, such as a date picker's
   * calendar. It was reported as an unreplaced library default, and that is
   * what it was - only Docusaurus' default, not Ant Design's.
   */
  '--ifm-table-background': 'transparent',
  '--ifm-table-stripe-background': t.color.fillTertiary,
  '--ifm-table-head-background': t.color.fillTertiary,
  '--ifm-table-head-color': t.color.textHeading,
  '--ifm-table-cell-color': t.color.text,

  /*
   * The previous/next footer and inline code.
   *
   * Both stood in Docusaurus' colours on every page - #DADDE1 in the footer,
   * #F6F7F8 behind every `<code>` in prose. A pattern search for the library's
   * black alpha could not find them, because both values are opaque.
   */
  '--ifm-pagination-nav-color-hover': t.color.primaryText,

  /*
   * The emphasis ramp, not the footer's own variables.
   *
   * The footer does have variables of its own, but it takes its BORDER from
   * Infima's general emphasis ramp and its subtitle from the content colour.
   * Anything else that uses either of those two gets the value as well - which
   * is intended: both are general statements, not the footer's.
   */
  '--ifm-color-emphasis-300': t.color.border,
  '--ifm-color-content-secondary': t.color.textSecondary,
  '--ifm-code-background': t.color.fillTertiary,
  '--ifm-code-color': t.color.text,
  '--ifm-code-border-radius': `${t.shape.borderRadius}px`,
  '--ifm-blockquote-border-color': t.color.border,
  '--ifm-blockquote-color': t.color.textSecondary,

  /*
   * The toolbar under each example. It has to come through THIS layer:
   * Ant Design keeps its --ant-* variables in a scope the toolbar cannot
   * reach, so a var() with a fallback would silently paint the fallback.
   */
  '--stackread-example-toolbar': t.color.bgLayout,

  /*
   * The surface an example sits on - the plain ground, stated rather than
   * inherited. Today the page behind happens to be plain as well, so the
   * pixels do not move; the point is repeatability. An inherited ground
   * moves with whatever page hosts the example, and an alpha value like
   * rgba(23, 80, 186, 0.04) blends into a DIFFERENT pixel on each host -
   * a pixel comparison of hover or focus tints would measure the host,
   * not the component.
   */
  '--stackread-example-surface': t.color.bgContainer,

  /*
   * The deliberate deviation - see the comment above. The reference leaves
   * these on Docusaurus' default blue.
   */
  '--ifm-color-primary': t.color.primary,
  /*
   * `--ifm-menu-color-active` is set further up, with the sidebar. Setting it
   * a second time here was a mistake: with two entries under one key the later
   * one wins, and that one carried the text variant instead of the primary
   * colour. Only a side-by-side comparison showed it.
   */
  '--ifm-tabs-color-active': t.color.primary,
  '--ifm-breadcrumb-color-active': t.color.primaryText,

  // The sidebar's width, measured against the reference.
  '--doc-sidebar-width': '258px',
});

/** Writes the shell's variables onto the document root. */
export const applyShell = (t: Tokens): void => {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(ifmVariables(t))) {
    root.style.setProperty(name, value);
  }
};
