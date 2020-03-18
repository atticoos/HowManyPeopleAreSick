import React, {useState, useEffect} from 'react';
import {Map, TileLayer, Circle} from 'react-leaflet';

export function CovidMap ({data}) {
  // const [index, setIndex] = useState(0);
  // useEffect(() => {
  //   if (!data) return;

  //   const interval = setTimeout(() => {
  //     if (index >= data[1].confirmedCases.length - 2) {
  //       return;
  //     }

  //     setIndex(i => i + 1);
  //   }, 100);
  //   return () => clearTimeout(interval);
  // }, [index, data]);

  return (
    <div style={{width: '100%', height: '100%'}}>
      <Map center={[30, 0]} zoom={2} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'/>
        {data && <Cases data={data} />}
      </Map>
    </div>
  );
}

const toRadius = cases => {
  if (cases < 10) {
    return 100000;
  } else if (cases < 30) {
    return 200000;
  } else if (cases < 50) {
    return 300000;
  } else if (cases < 100) {
    return 400000;
  } else if (cases < 300) {
    return 500000;
  } else if (cases > 1000) {
    return 600000;
  } else {
    return 900000;
  }
}

function Cases ({data, index}) {
  return (
    <React.Fragment>
      {data.map(datum => {

        const cases = datum.data.confirmed; //datum.confirmedCases[index];
        if (!cases) {
          return null;
        }
        if (isNaN(datum.lat) || isNaN(datum.lng) || isNaN(cases) || datum.lng === 113.4244) {
          // console.log('WTF empty lat or lng', datum)
          return null;
        }
        // console.log('datum', datum)
        const radius = toRadius(cases);

        const lat = isNaN(datum.lat) ? 0 : datum.lat;
        const lng = isNaN(datum.lng) ? 0 : datum.lng;

        return (
          <Circle
            key={`${datum.country}/${datum.province}/${cases}`}
            center={[lat, lng]}
            fillColor="red"
            color="D32329"
            fillOpacity={0.2}
            radius={radius}
          />
        )
      })}
    </React.Fragment>
  )
}
