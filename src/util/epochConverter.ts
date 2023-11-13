export const epochConvert = (epoch:number) => {
  const currentDate = new Date();
  const currentEpoch = Math.floor(currentDate.getTime() / 1000); 

  return currentEpoch > epoch;
};

export const epochConvertReverse = (date:string) => {
  const dateString = "2023-11-12T21:59:40.470226";
  const epochTime = new Date(date).getTime() / 1000;

  return epochTime;
};

