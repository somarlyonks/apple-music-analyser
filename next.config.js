const withTM = require('next-transpile-modules')([
    '@csszen/components.flex',
])

module.exports = withTM({
    webpack5: true,
})
