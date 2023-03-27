import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormInventoryTypes } from 'models/b2b/Product';

interface FormTypes {
  onClose: () => void;
}
const initialValues: FormInventoryTypes = {
  image: '',
  name: '',
  category: [],
  type: null,
  productList: [
    {
      grade: { id: 1, name: 'No Grade' },
      description: '',
      stock: '',
      lowStock: '',
      is_exist: true,
      is_active: true,
    },
  ],
};

export default function FormProduct({ onClose }: FormTypes) {
  const dispatch = useAppDispatch();
  const { categories, types, grades, isSuccessCreate, loadingForm } =
    useAppSelector((state) => state.product);
  const [currentGrade, setCurrentGrade] = useState({
    isCostume: false,
    currentID: 1,
  });

  useEffect(() => {
    console.log(isSuccessCreate, loadingForm);
    if (isSuccessCreate && !loadingForm) {
      onClose();
    }
  }, [isSuccessCreate]);

  useEffect(() => {
    dispatch(productAction.fetchTypes());
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: (value) => {
      if (currentGrade.isCostume) {
        dispatch(
          productAction.createProduct({
            ...value,
            productList: value.productList.filter((val) => val.grade.id !== 1),
          }),
        );
      } else {
        dispatch(
          productAction.createProduct({
            ...value,
            productList: value.productList.filter((val) => val.grade.id === 1),
          }),
        );
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      image: yup.mixed().required('Image is required'),
      category: yup.mixed().required('Category is required'),
      type: yup.mixed().required('Type is required'),
    }),
  });

  useEffect(() => {
    if (
      grades.length > 0 &&
      formik.values.productList.length !== grades.length
    ) {
      formik.setFieldValue(
        'productList',
        grades.map((val) => ({
          grade: val,
          description: '',
          stock: '',
          lowStock: '',
          is_exist: true,
          is_active: true,
        })),
      );
    }
  }, [grades]);

  return {
    formik,
    categories,
    types,
    grades,
    currentGrade,
    setCurrentGrade,
    loadingForm,
  };
}
