import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

import { FormInventoryTypes, Product } from 'models/b2b/Product';
// import { fetchProduct } from 'service/B2B/Product';
// import { ListResponse } from 'models/fetch';

interface FormTypes {
  onClose: () => void;
  EditProduct: null | Product;
  isDetail?: boolean;
}

const initialValues: FormInventoryTypes = {
  image: '',
  name: '',
  category: null,
  selling_price: '',
  low_stock_limit: '',
  stock: '',
  description: '',
  unit_measurement_id: null,
};

export default function FormProduct({
  onClose,
  EditProduct,
  isDetail,
}: FormTypes) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { categories, types, grades, isSuccessCreate, loadingForm } =
    useAppSelector((state) => state.product);

  const [currentGrade, setCurrentGrade] = useState({
    isCostume: false,
    currentID: 1,
  });

  useEffect(() => {
    dispatch(productAction.fetchCategory());
  }, []);

  // Close Modal
  useEffect(() => {
    if (isSuccessCreate && !loadingForm) {
      onClose();
      dispatch(productAction.resetProductForm());
    }
    if (isDetail && id) {
      dispatch(productAction.fetchDetails(id));
      dispatch(
        productAction.setLogParams({
          // eslint-disable-next-line radix
          product_id: parseInt(id),
        }),
      );
    }
  }, [isSuccessCreate]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (EditProduct) {
        dispatch(
          productAction.updateProduct({ id: EditProduct.id, data: values }),
        );
      } else {
        dispatch(productAction.createProduct(values));
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      image: yup.mixed().required('Image is required'),
      category: yup.mixed().required('Category is required'),
      selling_price: yup.string().required('Price is required'),
      low_stock_limit: yup.string().required('Low Stock is required'),
      stock: yup.string().required('Stock is required'),
      description: yup.string().required('Description is required'),
      unit_measurement_id: yup.mixed().required('Unit is required'),
    }),
  });

  useEffect(() => {
    if (EditProduct) {
      formik.setValues({
        image: EditProduct.image,
        name: EditProduct.name,
        category: EditProduct.product_category_id,
        selling_price: EditProduct.selling_price,
        low_stock_limit: EditProduct.low_stock_limit,
        stock: EditProduct.stock,
        description: EditProduct.description,
        unit_measurement_id: EditProduct.unit_measurement_id,
      });
    }
  }, [EditProduct]);

  return {
    formik,
    categories,
    types,
    grades,
    currentGrade,
    setCurrentGrade,
    loadingForm,
    isEdit: Boolean(EditProduct),
  };
}
