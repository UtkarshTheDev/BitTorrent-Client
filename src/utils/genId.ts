import crypto from "crypto";

const PEER_ID_LENGTH_BYTES = 20;
let id: Buffer | null = null;

export function genId() {
  if (!id) {
    id = crypto.randomBytes(PEER_ID_LENGTH_BYTES);
    Buffer.from("-AT0001-").copy(id, 0);
  }
  return id;
}
