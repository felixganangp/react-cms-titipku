import styled from '@emotion/styled';

interface StatusProps {
  status: boolean;
}

export const Status = styled.div<Pick<StatusProps, 'status'>>`
  padding: 4px 6px;
  width: 70px;
  color: #fafafa;
  background-color: ${(props) => (props.status ? '#008E58' : '#C10000')};
  border-radius: 8px;
  text-align: center;
`;
export const Bullet = styled.div`
  color: #008e58;
  background-color: #e5f4ee;
  border-radius: 10px;
  padding: 4px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  white-space: nowrap;
`;
