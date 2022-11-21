const deploy = require('./deploy')
jest.mock('@actions/exec', () => ({
  exec: jest.fn(),
}))


const testEnv = {
  AWS_DEFAULT_REGION: '123',
  AWS_ACCESS_KEY_ID: '123',
  AWS_SECRET_ACCESS_KEY: '123',
  AWS_BUCKET: 'bucket',
}
const OLD_ENV = process.env;
beforeEach(() => {
  for (const [key, value] of Object.entries(testEnv)) {
    process.env[key] = value
  }
})

afterEach(() => {
  process.env = OLD_ENV
})

test('throws invalid number', async () => {
  process.env.AWS_DEFAULT_REGION = ''
  await expect(deploy).rejects.toThrow('You need to config env for AWS_DEFAULT_REGION')
})

test('should install awscli', async () => {
  const mockExec = require('@actions/exec').exec
  try {
    await deploy()
  } catch (error) {
    // pass
  }
  await expect(mockExec).toHaveBeenCalledWith('pip3', ['install', 'awscli'])
})

// shows how the runner will run a javascript action with env / stdout protocol
test('should call s3 sync build dir', async () => {
  const mockExec = require('@actions/exec').exec
  mockExec.mockClear()
  process.env.INPUT_BUILDDIR = 'build2'
  await deploy()
  await expect(mockExec).toHaveBeenCalledWith('aws', [
    's3',
    'sync',
    'build2',
    's3://bucket',
  ])
})
