const { readPkg } = require('./util')

module.exports = pkgsInfo => {
  let newPkg = null
  const pkg = readPkg()
  if (pkg.devDependencies) {
    newPkg = {
      ...pkg,
      devDependencies: {
        ...pkg.devDependencies,
        ...pkgsInfo,
      },
    }
  } else {
    newPkg = {
      ...pkg,
      devDependencies: pkgsInfo,
    }
  }
  return newPkg
}
