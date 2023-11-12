import '../../../packages/ui/build/css/themes/dark.css'
import '../../../packages/ui/build/css/themes/light.css'

import '@code-hike/mdx/styles'
import 'config/code-hike.scss'
import '../styles/main.scss?v=1.0.0'
import '../styles/new-docs.scss'
import '../styles/prism-okaidia.scss'

import { createClient } from '@supabase/supabase-js'
import { ThemeProvider } from 'common'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AppPropsWithLayout } from 'types'
import { CommandMenuProvider } from 'ui'
import { TabsProvider } from 'ui/src/components/Tabs'
import PortalToast from 'ui/src/layout/PortalToast'
import SiteLayout from '~/layouts/SiteLayout'
import { IS_PLATFORM } from '~/lib/constants'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()

  const [supabase] = useState(() =>
    IS_PLATFORM
      ? createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )
      : undefined
  )

  /**
   * Save/restore scroll position when reloading or navigating back/forward.
   *
   * Required since scroll happens within a sub-container, not the page root.
   */
  useEffect(() => {
    const storageKey = 'scroll-position'

    const container = document.getElementById('docs-content-container')
    if (!container) {
      return
    }

    const previousScroll = Number(sessionStorage.getItem(storageKey))
    const [entry] = window.performance.getEntriesByType('navigation')

    // Only restore scroll position on reload and back/forward events
    if (
      previousScroll &&
      entry &&
      isPerformanceNavigationTiming(entry) &&
      ['reload', 'back_forward'].includes(entry.type)
    ) {
      container.scrollTop = previousScroll
    }

    const handler = () => {
      // Scroll stored in session storage, so only persisted per tab
      sessionStorage.setItem(storageKey, container.scrollTop.toString())
    }

    window.addEventListener('beforeunload', handler)

    return () => window.removeEventListener('beforeunload', handler)
  }, [router])

  /**
   * Reference docs use `history.pushState()` to jump to
   * sub-sections without causing a re-render.
   *
   * We need to the below handler to manually force a re-render
   * when navigating away from, then back to reference docs
   */
  useEffect(() => {
    function handler() {
      router.replace(window.location.href)
    }

    window.addEventListener('popstate', handler)

    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [router])

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <CommandMenuProvider site="docs">
          <TabsProvider>
            <SiteLayout>
              <PortalToast />
              <Component {...pageProps} />
            </SiteLayout>
          </TabsProvider>
        </CommandMenuProvider>
      </ThemeProvider>
    </>
  )
}

/**
 * Type guard that checks if a performance entry is a
 * `PerformanceNavigationTiming`.
 */
function isPerformanceNavigationTiming(
  entry: PerformanceEntry
): entry is PerformanceNavigationTiming {
  return entry.entryType === 'navigation'
}

export default MyApp
