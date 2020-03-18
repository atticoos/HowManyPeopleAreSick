import React from 'react';
import styled from '@emotion/styled';
import {sites} from '../data/sites';
import {Site} from './Site';

export function Sites () {
  return (
    <div>
      <h3>Explore data in more depth</h3>
      <Row>
        {sites.map(site => (
          <Site
            key={site.name}
            name={site.name}
            url={site.url}
            image={site.image}
          />
        ))}
      </Row>
    </div>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 800px;
`;
