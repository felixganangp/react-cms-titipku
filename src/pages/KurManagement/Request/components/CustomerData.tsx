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
          <FieldName data-testid="customer-data-name">{fieldName}</FieldName>
          <FieldContent data-testid="customer-data-content">
            {fieldContent}
          </FieldContent>
        </DescriptionBox>
      </Field>
    </>
  );
};

export default CustomerData;
