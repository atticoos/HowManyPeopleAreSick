import React from 'react';
import styled from '@emotion/styled';
import {useDateRange} from './useDateRange';
import {Colors} from '../ui';
import {Marker} from './Marker';

export function DateScrubber ({
  from,
  to,
  date,
  onDateChanged = () => {}
}) {
  const dateRange = useDateRange(from, to);

  const dateIndex = dateRange.indexOf(date);

  console.log('range', dateRange);

  return (
    <Container>
      {dateRange.map(tickDate => (
        <Tick
          key={tickDate}
          adjacent={(tickDate - 1) === date || (tickDate + 1) === date}
          current={tickDate === date}
        />
      ))}
      <Marker
        date={date}
        dateRange={dateRange}
      />
    </Container>
  );
}

// const Marker = styled.div`
//   position: absolute;
//   bottom: 0;
//   background-color: ${Colors.BLUE};
//   width: 6px;
//   height: 32px;
//   left: ${props => (props.position * 100)}%;
//   transition-duration: 100ms;
// `

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 80%;
  margin: auto;
`;

const Tick = styled.div`
  background-color: ${Colors.WHITE};
  width: 4px;
  height: 18px;
  opacity: 0.6;
  transition: 120ms;
  ${props => props.current && `
    height: 42px;
    background-color: ${Colors.BLUE}
  `}
  ${props => props.adjacent && `
    height: 28px;
  `}
`;
