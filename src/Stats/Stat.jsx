import React from 'react';
import styled from '@emotion/styled';

const colors = {
  red: '#D32329',
  green: '#65D39B',
  blue: '#449BE2'
};

export function Stat ({number, size = 'large', color = 'red', label}) {
  return (
    <Container>
      <Number size={size} color={color}>{number.toLocaleString()}</Number>
      <Byline size={size}>{label}</Byline>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;

const Number = styled.h1`
  color: ${props => colors[props.color]};
  font-size: ${props => props.size === 'large' ? '96px' : '64px'};
  margin-bottom: 0px;
  text-shadow: 0 1px 12px #222;
`;

const Byline = styled.span`
  color: #E5E5E5;
  font-size: ${props => props.size === 'large' ? '36px' : '28px'};
`;
