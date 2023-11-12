import type { NavMenuConstant, References } from '../Navigation.types'

export const REFERENCES: References = {
  cli: {
    name: 'CLI',
    library: undefined,
    versions: [],
    icon: '/docs/img/icons/cli-icon.svg',
  },
}

export const cli = {
  title: 'CLI',
  items: [
    { name: 'Overview', url: '/guides/cli' },
    { name: 'Managing Environments', url: '/guides/cli/managing-environments' },
    {
      name: 'Using environment variables in config.toml',
      url: '/guides/cli/using-environment-variables-in-config',
    },
  ],
}

export const supabase_cli: NavMenuConstant = {
  icon: 'reference-cli',
  title: 'Local Dev / CLI',
  url: '/guides/cli',
  items: [
    { name: 'Overview', url: '/guides/cli' },
    {
      name: 'Using the CLI',
      url: undefined,
      items: [
        { name: 'Getting started', url: '/guides/cli/getting-started' },
        { name: 'CLI Configuration', url: '/guides/cli/config' },
      ],
    },
    {
      name: 'Developing with Supabase',
      url: undefined,
      items: [
        { name: 'Local Development', url: '/guides/cli/local-development' },
        { name: 'Managing environments', url: '/guides/cli/managing-environments' },
        {
          name: 'Managing config and secrets',
          url: '/guides/cli/managing-config',
        },
        {
          name: 'Seeding your database',
          url: '/guides/cli/seeding-your-database',
        },
        {
          name: 'Testing and linting',
          url: '/guides/cli/testing-and-linting',
        },
        {
          name: 'Customizing email templates',
          url: '/guides/cli/customizing-email-templates',
        },
      ],
    },
  ],
}

export const resources: NavMenuConstant = {
  icon: 'resources',
  title: 'Resources',
  url: '/guides/resources',
  items: [
    { name: 'Examples', url: '/guides/resources/examples' },
    { name: 'Glossary', url: '/guides/resources/glossary' },
    {
      name: 'Migrate to Supabase',
      url: '/guides/resources/migrating-to-supabase',
      items: [
        {
          name: 'Firebase Auth',
          url: '/guides/resources/migrating-to-supabase/firebase-auth',
        },
        {
          name: 'Firestore Data',
          url: '/guides/resources/migrating-to-supabase/firestore-data',
        },
        {
          name: 'Firebase Storage',
          url: '/guides/resources/migrating-to-supabase/firebase-storage',
        },
        {
          name: 'Heroku',
          url: '/guides/resources/migrating-to-supabase/heroku',
        },
        {
          name: 'Render',
          url: '/guides/resources/migrating-to-supabase/render',
        },
        {
          name: 'Amazon RDS',
          url: '/guides/resources/migrating-to-supabase/amazon-rds',
          items: [],
        },
        {
          name: 'Postgres',
          url: '/guides/resources/migrating-to-supabase/postgres',
          items: [],
        },
        {
          name: 'MySQL',
          url: '/guides/resources/migrating-to-supabase/mysql',
          items: [],
        },
        {
          name: 'MSSQL',
          url: '/guides/resources/migrating-to-supabase/mssql',
          items: [],
        },
      ],
    },
  ],
}

export const reference = {
  title: 'API Reference',
  icon: 'reference',
  items: [
    {
      name: 'Other tools',
      items: [
        {
          name: 'Supabase CLI',
          url: '/reference/cli/start',
          icon: '/img/icons/menu/reference-cli',
        },
      ],
    },
  ],
}

export const reference_cli = {
  icon: 'reference-cli',
  title: 'Supabase CLI',
  url: '/guides/reference/cli',
  parent: '/',
}
