import bencode from "bencode";
import fs from "fs";
import { getPeers } from "./utils/tracker";

const torrent_buffer = fs.readFileSync("puppy.torrent");
const torrent = bencode.decode(torrent_buffer);

getPeers(torrent, (peers) => {
  console.log("list of peers", peers);
  return {};
});
