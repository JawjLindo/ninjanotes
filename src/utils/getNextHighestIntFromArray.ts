export const getNextHighestIntFromArray = (arr: number[]): number => {
  return Math.max(...arr) + 1;
};
