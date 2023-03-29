import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormInventoryTypes, Product } from 'models/b2b/Product';
import { fetchProduct } from 'service/B2B/Product';
import { ListResponse } from 'models/fetch';

interface FormTypes {
  onClose: () => void;
  EditProductParent: null | Product;
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

export default function FormProduct({ onClose, EditProductParent }: FormTypes) {
  const dispatch = useAppDispatch();
  const { categories, types, grades, isSuccessCreate, loadingForm } =
    useAppSelector((state) => state.product);

  const [currentGrade, setCurrentGrade] = useState({
    isCostume: false,
    currentID: 1,
  });
  const [typeUpdate, setTypeUpdate] = useState<
    'normal' | 'to-costume' | 'to-default'
  >('normal');

  // Close Modal
  useEffect(() => {
    if (isSuccessCreate && !loadingForm) {
      onClose();
    }
  }, [isSuccessCreate]);

  useEffect(() => {
    dispatch(productAction.fetchTypes());
  }, []);

  const createProduct = (value: FormInventoryTypes) => {
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
          productList: value.productList.filter(
            (val) => val.grade.id === 1 && val.is_active === true,
          ),
        }),
      );
    }
  };

  const updateCreateProduct = (id: number, value: FormInventoryTypes) => {
    // console.log(value);
    // console.log(typeUpdate);
    dispatch(
      productAction.updateProduct({
        ...value,
        idParent: id,
        typeEdit: typeUpdate,
      }),
    );
  };

  const handleSubmit = (value: FormInventoryTypes) => {
    if (EditProductParent) {
      updateCreateProduct(EditProductParent.product_parent_id, value);
    } else {
      createProduct(value);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      // handleSubmit(value);
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      image: yup.mixed().required('Image is required'),
      category: yup
        .array()
        .required('Category is required')
        .min(1, 'Category is required'),
      type: yup.mixed().required('Type is required'),
      productList: yup
        .array()
        .of(
          yup.object().shape({
            stock: yup
              .number()
              .typeError('stock is required')
              .required('stock is required')
              .min(0, 'Please input positive value stock')
              .max(2147483647, 'Maximal stock is 2.147.483.647'),
            lowStock: yup
              .number()
              .typeError('stock is required')
              .required('Low stock is required')
              .min(0, 'Please input positive value  low stock')
              .max(2147483647, 'Maximal low stock is 2.147.483.647'),
          }),
        )
        .required('Company is required'),
    }),
  });

  const getEditProductList = async (id: number) => {
    const respon = (await fetchProduct({
      product_parent_id: id,
    })) as ListResponse<Product>;
    if (respon.data?.length > 0) {
      const data = respon.data.filter(
        (val) => val.product_parent_id === EditProductParent?.product_parent_id,
      );

      const isCostumeGrade =
        data.findIndex(
          (item) => item.product_grade_id === 1 && item.is_active,
        ) === -1;

      const result = grades.map((val) => {
        const index = data.findIndex(
          (item) => item.product_grade_id === val.id,
        );
        if (index === -1) {
          return {
            grade: val,
            description: '',
            stock: '',
            lowStock: '',
            is_exist: true,
            is_active: false,
          };
        }
        return {
          id: data[index].id,
          grade: data[index].product_grade,
          description: data[index].description,
          stock: data[index].stock,
          lowStock: data[index].low_stock_limit,
          is_exist: data[index].is_exist,
          is_active: data[index].is_active,
        };
      });

      setCurrentGrade({
        currentID: EditProductParent?.product_grade_id || 0,
        isCostume: isCostumeGrade,
      });

      formik.setFieldValue('productList', result);
    }
  };

  useEffect(() => {
    if (EditProductParent) {
      const fieldValue = {
        ...formik.values,
        image: EditProductParent?.product_parent.image_filepath,
        name: EditProductParent?.product_parent.name,
        category:
          EditProductParent?.product_parent.product_parent_category || [],
        type: EditProductParent?.product_type,
      };
      formik.setValues(fieldValue);
      getEditProductList(EditProductParent.product_parent_id);
    } else {
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
  }, [EditProductParent]);

  return {
    formik,
    categories,
    types,
    grades,
    currentGrade,
    setCurrentGrade,
    loadingForm,
    handleSubmit,
    isEdit: Boolean(EditProductParent),
    setTypeUpdate,
  };
}
