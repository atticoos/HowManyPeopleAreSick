import React from 'react';
import styled from '@emotion/styled';
import {Colors} from '../ui';

export function Marker ({date, dateRange}) {
  const index = dateRange.indexOf(date);

  return (
    <Container position={index === 0 ? 0 : index / dateRange.length}>
      <Label>{date}</Label>
      {/* <Line /> */}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 60px;
  height: 72px;
  left: ${props => (props.position * 100)}%;
  transition-duration: 300ms;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.span`
  font-size: 18px;
  color: ${Colors.WHITE};
`;

const Line = styled.div`
  background-color: ${Colors.BLUE};
  width: 4px;
  height: 80%;
`;
