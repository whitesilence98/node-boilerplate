export const getDurationInMilliseconds = (start: [number, number]) => {
   const NS_PER_SEC = 1e9;
   const NS_TO_MS = 1e6;
   const diff = process.hrtime(start);

   const time = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;

   return time.toFixed(2);
};
