import type { NextConfig } from 'next';
import path from 'node:path';
const config: NextConfig = { output:'export',trailingSlash:true,images:{unoptimized:true},basePath:process.env.NEXT_PUBLIC_BASE_PATH||'',distDir:process.env.NEXT_DIST_DIR||'.next',outputFileTracingRoot:path.resolve(process.cwd()) };
export default config;
