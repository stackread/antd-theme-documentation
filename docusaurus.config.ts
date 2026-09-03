import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * The documentation site.
 *
 * It is an ordinary consumer: the theme arrives through
 * `@stackread/docusaurus-theme`, exactly as it would for anyone else. That is
 * the proof the package works - if this site does not wire it up differently
 * from a stranger would, the package cannot be secretly living off internals.
 */
const config: Config = {
  title: 'stackread',
  tagline: 'A design system built on Ant Design',
  favicon: 'img/favicon.png',

  /*
   * No `future: { v4: true }`. The flag switches on the Rspack bundler and
   * requires `@docusaurus/faster` as another dependency. The speed is not
   * needed here, and every dependency is one more thing to carry.
   */

  url: 'http://localhost',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  /*
   * `onBrokenMarkdownLinks` used to sit at the top level and warned on every
   * build that it no longer belongs there. From Docusaurus 4 that place is
   * gone entirely.
   */
  markdown: { hooks: { onBrokenMarkdownLinks: 'warn' } },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: { customCss: ['./src/css/custom.css', './src/css/shell.css'] },
      } satisfies Preset.Options,
    ],
  ],

  /*
   * Search.
   *
   * `docusaurus-lunr-search` builds its index at build time and ships it with
   * the site. Algolia DocSearch is ruled out, and not by taste: it needs a
   * crawler that reads the site from outside, which means a site that is
   * already published.
   *
   * A side effect worth knowing: the index is only produced by
   * `docusaurus build`, not by `start`. In the development server the field is
   * there and finds nothing.
   */
  plugins: [['docusaurus-lunr-search', { indexBaseUrl: true }]],

  /*
   * No theme package - deliberately, since 039.
   *
   * This site documents @stackread/antd-theme and depends on nothing else:
   * `Root`, the `--ifm-*` mapping, the shell stylesheet and the swizzles for
   * admonition and table of contents live in `src/theme` as a deliberate FORK
   * of @stackread/docusaurus-theme. The package is free to evolve its own
   * look for guide sites; this site freezes the look it has.
   */

  themeConfig: {
    navbar: {
      title: 'stackread',
      /*
       * Three areas. Patterns, content and data visualization are about
       * writing, language and charts - none of which a theme has anything to
       * say about.
       */
      items: [
        { type: 'docSidebar', sidebarId: 'gettingStarted', position: 'left', label: 'Getting started' },
        { type: 'docSidebar', sidebarId: 'components', position: 'left', label: 'Components' },
        { type: 'docSidebar', sidebarId: 'utilities', position: 'left', label: 'Utilities' },
      ],
    },
    footer: {
      /*
       * The footer names the project, not where its values came from. Such a
       * note would stand on all 86 pages; it belongs in the repository, not in
       * a page footer.
       */
      style: 'light',
      copyright: 'stackread · A design system built on Ant Design.',
    },
    colorMode: {
      /*
       * The toggle is Docusaurus' own. The ConfigProvider hangs off it rather
       * than standing a second one beside it.
       */
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
