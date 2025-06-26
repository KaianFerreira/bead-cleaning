import { api } from './axios'

interface barcode {
    barcode: string;
    logon_username: string;
}

export const getAll = async () => {
  try {
    const response = await api.get('/bead-cleaning/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching bead cleaning data:', error);
    throw error;
  }
}

export const getAllPaginated = async (page: number) => {
    try {
        const response = await api.get('/bead-cleaning', {
        params: { page }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching paginated bead cleaning data:', error);
        throw error;
    }
}

export const saveBeadCleaning = async (data: barcode) => {
  try {
    const response = await api.post('/bead-cleaning', data);
    return response.data;
  } catch (error) {
    console.error('Error saving bead cleaning data:', error);
    throw error;
  }
}


