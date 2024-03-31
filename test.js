import { createChunk } from "./createChunk.js";
onmessage = async (e) => {
  const {
    file,
    CHUNK_SIZE,
    startChunkIndex: start,
    endChunkINdex: end,
  } = e.data;
  const proms = [];
  for (let i = 0; i < array.length; i++) {
    proms.push(createChunk(file, i, CHUNK_SIZE));
  }
  const chunks = await Promise.all(proms);
  postMessage(chunks);
};
