import { Buffer } from "buffer";
import dgram from "dgram";
import crypto from "crypto";

interface Peer {
    ip: string;
    port: number;
}

export function getPeers(torrent: any, callback: (peers: Peer[]) => void) {
    const socket = dgram.createSocket("udp4");
    const url = torrent.announce.toString("utf-8");

    udpSend(socket,buildConnReq(),url,callback);

    // socket.on("message", msg => {
    //     if (respType(msg) === "connect") {
    //         const connResp = parseConnResp(msg);
    //         const announceReq = buildAnnounceReq(connResp.connectionId);
    //         udpSend(socket,announceReq,url,callback);
    //     } else if (respType(msg) === "announce") {
    //         const announceResp = parseAnnounceResp(msg);
    //         callback(announceResp.peers);
    //     }
    // });

}


function udpSend(socket: any, msg: Buffer, rawUrl: string, callback: (peers: Peer[]) => void) {
    const url = new URL(rawUrl);
    socket.send(msg, 0, msg.length, url.port, url.hostname, callback)
}

function respType(resp: Buffer) {
  // ...
}

function buildConnReq() {
    const buf = Buffer.alloc(16);

    buf.writeUInt32BE(0x417, 0); // connection id part 1
    buf.writeUInt32BE(0x27101980, 4);
    buf.writeUInt32BE(0, 8); // action (0 = connect)

    crypto.randomBytes(4).copy(buf, 12); // transaction id

    return buf;
}

function parseConnResp(resp: Buffer) {
  return {
    action: resp.readUInt32BE(0),
    transactionId: resp.readUInt32BE(4),
    connectionId: resp.slice(8, 16),
  };
}

function buildAnnounceReq(connId: number) {
  // ...
}

function parseAnnounceResp(resp: Buffer) {
  // ...
}