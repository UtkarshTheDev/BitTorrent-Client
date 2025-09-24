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

function onWholeMsg(socket: Socket, callback: (data: Buffer) => void) {
  let savedBuf = Buffer.alloc(0);
  let handshake = true;

  socket.on("data", (recvBuf) => {
    // msgLen calculates the length of a whole message
    const msgLen = () =>
      handshake ? savedBuf.readUInt8(0) + 49 : savedBuf.readInt32BE(0) + 4;
    savedBuf = Buffer.concat([savedBuf, recvBuf]);

    while (savedBuf.length >= 4 && savedBuf.length >= msgLen()) {
      callback(savedBuf.slice(0, msgLen()));
      savedBuf = savedBuf.slice(msgLen());
      handshake = false;
    }
  });
}
