
const exec = require('@actions/exec')
const core = require('@actions/core')

const deploy = async () => {
  await exec.exec('pip3', ['install', 'awscli'])

  const defaultEnvs = {
    AWS_DEFAULT_REGION: '',
    AWS_ACCESS_KEY_ID: '',
    AWS_SECRET_ACCESS_KEY: '',
    AWS_BUCKET: '',
  }
  for (const [key, _value] of Object.entries(defaultEnvs)) {
    core.debug(`Checking env ${key}`)
    const envValue = process.env[key]
    if (!envValue) {
      throw new Error(`You need to config env for ${key}`)
    }
  }
  const buildDir = core.getInput('buildDir')
  await exec.exec('aws', [
    's3',
    'sync',
    buildDir,
    `s3://${process.env.AWS_BUCKET}`,
  ])
}

module.exports = deploy;
