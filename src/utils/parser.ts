import bencode from "bencode";
import bignum from "bignum";
import crypto from "crypto";
import fs from "fs";
import type { Torrent } from "../types";

type DecodedInfo = {
  files?: { length: number; path: string[] }[];
  length?: number;
};

export function open(filepath: string): Buffer {
  const fileData = fs.readFileSync(filepath);
  return bencode.decode(fileData);
}

export function size(torrent: Torrent) {
  const info = bencode.decode(torrent.info) as DecodedInfo;
  if (info.files) {
    const totalSize = info.files
      .map((file) => file.length)
      .reduce((a, b) => a + b, 0);
    return bignum.toBuffer(totalSize, { size: 8, endian: "big" });
  }
  return bignum.toBuffer(info.length ?? 0, { size: 8, endian: "big" });
}
export function infoHash(torrent: Torrent) {
  const info = bencode.encode(bencode.decode(torrent.info));
  return crypto.createHash("sha1").update(info).digest();
}
