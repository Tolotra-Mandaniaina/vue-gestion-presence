<template>
  <div class="mt-5 min-h-screen bg-gray-50 text-gray-900 flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white shadow p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-blue-600 text-2xl font-bold">Gestion des Présences</h1>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-20 text-center">
      <h2 class="text-4xl font-extrabold">Gérez les présences avec efficacité</h2>
      <p class="mt-2 text-lg opacity-90">Une plateforme intuitive pour suivre et organiser les présences</p>
    </header>

    <!-- Tutoriel Vidéo -->
    <main class="container mx-auto py-10 px-4 text-center">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">🎥 Tutoriel : Comment gérer les présences</h3>
      <p class="text-gray-600 mb-4">Regardez cette vidéo pour apprendre à utiliser notre système efficacement.</p>
      
      <!-- Vidéo YouTube (responsive) -->
      <div class="relative overflow-hidden w-full" style="padding-top: 56.25%;">
        <iframe 
          class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="Tutoriel Gestion des Présences" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-200 text-center py-4 text-gray-600 mt-auto">
      © 2024 Gestion des Présences. Tous droits réservés.
    </footer>
  </div>
</template>

<script>
export default {
};
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
