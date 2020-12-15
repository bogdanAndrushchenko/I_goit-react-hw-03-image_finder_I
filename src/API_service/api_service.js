import { toast } from 'react-toastify';

const api_service = {
  per_page: 12,
  APIkey: '18613871-d09d7f4d1ad86f8a51a1289a6',
  baseURL: 'https://pixabay.com/api/?image_type=photo&orientation=horizontal',
  async getResource(search, page) {
    try {
      const responce = await fetch(
        `${this.baseURL}&q=${search}&page=${page}&per_page=${this.per_page}&key=${this.APIkey}`,
      );
      if (responce.ok) {
        return await responce.json();
      }
      return Promise.reject(new Error(`Ошибка поиск ${search} пуст `));
    } catch (error) {
      throw toast.error(error, {
        autoClose: 2000,
      });
    }
  },
};
export default api_service;
