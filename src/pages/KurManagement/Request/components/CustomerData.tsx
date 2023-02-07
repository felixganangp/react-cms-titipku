/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement } from 'react';
import {
  DescriptionBox,
  Field,
  FieldContent,
  FieldName,
} from '../request.styled';

interface CustomerDataProps {
  icon: ReactElement<any, any>;
  fieldName: string;
  fieldContent: string | number | null | undefined;
}

const CustomerData = ({ icon, fieldName, fieldContent }: CustomerDataProps) => {
  return (
    <>
      <Field>
        <>{icon}</>
        <DescriptionBox>
          <FieldName>{fieldName}</FieldName>
          <FieldContent>{fieldContent}</FieldContent>
        </DescriptionBox>
      </Field>
    </>
  );
};

export default CustomerData;
