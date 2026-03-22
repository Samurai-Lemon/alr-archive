import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const isHome = (page: any) => page.fileData.slug === "index" || page.fileData.slug === ""

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Search(),
    Component.ALRTopNav(),
    Component.Darkmode(),
    Component.ReaderMode(),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.ALRHomeDashboard(),
      condition: isHome,
    }),
    Component.ConditionalRender({
      component: Component.ALRBanner(),
      condition: (page) => !isHome(page),
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
      component: Component.ALRHomeDashboard(),
      condition: isHome,
    }),
    Component.ConditionalRender({
      component: Component.ALRBanner(),
      condition: (page) => !isHome(page),
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !isHome(page),
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !isHome(page),
    }),
  ],
  left: [
    Component.ALRSidebar(),
  ],
  right: [],
}