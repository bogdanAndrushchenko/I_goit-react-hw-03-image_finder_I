import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = '18613871-d09d7f4d1ad86f8a51a1289a6';
const BASE_URL = 'https://pixabay.com/api';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const getResource = async (q, page) => {
  try {
    const {
      data: { hits },
    } = await axios.get(``, { params: { q, page } });
    return hits;
  } catch (error) {
    throw toast.error(error, {
      autoClose: 2000,
    });
  }
};

export default getResource;
