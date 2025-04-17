import { defineStore } from 'pinia';
import type { WatchlistItem } from '../services/watchlistApi';
import { watchlistApi } from '../services/watchlistApi';

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    items: [] as WatchlistItem[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchWatchlistItems() {
      this.isLoading = true;
      try {
        this.items = await watchlistApi.getAll();
        this.error = null;
      } catch (err) {
        this.error = 'Failed to fetch watchlist items';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    async addWatchlistItem(item: Omit<WatchlistItem, 'id' | 'user_id' | 'created_at'>) {
      this.isLoading = true;
      try {
        const newItem = await watchlistApi.create(item);
        this.items.push(newItem);
        this.error = null;
      } catch (err) {
        this.error = 'Failed to add watchlist item';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteWatchlistItem(symbol: string) {
      this.isLoading = true;
      try {
        await watchlistApi.delete(symbol);
        this.items = this.items.filter((item) => item.symbol !== symbol);
        this.error = null;
      } catch (err) {
        this.error = 'Failed to delete watchlist item';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
