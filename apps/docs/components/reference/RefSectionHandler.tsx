import { useRouter } from 'next/router'
import { useEffect } from 'react'

import RefEducationSection from '~/components/reference/RefEducationSection'
import RefFunctionSection from '~/components/reference/RefFunctionSection'

import RefSubLayout from '~/layouts/ref/RefSubLayout'
import CliCommandSection from './CLICommandSection'
import { IAPISpec, ICommonSection, IRefStaticDoc, ISpec, TypeSpec } from './Reference.types'

interface RefSectionHandlerProps {
  sections: ICommonSection[]
  spec?: ISpec | IAPISpec
  typeSpec?: TypeSpec
  pageProps: { docs: IRefStaticDoc[] }
  type: 'client-lib' | 'cli' | 'api'
  isOldVersion?: boolean
}

const RefSectionHandler = (props: RefSectionHandlerProps) => {
  const router = useRouter()

  const [slug] = router.query.slug

  // When user lands on a url like http://supabase.com/docs/reference/javascript/sign-up
  // find the #sign-up element and scroll to that
  useEffect(() => {
    document.getElementById(slug)?.scrollIntoView()
  }, [slug])

  useEffect(() => {
    function handler() {
      const [slug] = window.location.pathname.split('/').slice(-1)
      document.getElementById(slug)?.scrollIntoView()
    }

    window.addEventListener('popstate', handler)

    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [])

  function getPageTitle() {
    switch (props.type) {
      case 'client-lib':
        return props.spec.info.title
      case 'cli':
        return 'Supabase CLI reference'
      case 'api':
        return 'Supabase API reference'
      default:
        return 'Supabase Docs'
    }
  }

  const pageTitle = getPageTitle()
  const section = props.sections.find((section) => section.slug === slug)

  return (
    <>
      <RefSubLayout>
        {props.sections.map((section, i) => {
          const sectionType = section.type
          switch (sectionType) {
            case 'markdown':
              const markdownData = props.pageProps.docs.find((doc) => doc.id === section.id)

              return (
                <RefEducationSection
                  key={section.id + i}
                  item={section}
                  markdownContent={markdownData}
                />
              )
            case 'function':
              return (
                <RefFunctionSection
                  key={section.id + i}
                  funcData={section}
                  commonFuncData={section}
                  spec={props.spec}
                  typeSpec={props.typeSpec}
                />
              )
            case 'cli-command':
              return (
                <CliCommandSection
                  key={section.id + i}
                  funcData={section}
                  commonFuncData={section}
                />
              )

            default:
              throw new Error(`Unknown common section type '${sectionType}'`)
          }
        })}
      </RefSubLayout>
    </>
  )
}

export default RefSectionHandler
