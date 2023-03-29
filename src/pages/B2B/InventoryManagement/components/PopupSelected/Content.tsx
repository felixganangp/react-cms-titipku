import React from 'react';
import {
  HorizontalAlign,
  ItemImage,
  ContentDetails,
  ContentWeight,
  VerticalAlign,
  WeightProperty,
  NoItemImage,
  ContentBox,
} from './popupselected.styled';

interface Props {
  img: any;
  name: any;
  number: any;
  weight: any;
}
export function Content(props: Props) {
  return (
    <HorizontalAlign>
      <ContentBox>
        {props.img === '' || props.img === undefined || props.img < 1 ? (
          <NoItemImage src="" alt="No Image" />
        ) : (
          <ItemImage src={props.img} alt={props.name} />
        )}
      </ContentBox>
      <VerticalAlign>
        <ContentBox>
          {props.name}
          <br />
          <ContentDetails>{props.number}</ContentDetails>
        </ContentBox>
      </VerticalAlign>
      <ContentWeight>
        <WeightProperty>{props.weight}</WeightProperty>
      </ContentWeight>
    </HorizontalAlign>
  );
}
