<template>
    <div class="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <!-- Formulaire -->
        <form @submit.prevent="createActivite">
            <!-- Nom de l'Activité -->
            <div class="mb-4">
                <label for="nom" class="block text-sm font-medium text-gray-700">Nom de l'Activité</label>
                <input
                    type="text"
                    id="nom"
                    v-model="activity.nom"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <!-- Description -->
            <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    v-model="activity.description"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                ></textarea>
            </div>

            <!-- Date de début -->
            <div class="mb-4">
                <label for="dateDebut" class="block text-sm font-medium text-gray-700">Date de Début</label>
                <input
                    type="date"
                    id="dateDebut"
                    v-model="activity.dateDebut"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <!-- Date de fin -->
            <div class="mb-4">
                <label for="dateFin" class="block text-sm font-medium text-gray-700">Date de Fin</label>
                <input
                    type="date"
                    id="dateFin"
                    v-model="activity.dateFin"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <!-- Lieu -->
            <div class="mb-4">
                <label for="lieu" class="block text-sm font-medium text-gray-700">Lieu</label>
                <input
                    type="text"
                    id="lieu"
                    v-model="activity.lieu"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <!-- Sélection du Projet -->
            <div class="mb-4">
                <label for="projet_id" class="block text-sm font-medium text-gray-700">Sélectionner un Projet</label>
                <select
                    id="projet_id"
                    v-model="activity.projet_id"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="" disabled selected>Sélectionner un projet</option>
                    <option v-for="projet in projets" :key="projet.id" :value="projet.id">
                        {{ projet.nom }}
                    </option>
                </select>
            </div>

            <!-- Bouton -->
            <div class="flex justify-center">
                <button
                    type="submit"
                    class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Créer Activité
                </button>
            </div>
        </form>

        <!-- Message de confirmation ou d'erreur -->
        <p v-if="message" :class="{ 'text-green-500': isSuccess, 'text-red-500': !isSuccess }" class="mt-4 text-center">
            {{ message }}
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activity: {
                nom: "",
                description: "",
                dateDebut: "",
                dateFin: "",
                lieu: "",
                projet_id: null,
            },
            projets: [],
            message: "",
            isSuccess: false,
        };
    },
    mounted() {
        this.fetchProjets();
    },
    methods: {
        async fetchProjets() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/projets");
                const data = await response.json();
                console.log("Réponse API :", data);
                this.projets = data.projets;
            } catch (error) {
                console.error("Erreur lors du chargement des projets :", error);
            }
        },

        async createActivite() {
            const newActivite = { ...this.activity };

            console.log("Données envoyées :", newActivite);

            try {
                const response = await fetch("http://127.0.0.1:8000/api/activites", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newActivite),
                });

                const data = await response.json();
                console.log("Réponse API :", data);

                if (response.ok) {
                    this.message = "Activité créee avec succès !";
                    this.isSuccess = true;
                    this.resetForm();
                    this.message="";
                } else {;
                    this.message = "Erreur lors de la création de l'activité.";
                    this.isSuccess = false;
                }
            } catch (error) {
                console.error("Erreur lors de la création :", error);
                this.message = "Une erreur est survenue.";
                this.isSuccess = false;
            }
        },

        resetForm() {
            this.activity = {
                nom: "",
                description: "",
                dateDebut: "",
                dateFin: "",
                lieu: "",
                projet_id: null,
            };
        },
    },
};
</script>

<style scoped>
/* Styles déjà gérés par Tailwind */
</style>
