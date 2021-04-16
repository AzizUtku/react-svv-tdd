/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-extend-native */
import axios from "axios";

const methods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

const urls = {
  URL_NEARBY_CITIES: 'https://wft-geo-db.p.rapidapi.com/v1/geo/locations/{0}%2B{1}/nearbyCities'
}

const apiCall = async (
  url,
  method = methods.GET,
  headers = { "Content-Type": "application/json" }
) => {
  const result = await axios({
    url,
    method,
    headers,
  });
  return result;
};

const fetchNearestCity = async (latitude,longitude) => {
  return apiCall(
    urls.URL_NEARBY_CITIES.format(latitude, longitude),
    methods.GET,
    {
      "x-rapidapi-key": "f3b46d1191msha44f2a865c0c389p1cbcffjsn231ab28d7eba",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      useQueryString: true,
    }
  );
};

String.prototype.format = function () {
  const args = [].slice.call(arguments);
  return this.replace(/(\{\d+\})/g, (a) => args[+a.substr(1, a.length - 2) || 0]);
};

export { fetchNearestCity };
