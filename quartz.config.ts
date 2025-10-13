import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Dumb Tech Blogger",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ko-KR",
    baseUrl: "webplusangels.github.io/dumb-tech-blogger",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // Use Inter for a clean, consistent Latin UI; limit weights for performance
        header: { name: "Inter", weights: [400, 600, 700] },
        body: { name: "Inter", weights: [400, 600] },
        // Keep a readable monospace for code
        code: { name: "IBM Plex Mono", weights: [400, 600] },
      },
      colors: {
        lightMode: {
          // Palette C — warm sage (light)
          light: "#f6f7f2",
          lightgray: "#e9efe6",
          gray: "#c6d0c2",
          darkgray: "#434b45",
          dark: "#2b322f",
          secondary: "#5f7a6d",
          tertiary: "#9fb49f",
          highlight: "rgba(95, 122, 109, 0.12)",
          textHighlight: "#e7f0d688",
        },
        darkMode: {
          // Palette C — warm sage (dark)
          light: "#121512",
          lightgray: "#2b322f",
          gray: "#556157",
          darkgray: "#d7e6d8",
          dark: "#eef6ed",
          secondary: "#7a9086",
          tertiary: "#9fb49f",
          highlight: "rgba(95, 122, 109, 0.12)",
          textHighlight: "#e7f0d688",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
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
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
