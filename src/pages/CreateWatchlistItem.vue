<template>
  <q-page padding>
    <div class="q-pa-md">
      <h4>Add Stock to Watchlist</h4>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          v-model="form.symbol"
          label="Symbol"
          :rules="[(val) => !!val || 'Symbol is required']"
        />

        <q-input
          v-model="form.company_name"
          label="Company Name"
          :rules="[(val) => !!val || 'Company name is required']"
        />

        <q-input v-model="form.notes" label="Notes" type="textarea" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" :loading="isLoading" />
          <q-btn label="Cancel" flat class="q-ml-sm" :to="{ name: 'list' }" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWatchlistStore } from '../stores/watchlist';
// Import Notify directly from Quasar
import { Notify } from 'quasar';

const router = useRouter();
const store = useWatchlistStore();

const isLoading = computed(() => store.isLoading);

const form = ref({
  symbol: '',
  company_name: '',
  notes: '',
});

async function onSubmit() {
  await store.addWatchlistItem(form.value);

  if (!store.error) {
    // Use Notify directly instead of $q.notify
    Notify.create({
      color: 'positive',
      message: 'Stock added to watchlist',
      icon: 'check',
    });
    void router.push({ name: 'list' });
  }
}
</script>
