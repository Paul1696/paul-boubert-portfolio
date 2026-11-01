const path = require('path');
if (!process.env.NEXT_TEST_WASM_DIR) {
  process.env.NEXT_TEST_WASM_DIR = path.resolve(__dirname, 'node_modules/next/wasm');
}
