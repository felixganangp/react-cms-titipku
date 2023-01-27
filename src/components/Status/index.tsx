import React from 'react';
import styled from '@emotion/styled';

interface StatusTypes {
  children: string;
  color: string;
}

interface StatusStyleTypes {
  color: string;
}

export const StatusStyle = styled.div<Pick<StatusStyleTypes, 'color'>>`
  padding: 4px 10px;
  line-height: 27px;
  align-items: center;
  color: #fafafa;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  text-align: center;
`;
export default function Status(props: StatusTypes) {
  return <StatusStyle color={props.color}>{props.children}</StatusStyle>;
}
