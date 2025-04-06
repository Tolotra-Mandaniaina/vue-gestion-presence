import axios from 'axios';

// Crée une instance d'Axios avec des configurations par défaut
const axiosInstance = axios.create({
  baseURL: 'https://safidy-observatoire.net/BO/public/api',
  withCredentials: true, // Change l'URL de base selon ton API
  timeout: 15000, // Timeout de 5 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Ajouter un intercepteur pour inclure le token d'authentification dans les requêtes
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Récupérer le token dans le localStorage
  if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Exporter l'instance axios pour l'utiliser dans tout le projet
export default axiosInstance;
