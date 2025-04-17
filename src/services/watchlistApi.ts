import axios from 'axios';

// You'll need to replace this with your actual API URL
const API_URL = 'https://qfnjrphgbe.execute-api.us-east-1.amazonaws.com/dev';

export interface WatchlistItem {
  id?: number;
  user_id?: number;
  symbol: string;
  company_name: string;
  notes: string;
  created_at?: string;
}

export const watchlistApi = {
  async getAll(): Promise<WatchlistItem[]> {
    const response = await axios.get(`${API_URL}/watchlist`);
    return response.data;
  },

  async create(item: Omit<WatchlistItem, 'id' | 'user_id' | 'created_at'>): Promise<WatchlistItem> {
    const response = await axios.post(`${API_URL}/watchlist`, item);
    return response.data;
  },

  // Delete item from watchlist
  async delete(symbol: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/watchlist/${symbol}`);
    } catch (error) {
      console.error('Error deleting watchlist item:', error);
      throw error;
    }
  },
};
