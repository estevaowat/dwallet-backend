const chunk = (arr: Array<any>, size: number) =>
   Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size),
   );

export default chunk;
