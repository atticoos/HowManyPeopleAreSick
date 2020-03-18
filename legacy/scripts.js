function loadLatestData () {
  return fetch(`https://corona.lmao.ninja/all`).then(resp => resp.json())
}

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

function getTotalCases(data) {
  return data.reduce((total, datum) => {
    const latest = datum.confirmedCases[datum.confirmedCases.length - 1];
    return total + latest;
  }, 0);
}

// loadHistoricalData().then(data => {
//   console.log('data', data)
//   console.log('total cases', getTotalCases(data));
// });


loadLatestData().then(data => console.log('data', data));
