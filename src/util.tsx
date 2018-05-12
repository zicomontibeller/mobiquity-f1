export const endpoint:string = "http://ergast.com/api/f1";

export const seasons:number[] = Array.from(Array(11),(x,i)=>i+2005);
export const getLastSeason = () => seasons[seasons.length-1];
export const getFirstSeason = () => seasons[0];

export const shortifyNation = (nationality:string) => {
  console.log(nationality)
  const nations = {
    australian: "au",
    brazilian: "br",
    british: "gb",
    colombian: "co",
    finnish: "fi",
    german: "de",
    italian: "it",
    polish: "pl",
    spanish: "es",
    venezuelan: "ve"
  }
  return nations[nationality.toLowerCase()] || "";
};
