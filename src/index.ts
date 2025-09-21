import fs from "fs";
import bencode from "bencode";
import { getPeers } from "./utils/tracker";


const torrent_buffer = fs.readFileSync("puppy.torrent");
const torrent = bencode.decode(torrent_buffer);

getPeers(torrent, (peers) => {
    console.log("list of peers", peers);
    return {};
});