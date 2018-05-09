export const endpoint:string = "http://ergast.com/api/f1";

export const seasons:number[] = Array.from(Array(11),(x,i)=>i+2005);
export const getLastSeason = () => seasons[seasons.length-1];
export const getFirstSeason = () => seasons[0];
