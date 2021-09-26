const knew = require('./components');

const req = require.context('./components', true, /^\.\/locale\/.+_.+\.tsx$/);

knew.locales = {};

req.keys().forEach(mod => {
  const matches = mod.match(/\/([^/]+).tsx$/);
  knew.locales[matches[1]] = req(mod).default;
});

module.exports = knew;
