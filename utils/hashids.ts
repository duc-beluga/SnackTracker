import Hashids from "hashids";

const hashids = new Hashids("bobby-singer", 10);

export function encodeId(id: number): string {
  return hashids.encode(id);
}

export function decodeId(hash: string): number {
  const [id] = hashids.decode(hash) as number[];
  return id;
}
