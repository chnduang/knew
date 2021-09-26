const fs = require('fs-extra');
const path = require('path');

const { version } = require('../package.json');

// 将版本写入到 components/version/version.tsx
fs.writeFileSync(
  path.join(__dirname, '..', 'components', 'version', 'version.tsx'),
  `export default '${version}'`,
  'utf8',
);
