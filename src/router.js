// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Projet from "./views/Projet.vue";
import Activite from "./views/Activite.vue";
import Personne from "./views/Personne.vue";
import Fiche from "./views/FichePresence.vue";
import Login from './views/Login.vue';
import Register from './views/Register.vue';

import PersonneCreate from "./views/PersonneCreate.vue";
import PersonneDetails from "./views/PersonneDetails.vue";
import PersonneEdit from "./views/PersonneEdit.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/projet", component: Projet },
  { path: "/activite", component: Activite,  meta: { requiresAuth: true } },
  { path: "/personne", component: Personne },
  { path: "/personne/create", component: PersonneCreate },
  { path: "/activite/:id/fiche-presence", component: Fiche, name: 'fichePresence' ,props: true },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },

  {
    path: '/personne/:id',
    name: 'PersonneDetails',
    component: PersonneDetails,
    props: true
  },
  {
    path: '/personne/edit/:id',
    name: 'PersonneEdit',
    component: PersonneEdit,
    props: true
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// Garde de navigation pour bloquer l'accès aux routes nécessitant une authentification
router.beforeEach((to, from, next) => {
  // Si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Vérifier si le token existe dans le localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Si pas de token, rediriger vers la page de login
      next({ name: 'Login' });
    } else {
      // Si un token existe, on autorise la navigation
      next();
    }
  } else {
    // Si la route ne nécessite pas d'authentification, autoriser la navigation
    next();
  }
});

export default router;
