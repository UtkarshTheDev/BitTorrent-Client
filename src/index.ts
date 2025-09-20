import fs from "fs";
import bencode from "bencode";
import dgram from "dgram";
import { Buffer } from "buffer";


const torrent_buffer = fs.readFileSync("puppy.torrent");
const torrent = bencode.decode(torrent_buffer);

const announceUrl = Buffer.from(torrent.announce).toString("utf-8");
const url = new URL(announceUrl);

const socket = dgram.createSocket("udp4");
const myMsg = Buffer.from("Hello, World!", "utf-8");

socket.send(myMsg, 0, myMsg.length, Number.parseInt(url.port), url.hostname, ()=>{})

socket.on("message", msg => {
    console.log(msg.toString("utf-8"));
})