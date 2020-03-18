import {useHttpState} from './useHttpState';
import { useEffect } from 'react';

function loadHistoricalData () {
  return fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv')
    .then(resp => resp.text())
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
