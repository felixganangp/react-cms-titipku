import http from 'utils/request';
import { RoleAccessParams } from 'models/RoleAccess';
import { CreateRoleUserPayload } from 'models/RoleUser';

export const getAllAdministratorRole = (params: RoleAccessParams) =>
  new Promise<RoleAccessParams>(async (resolve, reject) => {
    try {
      const respon = await http.get(`administrator/role`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const createAdministrator = (payload: CreateRoleUserPayload) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.post(`administrator`, payload);
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

export const getAllAdministratorUser = (params: RoleAccessParams) =>
  new Promise<RoleAccessParams>(async (resolve, reject) => {
    try {
      const respon = await http.get(`administrator`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const editAdministrator = (payload: CreateRoleUserPayload) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.put(`administrator/${payload.id}`, payload);
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const checkValidEmail = (params: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`administrator/check-email`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
