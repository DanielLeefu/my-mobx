const { addDecoratorsLegacy, override, } = require('customize-cra');
module.exports = override(
  // 添加装饰器
  addDecoratorsLegacy(),
);