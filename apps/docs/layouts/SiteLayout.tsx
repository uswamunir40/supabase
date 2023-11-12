import Head from 'next/head'
import { PropsWithChildren, memo } from 'react'


const Container = memo(function Container(props: PropsWithChildren) {
  return (
    <div
      // #docs-content-container is used by layout to scroll to top
      id="docs-content-container"
      className={[
        // 'overflow-x-auto',
        'w-full h-screen transition-all ease-out',
        // 'absolute lg:relative',
'overflow-auto',
        // desktop override any margin styles
        'lg:ml-0',
      ].join(' ')}
    >
      <div className="flex flex-col relative">{props.children}</div>
    </div>
  )
})

const SiteLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Head>
        <title>Supabase Docs</title>
      </Head>
      <main>
        <div className="flex flex-row h-screen">
          <Container>

            <div className="grow">
              {children}
            </div>
          </Container>
        </div>
      </main>
    </>
  )
}

export default SiteLayout
