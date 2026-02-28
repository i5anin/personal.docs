// dump-src.js
'use strict'

import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(process.cwd(), '.env'), override: true })

const TARGET = process.env.DUMP_TARGET || path.join(process.cwd(), 'src')
const TARGET_API = (process.env.DUMP_TARGET_API || '').trim()

const isText = (p) =>
  /\.(cjs|mjs|js|ts|tsx|jsx|json|md|yml|yaml|env|txt|php)$/i.test(p)

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : p
  })

const rel = (p) => path.relative(process.cwd(), p).replace(/\\/g, '/')
const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n').trimEnd()

const listFiles = (target) =>
  target && fs.existsSync(target)
    ? walk(target).filter((p) => fs.statSync(p).isFile() && isText(p))
    : []

// если API-путь не указан — ничего не выводим
if (!TARGET_API) process.exit(0)

const files = [...listFiles(TARGET), ...listFiles(TARGET_API)]
if (!files.length) process.exit(0)

for (const f of files.sort((a, b) => rel(a).localeCompare(rel(b)))) {
  console.log(`\n=== ${rel(f)} ===\n`)
  console.log('```')
  console.log(read(f))
  console.log('```')
}
