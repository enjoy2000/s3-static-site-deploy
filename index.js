const core = require('@actions/core')
const deploy = require('./deploy')

async function run() {
  try {
    await deploy()
    core.success('Deploy successfully')
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
  }
}

run();
