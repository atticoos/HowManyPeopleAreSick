import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import {useTotalCases} from './data/useTotalCases';
import {useHistoricalData, useCombinedHistoricalData} from './data/useHistoricalData';
import {Stats} from './Stats';
import {Sites} from './Sites';
import {CovidMap} from './Map';
import {DateScrubber} from './DateScrubber';

import bg from './images/background.png';
import './App.css';

function useDataForDate(countries, date) {
  countries = countries || [];
  return countries.map(country => ({
    ...country,
    data: country.data.find(d => d.date === date) || country.data[country.data.length - 1]
  }));
}

function useTickingDate (from, to, tickRate = 100) {
  const [date, setDate] = useState(from);

  useEffect(() => {
    const f = moment(from);
    const t = moment(to);
    const d = moment(date);

    if (f.isSameOrAfter(t, 'day') || d.clone().isSameOrAfter(t, 'day')) {
      return;
    }

    const interval = setTimeout(() => {
      setDate(d => moment(d).clone().add(1, 'd').format('M/D/YY'));
    }, tickRate);

    return () => clearTimeout(interval);
  }, [from, to, date]);

  useEffect(() => {
    setDate(from);
  }, [from, to]);

  return date;
}

function App() {
  const combinedData = useCombinedHistoricalData();
  const sampleData = combinedData.data ? combinedData.data[0].data : null;

  const toDate = sampleData ? sampleData[sampleData.length - 1].date : moment().subtract(1, 'day').format('M/D/YY');
  const fromDate = sampleData ? sampleData[0].date : toDate;
  const date = useTickingDate(
    fromDate,
    toDate,
    80
  );
  const dataByDay = useDataForDate(combinedData.data, date);

  return (
    <Container>
      <MapContainer>
        <CovidMap data={dataByDay} />
      </MapContainer>
      <Content>
        <Stats data={dataByDay} />

        <DateScrubberContainer>
          <DateScrubber
            from={fromDate}
            to={toDate}
            date={date}
            onDateChanged={() => {}}
          />
        </DateScrubberContainer>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: #222;
  height: 100%;
`;

const DateScrubberContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const MapContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled.div`
  z-index: 2;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #E5E5E5;
`;

const BG = styled.div`
  z-index: 1;
  position: fixed;
  background-image: url(${bg});
  background-size: cover;
  background-position: 50% 50%;
  opacity: 0.1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default App;
