import React from 'react';
import styled from '@emotion/styled';

interface StatusTypes {
  label: string;
  color: string;
}

interface StatusStyleTypes {
  color: string;
}

export const StatusStyle = styled.div<Pick<StatusStyleTypes, 'color'>>`
  padding: 4px 6px;
  width: 70px;
  color: #fafafa;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  text-align: center;
`;
export default function Status(props: StatusTypes) {
  return <StatusStyle color={props.color}>{props.label}</StatusStyle>;
}
