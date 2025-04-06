<script>
import { ref } from 'vue';
import axios from '@/services/axios';

export default {
  setup() {
    const organisation = ref({
      denomination: '',
      sigle: '',
      tel: ''
    });
    const errors = ref(null);
    const successMessage = ref(null);
    const isLoading = ref(false);

    const createOrganisation = async () => {
      errors.value = null;
      successMessage.value = null;
      isLoading.value = true;
      try {
        await axios.post('/organisations', organisation.value);
        successMessage.value = 'Organisation créée avec succès !';
        organisation.value = { denomination: '', sigle: '', tel: '' };
      } catch (error) {
        errors.value = error.response?.data?.message || 'Une erreur est survenue';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      organisation,
      errors,
      successMessage,
      isLoading,
      createOrganisation
    };
  }
};
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="max-w-lg w-full p-8 bg-white shadow-md rounded-xl">
        <h2 class="text-xl font-semibold text-gray-800 text-center mb-6">Créer une Organisation</h2>
        <form @submit.prevent="createOrganisation" class="space-y-5">
          <div>
            <label class="block text-sm font-bold text-gray-800 mb-1 text-left">Dénomination</label>
            <input v-model="organisation.denomination" type="text" 
                   class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                   required />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-800 mb-1 text-left">Sigle</label>
            <input v-model="organisation.sigle" type="text" 
                   class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                   required />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-800 mb-1 text-left">Téléphone</label>
            <input v-model="organisation.tel" type="tel" 
                   class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                   required />
          </div>
          <button type="submit" 
                  class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                  :disabled="isLoading">
            <span v-if="isLoading" class="animate-pulse">Création en cours...</span>
            <span v-else>Créer</span>
          </button>
          <p v-if="successMessage" class="text-green-600 text-center mt-4">{{ successMessage }}</p>
          <p v-if="errors" class="text-red-600 text-center mt-4">{{ errors }}</p>
        </form>
      </div>
    </div>
  </template>
  