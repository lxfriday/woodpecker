const checkVersion = require('./checkVersion')
const { getWoodpeckerVersion } = require('../util')

it('check new version', async () => {
  const newVer = await checkVersion()
  const verRight = typeof newVer === 'string' && newVer >= getWoodpeckerVersion()
  expect(verRight).toBe(true)
})
