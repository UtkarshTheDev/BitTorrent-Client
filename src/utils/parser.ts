import bencode from "bencode";
import crypto from "crypto";
import fs from "fs";
import type { Torrent } from "../types";

export function open(filepath: string): Buffer {
  const fileData = fs.readFileSync(filepath);
  return bencode.decode(fileData);
}

export function size(torrent: Torrent) {
  // ...
}

export function infoHash(torrent: Torrent) {
  const info = bencode.decode(torrent.info);
  return crypto.createHash("sh1").update(info).digest();
}
