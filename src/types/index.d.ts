export type Peer = {
  ip: string;
  port: number;
};

export type Torrent = {
  announce: Buffer;
  info: Buffer;
};
