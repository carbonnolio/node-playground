import request from 'request';
import fs from 'fs';
import zlib from 'zlib';

export const downloadAndSave = (from, to) => {
  request(from).pipe(fs.createWriteStream(to));
}

export const downloadAndSaveGzip = (from, to) => {
  request(from).pipe(zlib.createGzip()).pipe(fs.createWriteStream(to));
}
