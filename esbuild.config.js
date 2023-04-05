const path = require('path');
const rails = require('esbuild-rails');

require('esbuild').build({
  entryPoints: ['accord.tsx'],
  bundle: true,
  sourcemap: true,
  outdir: path.join(process.cwd(), 'app/assets/builds'),
  absWorkingDir: path.join(process.cwd(), 'app/client'),
  watch: process.argv.includes('--watch'),
  plugins: [rails()],
}).catch(() => process.exit(1));