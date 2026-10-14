import {spawnSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const name=process.env.GITHUB_REPOSITORY?.split('/')[1]||'';
const base=process.env.NEXT_PUBLIC_BASE_PATH??(name&&!name.endsWith('.github.io')?'/'+name:'');
// The default Next build directory produces the canonical out/ export.
// A custom distDir also changes the export destination, so do not inherit it.
const result=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build'],{stdio:'inherit',env:{...process.env,NEXT_PUBLIC_BASE_PATH:base,NEXT_DIST_DIR:'.next'}});
if(result.status!==0)process.exit(result.status||1);
writeFileSync('out/.nojekyll','');
console.log(`GitHub Pages build complete. Base path: ${base||'/'}`);
