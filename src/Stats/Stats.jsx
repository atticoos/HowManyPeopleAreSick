import React from 'react';
import styled from '@emotion/styled';
import {Stat} from './Stat';

export function Stats ({data}) {
  if (!data) return null;

  const total = data.reduce((total, country) => ({
    confirmed: total.confirmed + country.data.confirmed,
    recovered: total.recovered + country.data.recovered,
    deaths: total.deaths + country.data.deaths
  }), {confirmed: 0, recovered: 0, deaths: 0});

  return (
    <>
      <Stat
        number={Math.max(0, total.confirmed)}
        label="confirmed cases"
        color="red"
      />
      <Row>
        <div style={{marginRight: 48}}>
          <Stat
            number={Math.max(0, total.recovered)}
            label="recovered"
            color="green"
            size="small"
          />
        </div>
        <Stat
          number={Math.max(0, total.deaths)}
          label="deaths"
          color="blue"
          size="small"
        />
      </Row>
    </>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
