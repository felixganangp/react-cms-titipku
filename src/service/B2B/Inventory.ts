import http from 'utils/request';
import { InventoryParams } from 'models/b2b/Inventory';

export const fetchInventory = (params: InventoryParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get('/b2b/inventory', { params });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const deleteInventory = (id: number | string) =>
  new Promise(async (resolve, reject) => {
    try {
      //   const response = await http.delete(`/b2b/inventory/${id}`);
      //   if (response.data) resolve(response.data);
      console.log('delete inventories');
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
