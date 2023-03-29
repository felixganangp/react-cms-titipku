import React, { useEffect } from 'react';
import { Box, Dialog, IconButton, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import close from '../../images/icons/close.svg';
import {
  CancelButton,
  ConfirmButton,
  ContentAction,
  Contents,
  MoreContent,
} from './popupselected.styled';
import { RadioButton } from './RadioButton';
// import { SearchNotFound } from './SearchNotFound';
// import { SearchBar } from './SearchBar';
import { CheckBox } from './CheckBox';

interface Props {
  items: [];
  menuName: string;
  data: [];
  currentData: [];
  open: boolean;
  onClose: () => void;
  singleSelect: boolean;
  onConfirm: () => void;
  moreData: () => void;
  // onSearch: any;
  currentItems: number;
  total: number;
  product: boolean;
  // searchMenuName: any;
  confirmButton: string;
}

function PopupAddSelected({
  items: selectedItems,
  menuName,
  data,
  currentData,
  open,
  onClose,
  singleSelect,
  onConfirm,
  moreData,
  // onSearch,
  currentItems,
  total,
  product,
  // searchMenuName,
  confirmButton,
}: Props) {
  const [confirm, setConfirm] = React.useState(false);
  const [items, setItems] = React.useState({});
  const [existingItems, setExistingItems] = React.useState([]);
  const [newItems, setNewItems] = React.useState({});
  const [uncheckedItems, setUncheckedItems] = React.useState({});
  const selectedMessage = `${selectedItems.length} ${menuName}(s) selected`;

  const collectItems = () => Object.keys(items).filter((k: any) => items[k]);
  const collect = (datas: any) => Object.keys(datas).filter((k) => datas[k]);
  const collectUnchecked = () => Object.keys(uncheckedItems);
  const hasData = data && data.length > 0;
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
  // for checkbox
  const addOrRemoveItem = (event: any, id: any) => {
    if (event.target.checked === false && existingItems.includes(id)) {
      setUncheckedItems({ ...uncheckedItems, [id]: !!event.target.checked });
    }
    const nextItems = { ...items, [id]: !!event.target.checked };
    setNewItems({ ...newItems, [id]: !!event.target.checked });
    setItems(nextItems);
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
    let submittedItems;
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
      const tempTrue = Object.keys(items)
        .filter((key) => items[key])
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
    onConfirm(submittedItems);
  };

  useEffect(() => {
    if (currentData !== undefined && currentData.length > 0) {
      handleDataExisting(currentData);
    } else {
      setExistingItems([]);
    }
  }, [currentData]);

  useEffect(() => {}, [data]);

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
      {/* {!hasData ? (
            <SearchNotFound />
          ) : ( */}
      <Contents>
        <Box
          style={{
            width: 'inherit',
            border: 'none',
          }}
        >
          <RadioButton data={data} changeItem={changeItem} />
          {currentItems < total ? (
            <MoreContent onClick={() => moreData()}>Show More</MoreContent>
          ) : (
            ''
          )}
        </Box>
      </Contents>
      {/* )} */}
      <ContentAction>
        <CancelButton onClick={() => handleCancel()}>Cancel</CancelButton>
        <ConfirmButton
          disabled={isDisabled}
          onClick={() => handleConfirm()}
          autoFocus
        >
          {confirmButton}
        </ConfirmButton>
      </ContentAction>
    </Dialog>
  );
}

export default PopupAddSelected;
