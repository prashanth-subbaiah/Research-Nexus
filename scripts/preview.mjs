import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');
const base=process.env.NEXT_PUBLIC_BASE_PATH||'';
const port=Number(process.env.PREVIEW_PORT||3000);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon','.txt':'text/plain','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
 try{
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(base){if(pathname===base){res.writeHead(302,{Location:base+'/'});res.end();return}if(!pathname.startsWith(base+'/')){res.writeHead(404);res.end('Not found');return}pathname=pathname.slice(base.length)}
  let file=path.resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return}
  try{if((await stat(file)).isDirectory())file=path.join(file,'index.html')}catch{}
  try{const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body)}catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(path.join(root,'404.html')).catch(()=>Buffer.from('Not found')))}
 }catch{res.writeHead(400);res.end('Bad request')}
}).listen(port,'127.0.0.1',()=>console.log(`Research Nexus preview: http://127.0.0.1:${port}${base}/`));
