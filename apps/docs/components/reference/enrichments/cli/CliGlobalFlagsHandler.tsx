import RefSubLayout from '~/layouts/ref/RefSubLayout'

import spec from '~/spec/cli_v1_commands.yaml' assert { type: 'yaml' }

const CliGlobalFlagsHandler = () => {
  return (
    <RefSubLayout.EducationRow className="not-prose">
      <RefSubLayout.Details>
        <h3 className="text-lg text-foreground mb-3">Flags</h3>
        <ul className="">
          {spec.flags.map((flag) => {
            return <div key={flag.id}>{JSON.stringify(flag)}</div>
          })}
        </ul>
      </RefSubLayout.Details>
    </RefSubLayout.EducationRow>
  )
}

export default CliGlobalFlagsHandler
