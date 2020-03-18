import {useHttpState} from './useHttpState';
import { useEffect } from 'react';

const CONFIRMED_ENDPOINT = 'time_series_19-covid-Confirmed.csv';
const RECOVERED_ENDPOINT = 'time_series_19-covid-Recovered.csv';
const DEATHS_ENDPOINT = 'time_series_19-covid-Deaths.csv';

function loadEndpoint(endpoint) {
  return fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/${endpoint}`)
    .then(resp => resp.text());
}

function loadHistoricalData () {
  return loadEndpoint('time_series_19-covid-Confirmed.csv')
    .then(csv => {
      const rows = csv.split('\n');
      const data = rows.map(row => row.split(','));
      return parseData(data);
    })
}

function parseData (rawData) {
  const [header, ...rows] = rawData;

  const data = rows.map(columns => {
    const [province, country, lat, lng, ...confirmedCases] = columns;
    return {
      country,
      province,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      confirmedCases: confirmedCases.map(count => parseInt(count))
    };
  });

  return data;
}

function loadData() {
  return Promise.all([
    loadEndpoint(CONFIRMED_ENDPOINT),
    loadEndpoint(RECOVERED_ENDPOINT),
    loadEndpoint(DEATHS_ENDPOINT)
  ]).then(csvs => {
    const [confirmed, recovered, deaths] = csvs.map(csv => {
      const csvRows = csv.split('\n');
      const [header, ...rows] = csvRows.map(row => row.split(','));

      const [,,,, ...dates] = header;

      const data = rows.map(row => {
        let [province, country, lat, lng, ...data] = row;
        country = country && country.trim();
        province = province && province.trim();

        return {
          key: `${country}/${province}`,
          country,
          province,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          data: data.map((d, i) => ({
            date: dates[i] && dates[i].trim(),
            value: parseInt(d)
          })).filter(d => !!d.date)
        };
      });

      return data;
    })
    return {confirmed, recovered, deaths};
  })
}

function mergeData (confirmed, recovered, deaths) {
  return confirmed.map(confirmedRecord => {
    const recoveredRecord = recovered.find(r => r.key === confirmedRecord.key);
    const deathsRecord = deaths.find(d => d.key === confirmedRecord.key);

    return {
      ...confirmedRecord,
      data: confirmedRecord.data.map(confirmedData => {
        const confirmed = confirmedData.value;
        const recoveredData = recoveredRecord && recoveredRecord.data.find(d => d.date === confirmedData.date);
        const deathsData = deathsRecord && deathsRecord.data.find(d => d.date === confirmedData.date)
        const recovered = recoveredData && recoveredData.value;
        const deaths = deathsData && deathsData.value;
        return {
          date: confirmedData.date,
          confirmed,
          recovered,
          deaths
        };
      })
    }
  })
}

export function useCombinedHistoricalData() {
  const httpState = useHttpState();

  useEffect(() => {
    httpState.setLoading();
    loadData()
      .then(({confirmed, recovered, deaths}) => httpState.setData(mergeData(confirmed, recovered, deaths)))
      .catch(error => httpState.setError(error));
  }, []);

  return {
    loading: httpState.loading,
    error: httpState.error,
    data: httpState.data
  };

}

export function useHistoricalData() {
  const httpState = useHttpState();

  useEffect(() => {
    httpState.setLoading();
    loadHistoricalData()
      .then(data => httpState.setData(data))
      .catch(error => httpState.setError(error));
  }, []);

  return {
    loading: httpState.loading,
    error: httpState.error,
    data: httpState.data
  };
}
