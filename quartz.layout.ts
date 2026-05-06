import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import OrdoBanner from "./quartz/components/OrdoBanner"
import ALREchoHero from "./quartz/components/ALREchoHero"
import OrdoThreatStrip from "./quartz/components/OrdoThreatStrip"

const isHome = (page: any) => page.fileData.slug === "index" || page.fileData.slug === ""
const isEchoRegistry = (page: any) => page.fileData.slug === "Index/ECHO-Registry"
const isRealityRegistry = (page: any) => page.fileData.slug === "Index/Reality-Registry"
const isOrdo = (page: any) => page.fileData.slug === "Foundations/Opposition/Ordo-Damnatio-Memoriae"
const isEcho = (page: any) => page.fileData.frontmatter?.type === "echo"
const isShop = (page: any) => page.fileData.slug === "Shop"

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
    Component.ALRSoundEngine(),
  ],
  footer: Component.Footer({
    links: {},
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.ALRBanner(),
      condition: (page) => !isHome(page) && !isEchoRegistry(page) && !isRealityRegistry(page) && !isOrdo(page) && !isEcho(page) && !isShop(page),
    }),
    Component.ConditionalRender({
      component: OrdoBanner(),
      condition: isOrdo,
    }),
    Component.ConditionalRender({
      component: OrdoThreatStrip(),
      condition: isOrdo,
    }),
    Component.ConditionalRender({
      component: ALREchoHero(),
      condition: isEcho,
    }),
    Component.ConditionalRender({
      component: Component.ALRHomeDashboard(),
      condition: isHome,
    }),
    Component.ConditionalRender({
      component: Component.ALREchoRegistry(),
      condition: isEchoRegistry,
    }),
    Component.ConditionalRender({
      component: Component.ALRRealityRegistry(),
      condition: isRealityRegistry,
    }),
    Component.ConditionalRender({
      component: Component.ALRShop(),
      condition: isShop,
    }),
  ],
  left: [
    Component.ALRSidebar(),
    Component.ALRTerminalIntrusion(),
  ],
  right: [],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.ALRBanner(),
      condition: (page) => !isHome(page) && !isEchoRegistry(page) && !isRealityRegistry(page) && !isOrdo(page) && !isEcho(page) && !isShop(page),
    }),
    Component.ConditionalRender({
      component: OrdoBanner(),
      condition: isOrdo,
    }),
    Component.ConditionalRender({
      component: OrdoThreatStrip(),
      condition: isOrdo,
    }),
    Component.ConditionalRender({
      component: ALREchoHero(),
      condition: isEcho,
    }),
    Component.ConditionalRender({
      component: Component.ALRHomeDashboard(),
      condition: isHome,
    }),
    Component.ConditionalRender({
      component: Component.ALREchoRegistry(),
      condition: isEchoRegistry,
    }),
    Component.ConditionalRender({
      component: Component.ALRRealityRegistry(),
      condition: isRealityRegistry,
    }),
    Component.ConditionalRender({
      component: Component.ALRShop(),
      condition: isShop,
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !isHome(page) && !isEchoRegistry(page) && !isRealityRegistry(page) && !isEcho(page) && !isShop(page),
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !isHome(page) && !isEchoRegistry(page) && !isRealityRegistry(page) && !isEcho(page) && !isShop(page),
    }),
  ],
  left: [
    Component.ALRSidebar(),
  ],
  right: [],
}