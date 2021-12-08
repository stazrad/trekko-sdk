import * as iframeResizer from 'iframe-resizer'
import { WidgetConfig } from './types'

export function init () {
  const elements = document.querySelectorAll('a.trekko-widget')

  elements.forEach(element => {
    const organizationId = element.attributes.getNamedItem('data-org-id')?.value

    if (!organizationId) return console.warn('<a> element must have data-org-id to load Trekko!')

    embed({ organizationId }, element)
  })
}
init()

export function embed (config: WidgetConfig, element: Element) {
  element.innerHTML = ''

  const url = `https://web.trekko.app/widget/trail-list?organizationId=${config.organizationId}&host=${window.location.href}`
  const style = `display:block;width:100%;border:0px;background-color:black;`
  const iframe = document.createElement('iframe')

  iframe.setAttribute('src', url)
  iframe.setAttribute('style', style)

  element.appendChild(iframe)
  iframeResizer.iframeResizer({ log: false }, iframe)
}
