<template>
    <div class="mt-5 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-l font-bold mb-4"> ➕Créer une personne</h3>
      <form @submit.prevent="submitForm" class="space-y-4">
        
        <!-- Champ Nom -->
        <div class="flex flex-col">
          <label for="nom" class="text-gray-700 font-medium">Nom</label>
          <input
            v-model="formData.nom"
            type="text"
            id="nom"
            class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Nom"
          required/>
        </div>
  
        <!-- Champ Âge (choix unique) -->
        <div class="flex flex-col">
          <label for="age" class="text-gray-700 font-medium">Sexe / Âge</label>
          <select
            v-model="formData.age"
            id="age"
            class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option disabled value="">Sélectionnez</option>
            <option v-for="ageOption in ageOptions" :key="ageOption" :value="ageOption">{{ ageOption }}</option>
          </select required>
        </div>
  
       <!-- Champ Téléphone -->
    <div class="flex flex-col">
    <label for="tel" class="text-gray-700 font-medium">Téléphone</label>
    <input
        v-model="formData.tel"
        type="text"  
        id="tel"
        class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Téléphone"
        required
        pattern="^(0\d{9})$"  
        title="Le numéro doit contenir exactement 10 chiffres, et commencer par un 0."
    />
    <!-- Affichage d'un message d'erreur si nécessaire -->
    <span v-if="formData.tel && !/^(0\d{9})$/.test(formData.tel)" class="text-red-500 text-sm">Le numéro doit contenir exactement 10 chiffres et commencer par 0.</span>
    </div>


  
        <!-- Champ PSH (Boolean) -->
        <div class="flex flex-col">
          <label for="psh" class="text-gray-700 font-medium">PSH</label>
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="formData.psh"
              id="psh"
              class="mr-2"
            />
            Oui
          </label>
        </div>
  
        <!-- Champ Email -->
        <div class="flex flex-col">
          <label for="email" class="text-gray-700 font-medium">Email</label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
          />
        </div>
  
        <!-- Champ Facebook -->
        <div class="flex flex-col">
          <label for="fb" class="text-gray-700 font-medium">Facebook</label>
          <input
            v-model="formData.fb"
            type="text"
            id="fb"
            class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Facebook"
          />
        </div>

         <!-- Champ Nom -->
         <div class="flex flex-col">
          <label for="nom" class="text-gray-700 font-medium">Fonction</label>
          <input
            v-model="formData.fonction_fiche"
            type="text"
            id="fonction_fiche"
            class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Fonction"
          />
        </div>
  
  

  
        <!-- Sélection Région -->
        <div class="flex flex-col">
          <label for="region" class="text-gray-700 font-medium">Région</label>
          <select v-model="selectedRegion" @change="loadDistricts" id="region" class="p-2 border rounded-md">
            <option v-for="region in regions" :key="region.CodeRegion" :value="region.Region">
              {{ region.Region }}
            </option>
          </select>
        </div>
  
        <!-- Sélection District -->
        <div class="flex flex-col" v-if="districts.length">
          <label for="district" class="text-gray-700 font-medium">District</label>
          <select v-model="selectedDistrict" @change="loadCommunes" id="district" class="p-2 border rounded-md">
            <option v-for="district in districts" :key="district.CodeDistrict" :value="district.District">
              {{ district.District }}
            </option>
          </select>
        </div>
  
        <!-- Sélection Commune -->
        <div class="flex flex-col" v-if="communes.length">
          <label for="commune" class="text-gray-700 font-medium">Commune</label>
          <select v-model="selectedCommune" id="commune" class="p-2 border rounded-md">
            <option v-for="commune in communes" :key="commune.CodeCommune" :value="commune.Commune">
              {{ commune.Commune }}
            </option>
          </select>
        </div>
  
       <!-- Champ Organisation -->
       <div class="flex flex-col">
        <label for="organisation" class="text-gray-700 font-medium">Organisation</label>
        <select
          v-model="formData.organisation"
          id="organisation"
          class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option disabled value="">Sélectionnez une organisation</option>
          <option v-for="organisation in organisations" :key="organisation.id" :value="organisation.id">
            {{ organisation.denomination }}
          </option>
        </select>
      </div>
  
        <!-- Bouton de soumission -->
        <button 
        type="submit" 
        class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex justify-center items-center"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting" class="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
        {{ isSubmitting ? 'Création en cours...' : 'Créer' }}
         </button>


    </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        formData: {
          nom: "",
          age: "",
          tel: "",
          psh: false, // PSH est maintenant un boolean
          email: "",
          fb: "",
          fonction_fiche: "",
          organisation: "",
          region: "",
          codeRegion: "",
          district: "",
          codeDistrict: "",
          commune: "",
          codeCommune: "",
          organisation_id: null, // Exemple d'organisation_id à vérifier
        },
        isSubmitting: false, // Variable pour désactiver le bouton pendant le chargement
        componentKey: 0,// Clé pour recharger le composant

        regions: [],
        districts: [],
        communes: [],
        organisations: [], // Ajouter un tableau pour stocker les organisations

        selectedRegion: null,
        selectedDistrict: null,
        selectedCommune: null,
        ageOptions: [
          "H+", "H-", "F+", "F-" // Tranches d'âges à adapter
        ],
      };
    },
    created() {
      this.loadData();
      this.loadOrganisations(); // Charger les organisations

    },
    methods: {
        async loadData() {
      try {
        const response = await axios.get("/data.json");
        const groupedData = response.data.reduce((acc, item) => {
          const regionCode = item["CodeRegion"];
          const districtCode = item["CodeDistrict"];
          const communeCode = item["CodeCommune"];
          if (!regionCode || !districtCode || !communeCode) {
            console.warn("Données manquantes pour un élément", item);
            return acc;
          }
          if (!acc[regionCode]) {
            acc[regionCode] = { Region: item.Region, CodeRegion: regionCode, districts: {} };
          }
          if (!acc[regionCode].districts[districtCode]) {
            acc[regionCode].districts[districtCode] = { District: item.District, CodeDistrict: districtCode, communes: [] };
          }
          acc[regionCode].districts[districtCode].communes.push({ CodeCommune: communeCode, Commune: item.Commune });
          return acc;
        }, {});
        this.regions = Object.values(groupedData);
      } catch (error) {
        console.error("Erreur de chargement des données JSON", error);
      }
    },
    async loadOrganisations() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/organisations/");
        this.organisations = response.data.organisations; // Charger les organisations dans le tableau
      } catch (error) {
        console.error("Erreur de chargement des organisations", error);
      }
    },
  
        loadDistricts() {
        // Trouver la région sélectionnée dans l'accumulateur
        const selectedRegionData = this.regions.find(region => region.Region === this.selectedRegion);

        if (selectedRegionData) {
            // Mettre à jour les districts de la région sélectionnée
            this.districts = Object.values(selectedRegionData.districts);
        } else {
            this.districts = [];
        }

        // Réinitialiser les autres champs
        this.selectedDistrict = null;
        this.selectedCommune = null;
        this.communes = [];
        }
        ,
        
      loadCommunes() {
        // Trouver le district sélectionné dans les districts
        const selectedDistrictData = this.districts.find(district => district.District === this.selectedDistrict);
  
        if (selectedDistrictData) {
          // Mettre à jour les communes du district sélectionné
          this.communes = selectedDistrictData.communes;
        } else {
          this.communes = [];
        }
  
        // Réinitialiser la commune sélectionnée
        this.selectedCommune = null;
      },


      async submitForm() {
            // Vérifier que toutes les sélections ont été faites avant de soumettre
            if (!this.selectedRegion || !this.selectedDistrict || !this.selectedCommune) {
                alert("Veuillez sélectionner une région, un district et une commune.");
                return;
            }

            if (!this.formData.organisation) {
                alert("Veuillez sélectionner une organisation.");
                return;
            }

            this.isSubmitting = true; // Désactive le bouton et active le chargement

          

            // Recherche des codes à partir des sélections
            const selectedRegionObj = this.regions.find(region => region.Region === this.selectedRegion);
            const selectedDistrictObj = this.districts.find(district => district.District === this.selectedDistrict);
            const selectedCommuneObj = this.communes.find(commune => commune.Commune === this.selectedCommune);

            // Vérifier si les objets sont trouvés
            if (!selectedRegionObj || !selectedDistrictObj || !selectedCommuneObj) {
                console.log("Erreur dans la recherche des codes : ");
                 //console.log("Region : ", selectedRegionObj);
                //console.log("District : ", selectedDistrictObj);
                //console.log("Commune : ", selectedCommuneObj);
                alert("Erreur dans la recherche des codes. Assurez-vous que les sélections sont correctes.");
                return;
            }

            // Préparer les données à envoyer avec les champs attendus par l'API
            const formDataToSend = {
                ...this.formData,
                region: this.selectedRegion,
                district: this.selectedDistrict,
                commune: this.selectedCommune,
                codeRegion: selectedRegionObj.CodeRegion,
                codeDistrict: selectedDistrictObj.CodeDistrict,
                codeCommune: selectedCommuneObj.CodeCommune,
                organisation_id :this.formData.organisation,
            };

          //  console.log("Données soumises : ", formDataToSend);

            try {
                // Appel API pour soumettre les données
                const response = await axios.post("http://127.0.0.1:8000/api/personnes/", formDataToSend, {
                headers: {
                    "Content-Type": "application/json",  // Si nécessaire
                    "Authorization": "Bearer YOUR_TOKEN_HERE",  // Si l'API nécessite un token
                }
                });

                
                    // ✅ Vérifier que l'ID est bien récupéré
                const nouvellePersonne = response.data.description; // Assure-toi que l'ID est bien renvoyé ici
                console.log("Nouvelle personne créée :", nouvellePersonne);

                this.$emit('formSubmitted');


                if (!nouvellePersonne || !nouvellePersonne.id) {
                console.error("Erreur : la réponse ne contient pas d'ID");
                return;
                }

               // console.log("Formulaire soumis avec succès", response.data);
                this.$emit("personne-creee", nouvellePersonne); // 🔹 Émet l'événement avec la personne créée
                console.log("✅ Événement personne-creee émis :", nouvellePersonne);

                alert("Personne créée avec succès!");

                // Réinitialiser le formulaire si nécessaire
                this.resetForm();
            } catch (error) {
                console.error("Erreur lors de la soumission du formulaire", error.response || error);
                alert("Erreur lors de la soumission du formulaire.");
            }
            finally {
                this.isSubmitting = false; // Réactive le bouton après le traitement
              

            }
            },
            
      resetForm() {
        this.formData = {
          nom: "",
          age: "",
          tel: "",
          psh: false,
          email: "",
          fb: "",
          fonction_fiche: "",
          organisation: "",
          region: "",
          district: "",
          commune: "",
          organisation_id: 1,
        };
        this.selectedRegion = null;
        this.selectedDistrict = null;
        this.selectedCommune = null;
        this.districts = [];
        this.communes = [];
      },
    }
  };
  </script>
  