import { Socket } from "node:net";
import type { Peer, Torrent } from "../types";
import { getPeers } from "./tracker";

export function torrent(torrents: Torrent) {
  getPeers(torrents, (peers) => {
    peers.forEach(download);
  });
}

function download(peer: Peer) {
  const socket = new Socket();
  socket.connect(peer.port, peer.ip);
  socket.on("data", (data) => {
    console.log(data);
  });
  socket.on("error", (error) => {
    console.error(error);
  });
  socket.on("end", () => {
    console.log("end");
  });
}
