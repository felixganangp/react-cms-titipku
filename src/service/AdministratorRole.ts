import http from 'utils/request';
import RoleAccessForm from '../models/RoleAccess';
import { MenuParams } from '../models/Menu';

export const fetchAdministratorRole = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.post(`/administrator/role?account_type=cms`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const createAdministratorRole = (body: RoleAccessForm) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(`/administrator/role`, body);
      if (response.data) {
        resolve(response.data);
      }
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateRoleAccess = (params: RoleAccessForm) =>
  new Promise(async (resolve, reject) => {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { name, account_type, controls, description, is_exist, id } =
        params;
      const body = {
        name,
        account_type,
        controls,
        description,
        is_exist,
      };
      const response = await http.put(`/administrator/role/${id}`, body);

      if (response.data) {
        resolve(response.data);
      }
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const fetchAdministratorControl = (params: MenuParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.get(`/administrator/control`, {
        params,
      });
      if (respon.data) resolve(respon.data);
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const checkRoleNameExist = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(`/administrator/check-role-name`, {
        params,
      });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const deleteRoleAccess = (id: number | string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.delete(`/administrator/role/${id}`);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
