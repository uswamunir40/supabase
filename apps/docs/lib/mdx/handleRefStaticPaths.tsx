import { ICommonSection } from '~/components/reference/Reference.types'

async function handleRefGetStaticPaths(sections: ICommonSection[]) {
  // In preview environments, don't generate static pages (faster builds)
  if (true) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  // In production, generate static pages for every sub-section (better SEO)
  return {
    paths: sections.map((section) => {
      console.log({ section })
      return {
        params: {
          slug: [section.slug],
        },
      }
    }),
    fallback: 'blocking',
  }
}

export default handleRefGetStaticPaths
