import ReactMarkdown from 'react-markdown'

import RefSubLayout from '~/layouts/ref/RefSubLayout'
import { extractTsDocNode } from '~/lib/refGenerator/helpers'

import { IRefFunctionSection } from './Reference.types'
import components from '~/components'

const RefFunctionSection: React.FC<IRefFunctionSection> = (props) => {
  const item = props.spec.functions.find((x: any) => x.id === props.funcData.id)

  // gracefully return nothing if function does not exist
  if (!item) return <></>

  const hasTsRef = item['$ref'] || null

  const tsDefinition =
    hasTsRef && props.typeSpec ? extractTsDocNode(hasTsRef, props.typeSpec) : null
  const shortText = hasTsRef && tsDefinition ? tsDefinition.signatures[0].comment.shortText : ''

  return (
    <>
      <RefSubLayout.Section
        key={item.id}
        title={`${props.commonFuncData.title}`}
        id={item.id}
        slug={props.commonFuncData.slug}
        scrollSpyHeader={true}
      >
        <RefSubLayout.Details>
          <>
            <header className={['prose'].join(' ')}>
              {shortText && <ReactMarkdown className="text-sm">{shortText}</ReactMarkdown>}
            </header>
            {item.description && (
              <div className="prose">
                <ReactMarkdown className="text-sm">{item.description}</ReactMarkdown>
              </div>
            )}
            {item.notes && (
              <div className="prose">
                <ReactMarkdown className="text-sm" components={components}>
                  {item.notes}
                </ReactMarkdown>
              </div>
            )}
          </>
        </RefSubLayout.Details>
      </RefSubLayout.Section>
    </>
  )
}

export default RefFunctionSection
