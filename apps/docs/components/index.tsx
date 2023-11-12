import Link from 'next/link'
import { Alert, Button, CodeBlock, GlassPanel, markdownComponents, Tabs } from 'ui'

// Other components
import RefSubLayout from '~/layouts/ref/RefSubLayout'
import { CH } from '@code-hike/mdx/components'
import RefHeaderSection from './reference/RefHeaderSection'

// Ref version specific
import CliGlobalFlagsHandler from '~/components/reference/enrichments/cli/CliGlobalFlagsHandler'

import Options from '~/components/Options'
import Param from '~/components/Params'

import { Admonition } from 'ui'

const components = {
  ...markdownComponents,
  Admonition,
  Button,
  CH,
  CodeBlock,
  GlassPanel,
  Link,
  Alert: (props: any) => (
    <Alert {...props} className="not-prose">
      {props.children}
    </Alert>
  ),
  Tabs,
  TabPanel: (props: any) => <Tabs.Panel {...props}>{props.children}</Tabs.Panel>,
  RefSubLayout,
  RefHeaderSection: (props: any) => <RefHeaderSection {...props} />,
  CliGlobalFlagsHandler: () => <CliGlobalFlagsHandler />,
  Options,
  Param,
}

export default components
