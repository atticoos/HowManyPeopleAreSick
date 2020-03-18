import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {useTotalCases} from './data/useTotalCases';
import {useHistoricalData} from './data/useHistoricalData';
import {Stat} from './Stat';
import {Sites} from './Sites';
import {CovidMap} from './Map';

import bg from './images/background.png';
import './App.css';

function useTickingData (data) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!data || index === data[0].confirmedCases.length - 1) return;

    const interval = setTimeout(() => {
      setIndex(i => i + 1);
    }, 100);
    return () => clearTimeout(interval);
  }, [index, data]);

  if (!data) return [];

  return data.map(datum => ({
    ...datum,
    confirmedCases: datum.confirmedCases[index]
  })).filter(datum => !isNaN(datum.confirmedCases));
}

function App() {
  const {loading, data, error} = useTotalCases();
  const historicalData = useHistoricalData();
  const tickingData = useTickingData(historicalData.data);

  const total = tickingData.reduce((total, datum) => total + datum.confirmedCases, 0);



  return (
    <Container>
      {/* <BG /> */}

      <div style={{
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
      <CovidMap
        data={historicalData.data}
      />
      </div>
      <Content>
        <Stat
          number={total} //data ? data.cases : 198178}
          label="confirmed to be sick"
          color="red"
        />
        <Row>
          <div style={{marginRight: 48}}>
            <Stat
              number={data ? data.recovered : 81734}
              label="recovered"
              color="green"
              size="small"
            />
          </div>
          <Stat
            number={data ? data.deaths : 7965}
            label="deaths"
            color="blue"
            size="small"
          />
        </Row>


        {/* <div style={{marginTop: 46}}>
          <Sites />
        </div> */}
      </Content>
    </Container>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  background-color: #222;
  height: 100%;
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
