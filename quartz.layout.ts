import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Search(),
    Component.ALRTopNav(),
    Component.Darkmode(),
    Component.ReaderMode(),
  ],
  afterBody: [
    Component.ConditionalRender({
      component: Component.ALRRecentEchoes(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.ALRRecentRealities(),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
  footer: Component.Footer({
    links: {},
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.ALRBanner(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.ALRSidebar(),
  ],
  right: [],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.ALRBanner(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.ALRSidebar(),
  ],
  right: [],
}