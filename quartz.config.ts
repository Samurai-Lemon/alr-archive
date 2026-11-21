import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "ALR Initiative — Archive",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "alrinitiative.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        // Night Index palette — keep in sync with the --alr-* tokens at the top of custom.scss.
        lightMode: {
          light: "#f6f3ec",
          lightgray: "#e3ddd1",
          gray: "#6b6258",
          darkgray: "#4f4740",
          dark: "#1f1b17",
          secondary: "#96503a",
          tertiary: "#a85c42",
          highlight: "rgba(168, 92, 66, 0.08)",
          textHighlight: "rgba(168, 92, 66, 0.15)",
        },
        darkMode: {
          light: "#121110",
          lightgray: "#262420",
          gray: "#9a9488",
          darkgray: "#b3ada2",
          dark: "#ede8de",
          secondary: "#e09a7e",
          tertiary: "#cc785c",
          highlight: "rgba(204, 120, 92, 0.08)",
          textHighlight: "rgba(204, 120, 92, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config