import React, { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  IconButton,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import { Product } from 'models/b2b/Product';
import EmptyProduct from 'assets/empty-product.svg';
import { ContentAction, Contents } from './popupselected.styled';
import { RadioButton } from './RadioButton';
// import { SearchNotFound } from './SearchNotFound';
// import { SearchBar } from './SearchBar';

function NoDataInventory() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="12px"
      marginBottom={2}
    >
      <img
        src={EmptyProduct}
        width="200px"
        height="200px"
        alt="No Product Available"
      />
      <Box textAlign="center">
        <Typography fontSize="16px" fontWeight="bold" color="#303030">
          No Product Available
        </Typography>
      </Box>
    </Box>
  );
}
interface Props {
  parentId: number | undefined;
  currentData: [];
  open: boolean;
  onClose: () => void;
  singleSelect: boolean;
  onConfirm: React.Dispatch<React.SetStateAction<Product[]>>;
  product: boolean;
  onApply: () => void;
  selectedItem: Product[];
}

function PopupAddSelected({
  parentId,
  currentData,
  open,
  onClose,
  singleSelect,
  onConfirm,
  product,
  onApply,
  selectedItem,
}: Props) {
  const dispatch = useAppDispatch();
  const listProduct = useAppSelector(
    (state) => state.product.listProductsMoveStk,
  );
  const filteredListProducts = listProduct.filter((el) => {
    if (selectedItem.length > 0) {
      return el.id !== selectedItem[0].id;
    }
    return [];
  });
  useEffect(() => {
    dispatch(
      productAction.fetchDataListProductsMoveStk({
        product_parent_id: parentId as number,
      }),
    );
  }, [parentId]);
  const [items, setItems] = React.useState<any>({});
  const [existingItems, setExistingItems] = React.useState([]);
  const [newItems, setNewItems] = React.useState({});
  const [uncheckedItems, setUncheckedItems] = React.useState({});

  const collectItems = () => Object.keys(items).filter((k: any) => items[k]);
  const collect = (datas: any) => Object.keys(datas).filter((k) => datas[k]);
  const collectUnchecked = () => Object.keys(uncheckedItems);
  const handleDataExisting = (i: any) => {
    const results: any = [];
    i.map((a: any) => {
      results.push(a.id);
      const updateItems = { ...items, [a.id]: true };
      setItems(updateItems);
      return results;
    });
    setExistingItems(results);
  };
  // for radio button
  const changeItem = (
    event: any,
    id: any,
    name: string,
    imageUrl: string,
    skuNumber: any,
  ) => {
    let changedItem;
    if (product) {
      changedItem = {
        [id]: !!event.target.checked,
        [name]: !!event.target.checked,
        [imageUrl]: !!event.target.checked,
        [skuNumber]: !!event.target.checked,
      };
    } else {
      changedItem = { [id]: !!event.target.checked };
    }
    setItems(changedItem);
  };

  const handleCancel = () => {
    if (existingItems.length > 0) {
      setNewItems({});
      setItems({});
      setUncheckedItems({});
      onClose();
    } else {
      setNewItems({});
      setUncheckedItems({});
      setExistingItems([]);
      setItems({});
      onClose();
    }
  };

  const handleConfirm = () => {
    let submittedItems: any;
    if (Object.keys(uncheckedItems).length > 0) {
      const res = Object.keys(uncheckedItems);
      submittedItems = {
        items: singleSelect ? collectItems() : collect(newItems),
        uncheckedItems: res,
      };
    } else {
      submittedItems = singleSelect ? collectItems() : collect(newItems);
    }

    if (items) {
      // const temp = Object.keys(items).map(i => Number(i));
      const tempTrue: any = Object.keys(items)
        .filter((key: any) => items[key])
        .map((i) => Number(i));
      const tempFalse = Object.keys(items)
        .filter((key) => !items[key])
        .map((i) => Number(i));

      if (existingItems.length > 0) {
        if (tempTrue.length > 0) {
          const tempResult = existingItems.concat(tempTrue);
          if (tempFalse.length > 0) {
            setExistingItems(
              tempResult.filter((el) => !tempFalse.includes(el)),
            );
          } else {
            setExistingItems(tempResult);
          }
        } else {
          setExistingItems(
            existingItems.filter((el) => !tempFalse.includes(el)),
          );
        }
      } else {
        setExistingItems(tempTrue);
      }
    }
    setItems({});
    setUncheckedItems({});
    setNewItems({});
    // setExistingItems([]);
    const selected = listProduct.filter((el) => el.id === +submittedItems[0]);
    onConfirm(selected);
    onApply();
  };

  useEffect(() => {
    if (currentData !== undefined && currentData.length > 0) {
      handleDataExisting(currentData);
    } else {
      setExistingItems([]);
    }
  }, [currentData]);

  useEffect(() => {
    setExistingItems([]);
    setNewItems([]);
  }, []);

  const isDisabled =
    (singleSelect && collectItems().length < 1) ||
    (!singleSelect &&
      collect(newItems).length < 1 &&
      collectUnchecked().length < 1);

  return (
    <Dialog
      sx={{ padding: 0, margin: 0 }}
      PaperProps={{ sx: { width: '420px' } }}
      open={open}
      onClose={() => handleCancel()}
    >
      <DialogTitle
        fontSize="20px"
        fontWeight="500"
        // textTransform="capitalize"
        sx={{ boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)' }}
      >
        Move Stock
        <IconButton
          onClick={() => {
            handleCancel();
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#232933',
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* <SearchBar
                menuName={searchMenuName || parentMenu}
                onSearch={onSearch}
              /> */}
      </DialogTitle>
      {filteredListProducts.length < 1 ? (
        <NoDataInventory />
      ) : (
        <Contents>
          <Box
            style={{
              width: 'inherit',
              border: 'none',
            }}
          >
            <RadioButton data={filteredListProducts} changeItem={changeItem} />
          </Box>
        </Contents>
      )}
      <ContentAction>
        <Button variant="text" color="error" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() => handleConfirm() /* onApply() */}
          autoFocus
        >
          Apply
        </Button>
      </ContentAction>
    </Dialog>
  );
}

export default PopupAddSelected;
