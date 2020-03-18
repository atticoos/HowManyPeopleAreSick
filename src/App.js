import React from 'react';
import styled from '@emotion/styled';
import {useTotalCases} from './data/useTotalCases';
import {Stat} from './Stat';
import {Sites} from './Sites';
import bg from './images/background.png';
import './App.css';

function App() {
  const {loading, data, error} = useTotalCases();

  return (
    <Container>
      <BG />
      <Content>
        <Stat
          number={data ? data.cases : 198178}
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
        <div style={{marginTop: 46}}>
          <Sites />
        </div>
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
