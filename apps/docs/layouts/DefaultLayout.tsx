import { MDXProvider } from '@mdx-js/react'
import { FC, PropsWithChildren } from 'react'
import components from '~/components'

interface Props {
  meta: {
    title: string
    description?: string
    hide_table_of_contents?: boolean
    video?: string
    tocVideo?: string
    canonical?: string
  }
  children: any
  toc?: any
  menuItems: any
}

const Layout: FC<Props> = (props: Props) => {
  return (
    <>
      <LayoutMainContent>
        <div className={['relative transition-all ease-out', 'duration-150 '].join(' ')}>
          <article className="prose dark:prose-dar max-w-none">
            <h1>{props.meta.title}</h1>
            <MDXProvider components={components}>{props.children}</MDXProvider>
          </article>
        </div>

      </LayoutMainContent>
    </>
  )
}

export const LayoutMainContent: FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => <div className={['max-w-7xl px-5 mx-auto py-16', className].join(' ')}>{children}</div>

export default Layout
