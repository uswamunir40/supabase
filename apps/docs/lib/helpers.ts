import { ICommonBase, ICommonItem, ICommonSection } from '../components/reference/Reference.types'

// menus to render in the SideBar.js (Ref Nav.constants.ts)
export function getPageType(asPath: string) {
  let page
  if (!asPath) return ''

  if (asPath.includes('/guides')) {
    page = 'docs'
  } else if (asPath.includes('/reference/cli')) {
    page = 'reference/cli'
  } else if (asPath.includes('/reference')) {
    page = 'reference'
  } else {
    page = 'docs'
  }

  return page
}

/**
 * Flattens common sections recursively by their `items`.
 *
 * _Note:_ `sections` type set to `ICommonBase[]` instead of
 * `ICommonItem[]` until TypeScript supports JSON imports as const:
 * https://github.com/microsoft/TypeScript/issues/32063
 */
export function flattenSections(sections: ICommonBase[]): ICommonSection[] {
  return sections.reduce<ICommonSection[]>((acc, section: ICommonItem) => {
    // Flatten sub-items
    if ('items' in section) {
      let newSections = acc

      if (section.type !== 'category') {
        newSections.push(section)
      }

      return newSections.concat(flattenSections(section.items))
    }
    return acc.concat(section)
  }, [])
}
