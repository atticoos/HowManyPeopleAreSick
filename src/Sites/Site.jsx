import React from 'react';
import styled from '@emotion/styled';

export function Site ({name, url, image}) {
  return (
    <SiteLink href={url} title={`Covid-19 via ${name}`}>
      <SiteCard image={image} />
      <SiteName>{name}</SiteName>
    </SiteLink>
  );
}

const SiteLink = styled.a`
  display: block;
  width: 180px;
  height: 220px;
  text-decoration: none;
`;

const SiteName = styled.span`
  color: #898989;
  font-size: 18px;
`;

const SiteCard = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  height: 180px;
  width: 180px;
  margin-bottom: 8px;
`;
