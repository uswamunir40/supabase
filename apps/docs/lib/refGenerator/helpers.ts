import { values, mapValues } from 'lodash'
import { OpenAPIV3 } from 'openapi-types'
import { flattenSections } from '../helpers'
import { ICommonItem } from '~/components/reference/Reference.types'

export function extractTsDocNode(nodeToFind: string, definition: any) {
  const nodePath = nodeToFind.split('.')
  let i = 0
  let previousNode = definition
  let currentNode = definition
  while (i < nodePath.length) {
    previousNode = currentNode
    currentNode = previousNode.children.find((x) => x.name == nodePath[i]) || null
    if (currentNode == null) {
      console.log(`Cant find ${nodePath[i]} in ${previousNode.children.map((x) => '\n' + x.name)}`)
      break
    }
    i++
  }

  return currentNode
}

// OPENAPI-SPEC-VERSION: 3.0.0
type v3OperationWithPath = OpenAPIV3.OperationObject & {
  path: string
}

export type enrichedOperation = OpenAPIV3.OperationObject & {
  path: string
  fullPath: string
  operationId: string
  operation: string
  responseList: []
  description?: string
  parameters?: []
  responses?: {}
  security?: []
  summary?: string
  tags?: []
}

export function gen_v3(spec: OpenAPIV3.Document, dest: string, { apiUrl }: { apiUrl: string }) {
  const specLayout = spec.tags || []
  const operations: enrichedOperation[] = []

  Object.entries(spec.paths).forEach(([key, val]) => {
    const fullPath = `${apiUrl}${key}`

    toArrayWithKey(val!, 'operation').forEach((o) => {
      const operation = o as v3OperationWithPath
      const enriched = {
        ...operation,
        path: key,
        fullPath,
        operationId: slugify(operation.summary!),

        responseList: toArrayWithKey(operation.responses!, 'responseCode') || [],
      }
      // @ts-expect-error // missing 'responses', see OpenAPIV3.OperationObject.responses
      operations.push(enriched)
    })
  })

  const sections = specLayout.map((section) => {
    return {
      ...section,
      title: toTitle(section.name),
      id: slugify(section.name),
      operations: operations.filter((operation) => operation.tags?.includes(section.name)),
    }
  })

  const content = {
    info: spec.info,
    sections,
    operations,
  }

  return content
}

const slugify = (text: string) => {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .replace(/[. )(]/g, '-') // Replace spaces and brackets -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

// Uppercase the first letter of a string
const toTitle = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Convert Object to Array of values
 */
export const toArrayWithKey = (obj: object, keyAs: string) =>
  values(
    mapValues(obj, (value: any, key: string) => {
      value[keyAs] = key
      return value
    })
  )

/**
 * Get a list of common section IDs that are available in this spec
 */
export function getAvailableSectionIds(sections: ICommonItem[], spec: any) {
  // Filter parent sections first

  const specIds = spec.functions.map(({ id }) => id)

  const newShape = flattenSections(sections).filter((section) => {
    if (specIds.includes(section.id)) {
      return section
    }
  })

  const final = newShape.map((func) => {
    return func.id
  })

  return final
}
