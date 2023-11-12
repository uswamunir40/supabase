import { MDXProvider } from '@mdx-js/react'
import { FC, useEffect, useRef, useState } from 'react'
import components from '~/components'
import { LayoutMainContent } from '../DefaultLayout'

interface Props {
  meta: {
    title: string
    description?: string // used in meta tags
    hide_table_of_contents?: boolean
    breadcrumb?: string
    subtitle?: string // used on the page under the H1
    footerHelpType?: any
    video?: string
    tocVideo?: string
    canonical?: string
  }
  children: any
  toc?: any
  currentPage?: string
  hideToc?: boolean
}

const Layout: FC<Props> = (props) => {
  const articleRef = useRef()
  const [tocList, setTocList] = useState([])

  useEffect(() => {
    const articleEl = articleRef.current as HTMLElement

    if (!articleRef.current) return
    const headings = Array.from(articleEl.querySelectorAll('h2, h3'))
    const newHeadings = headings
      .filter((heading) => heading.id)
      .map((heading) => {
        const text = heading.textContent.replace('#', '')
        const link = heading.querySelector('a').getAttribute('href')
        const level = heading.tagName === 'H2' ? 2 : 3
        return { text, link, level }
      })
    setTocList(newHeadings)
  }, [])

  const hasTableOfContents = tocList.length > 0

  return (
    <>
      <LayoutMainContent className="pb-0">
        <div className={['grid grid-cols-12 relative gap-4'].join(' ')}>
          <div
            className={[
              'relative',
              !props.hideToc ? 'col-span-12 md:col-span-9' : 'col-span-12',
              'transition-all ease-out',
              'duration-100',
            ].join(' ')}
          >
            {props.meta.breadcrumb && (
              <p className="text-brand tracking-wider mb-3">{props.meta.breadcrumb}</p>
            )}
            <article
              ref={articleRef}
              className={`${
                props.meta?.hide_table_of_contents || !hasTableOfContents ? '' : ''
              } prose dark:prose-dark max-w-none`}
            >
              <h1 className="mb-0">{props.meta.title}</h1>
              {props.meta.subtitle && (
                <h2 className="mt-3 text-xl text-foreground-light">{props.meta.subtitle}</h2>
              )}
              <div className="w-full border-b my-8"></div>
              <MDXProvider components={components}>{props.children}</MDXProvider>
            </article>
          </div>
        </div>
      </LayoutMainContent>
    </>
  )
}

export default Layout
