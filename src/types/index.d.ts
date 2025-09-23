export type Peer = {
  ip: string;
  port: number;
};

export type Torrent = {
  announce: Buffer;
  info:
    | Buffer
    | ({
        name: string;
        "piece length": number;
        pieces: Buffer;
      } & (
        | { files: { length: number; path: string[] }[]; length?: never }
        | { length: number; files?: never }
      ));
};
