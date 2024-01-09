import http from 'utils/request';

export const postCreateUser = (data: FormData) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`financing/user`, data);
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

export const putCreateUser = ({ id, data }: { id: string; data: FormData }) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.put(`/financing/user/${id}`, data);
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
