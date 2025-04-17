<template>
  <q-page padding>
    <div class="q-pa-md">
      <h4 class="q-mb-md">My Watchlist</h4>

      <q-spinner v-if="isLoading" color="primary" size="3em" />

      <q-banner v-if="error" class="bg-negative text-white q-mb-md">
        {{ error }}
        <template v-slot:action>
          <q-btn flat color="white" label="Retry" @click="fetchItems" />
        </template>
      </q-banner>

      <div v-if="!isLoading && !items.length" class="text-center q-pa-lg">
        <p>Your watchlist is empty. Add some stocks to track!</p>
        <q-btn color="primary" label="Add Stock" :to="{ name: 'create' }" />
      </div>

      <q-list v-else bordered separator>
        <q-item v-for="(item, index) in items" :key="item.id ?? index" v-ripple clickable>
          <q-item-section>
            <q-item-label overline>{{ item.symbol }}</q-item-label>
            <q-item-label>{{ item.company_name }}</q-item-label>
            <q-item-label caption>{{ item.notes }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click.stop="confirmDelete(item.symbol)"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <div class="q-mt-lg">
        <q-btn color="primary" label="Add New" icon="add" :to="{ name: 'create' }" />
      </div>
    </div>

    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this item?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteItem" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useWatchlistStore } from '../stores/watchlist';
import { useQuasar } from 'quasar';

const store = useWatchlistStore();
const $q = useQuasar();

const items = computed(() => store.items);
const isLoading = computed(() => store.isLoading);
const error = computed(() => store.error);

const showDeleteDialog = ref(false);
const itemToDelete = ref<string | null>(null);

async function fetchItems() {
  await store.fetchWatchlistItems();
}

function confirmDelete(symbol: string) {
  itemToDelete.value = symbol;
  showDeleteDialog.value = true;
}

async function deleteItem() {
  if (itemToDelete.value !== null) {
    await store.deleteWatchlistItem(itemToDelete.value);
    if (!store.error) {
      $q.notify({
        color: 'positive',
        message: 'Item deleted successfully',
        icon: 'check',
      });
    }
    itemToDelete.value = null;
  }
}

onMounted(() => {
  void fetchItems();
});
</script>
