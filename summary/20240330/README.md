# 大文件分片上传

main.js

```js
import { cutFile } from "./cutFile.js";
const iptFile = document.querySelector("input");
iptFile.onChange = async (e) => {
  const file = e.target.files[0];
  console.time("cutFile");
  const chunks = await cutFile(file);
  console.timeEnd("cutFile");
  console.log(chunks);
};
```

cutFile.js

```js
import { createChunk } from "./createChunk.js";
const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB
export async function cutFile(file) {
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
  const proms = [];
  for (let index = 0; index < chunkCount; index++) {
    proms.push(createChunk(file, index, CHUNK_SIZE));
  }
  const result = await Promise.all(proms);
  return result;
}
```

createChunk.js

```js
import SparkMD5 from "./sparkmd5.js"; // 创建hash字符串
export function createChunk(file, index, chunkSize) {
  return new Promise((resolve) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob,
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
}
```

此时已经完成了分片，由于是单线程，所以需要依次进行，导致分片效率太慢

> **优化方案：根据设备的内核数，可以开多个线程进行分片**

修改`cutFile.js`

```js
import { cutFile } from "./cutFile.js";
const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB
const THREAD_COUNT = navigator.hardwareConcurrency || 4; // 获取当前设备的内核数
export async function cutFile(file) {
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    const result = [];
    const finishCount = 0;
    for (let index = 0; index < THREAD_COUNT; index++) {
      const worker = new Worker("./worker.js", {
        type: "module",
      });
      let end = (index + 1) * threadChunkCount;
      const start = i * threadChunkCount;
      if (end > chunkCount) {
        end = chunkCount;
      }
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startChunkIndex: start,
        endChunkIndex: end,
      });
      worker.onmessage = (e) => {
        for (let i = start; i < end; i++) {
          result[i] = e.data[i - start];
        }
        worker.terminate();
        finishCount++;
        if (finishCount === THREAD_COUNT) {
          resolve(result);
        }
      };
    }
  });
}
```

```js
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
```

优化后分片效率提高百分之 70%

**二次优化思路：可再分片进行时，先上传完成部分**
