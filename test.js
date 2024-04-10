function quickSort(arr) {
  // if (arr.length <= 1) {
  //   return arr;
  // }
  // let sign = arr[0];
  // let leftArr = arr.slice(1).filter((item) => item <= sign);
  // let rightArr = arr.slice(1).filter((item) => item > sign);
  // return quickSort(leftArr).concat([sign]).concat(quickSort(rightArr));

  // for (let i = 0; i < arr.length; i++) {
  //   for (let j = 0; j < arr.length - i; j++) {
  //     if (arr[j] > arr[j + 1]) {
  //       let temp = arr[j];
  //       arr[j] = arr[j + 1];
  //       arr[j + 1] = temp;
  //     }
  //   }
  // }
  // return arr;

  return arr.sort((a, b) => b - a);
}

let numbers = [3, 6, 8, 10, 1, 2, 1, 4, 5, 9];
console.log(quickSort(numbers)); // 输出: [1, 1, 2, 3, 4, 5, 6, 8, 9, 10]
