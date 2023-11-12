import CliGenerator from './cli'
import { parseArgs } from 'node:util'
import { strict as assert } from 'node:assert'

const args = parseArgs({
  options: {
    input: {
      type: 'string',
    },
    output: {
      type: 'string',
      short: 'n',
    },
    type: {
      type: 'string',
      short: 'n',
    },
    url: {
      type: 'string',
      short: 'n',
    },
  },
})

const allowedTypes = ['cli', 'config', 'sdk', 'api', 'legacy'] as const
type AllowedType = (typeof allowedTypes)[number]

assert(args.values.input, 'input is required')
assert(args.values.output, 'output is required')
assert(allowedTypes.includes(args.values.type as AllowedType), 'type is required')

DocGenerator({
  input: args.values.input,
  output: args.values.output,
  type: args.values.type as AllowedType,
  url: args.values.url,
})

export default async function DocGenerator({
  input,
  output,
  type,
  url,
}: {
  input: string
  output: string
  type: AllowedType
  url?: string
}) {
  switch (type) {
    case 'cli':
      await CliGenerator(input, output)
      break

    default:
      await console.log('Unrecognized type: ', type)
      break
  }
  return 'Done'
}
