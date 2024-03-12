import * as pkg from '@/package.json';

export default defineEventHandler(() => {
  return pkg.version;
});
