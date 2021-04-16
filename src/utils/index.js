export const calculateDistanceToEarthCenter = (latitude) => {
  const radiusAtEquator = 6378137;
  const radiusAtPole = 6356752.3;

  latitude *= Math.PI / 180;
  let distance = Math.sqrt(
    (Math.pow(radiusAtEquator * radiusAtEquator * Math.cos(latitude), 2) +
      Math.pow(radiusAtPole * radiusAtPole * Math.sin(latitude), 2)) /
      (Math.pow(radiusAtEquator * Math.cos(latitude), 2) +
        Math.pow(radiusAtPole * Math.sin(latitude), 2))
  );

  const distanceKm = Math.round(distance) / 1000;
  return distanceKm;
};
