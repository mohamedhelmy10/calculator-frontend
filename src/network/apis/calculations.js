import { axiosInstance } from '.';

export const calculate = async (calculation) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(`/calculations/calculate`, {
            calculation,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          reject(e.message);
        });
    });
  };