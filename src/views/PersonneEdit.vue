<template>

<div v-if="isLoading" class="w-full flex justify-center items-center py-10">
  <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
  <span class="ml-3 text-blue-600 font-medium">Chargement...</span>
</div>

  <div v-else class="mt-5 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-l font-bold mb-4">✏️ Modifier une personne</h3>
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Champs existants inchangés -->
      <div class="flex flex-col">
        <label for="nom" class="text-gray-700 font-medium">Nom</label>
        <input
          v-model="formData.nom"
          type="text"
          id="nom"
          class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Nom"
          required
        />
      </div>

      <div class="flex flex-col">
        <label for="age" class="text-gray-700 font-medium">Sexe / Âge</label>
        <select
          v-model="formData.age"
          id="age"
          class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        >
          <option disabled value="">Sélectionnez</option>
          <option v-for="ageOption in ageOptions" :key="ageOption" :value="ageOption">{{ ageOption }}</option>
        </select>
      </div>

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
        <span v-if="formData.tel && !/^(0\d{9})$/.test(formData.tel)" class="text-red-500 text-sm">
          Le numéro doit contenir exactement 10 chiffres et commencer par 0.
        </span>
      </div>

      <div class="flex flex-col">
        <label for="psh" class="text-gray-700 font-medium">PSH</label>
        <label class="flex items-center">
          <input type="checkbox" v-model="formData.psh" id="psh" class="mr-2" />
          Oui
        </label>
      </div>

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

      <div class="flex flex-col">
        <label for="fonction_fiche" class="text-gray-700 font-medium">Fonction</label>
        <input
          v-model="formData.fonction_fiche"
          type="text"
          id="fonction_fiche"
          class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Fonction"
        />
      </div>

      <div class="flex flex-col">
        <label for="region" class="text-gray-700 font-medium">Région</label>
        <select v-model="selectedRegion" @change="loadDistricts" id="region" class="p-2 border rounded-md" disabled>
          <option v-for="region in regions" :key="region.CodeRegion" :value="region.Region">
            {{ region.Region }}
          </option>
        </select>
      </div>

      <div class="flex flex-col" v-if="districts.length">
        <label for="district" class="text-gray-700 font-medium">District</label>
        <select v-model="selectedDistrict" @change="loadCommunes" id="district" class="p-2 border rounded-md">
          <option v-for="district in districts" :key="district.CodeDistrict" :value="district.District">
            {{ district.District }}
          </option>
        </select>
      </div>

      <div class="flex flex-col" v-if="communes.length">
        <label for="commune" class="text-gray-700 font-medium">Commune</label>
        <select v-model="selectedCommune" id="commune" class="p-2 border rounded-md">
          <option v-for="commune in communes" :key="commune.CodeCommune" :value="commune.Commune">
            {{ commune.Commune }}
          </option>
        </select>
      </div>

      <div class="flex flex-col">
        <label for="organisation" class="text-gray-700 font-medium">Organisation</label>
        <select
          v-model="formData.organisation"
          id="organisation"
          class="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Sélectionnez une organisation</option>
          <option 
            v-for="organisation in organisations" 
            :key="organisation.id" 
            :value="organisation.id"
          >
            {{ organisation.sigle }}
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
        {{ isSubmitting ? 'Modification en cours...' : 'Modifier' }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from '@/services/axios';
import { useUserStore } from '@/stores/user';

export default {
  props: {
    personneId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        nom: "",
        age: "",
        tel: "",
        psh: false,
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
      },
      isSubmitting: false,
      regions: [],
      districts: [],
      communes: [],
      organisations: [],
      selectedRegion: null,
      selectedDistrict: null,
      selectedCommune: null,
      ageOptions: ["H+", "H-", "F+", "F-"],
      isLoading: true, // Ajouté ici
      user: null,


    };
  },
  computed: {
    currentPersonneId() {
      return this.$route.params.id ? Number(this.$route.params.id) : this.personneId;
    },
  },
  created() {
    this.initializeData();
    const userStore = useUserStore();
    this.user = userStore.user;
  },
  methods: {
    async initializeData() {
      this.isLoading = true; // Commence le chargement

      try {
        await this.loadOrganisations();
        await this.loadData();
        if (this.currentPersonneId) {
          await this.loadPersonneData();
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation:", error);
      }  finally {
        this.isLoading = false; // Fin du chargement
      }
    },

    async loadData() {
      try {
        //const response = await axios.get("https://safidy-observatoire.net/BO/dist/data.json");
        const response = await axios.get("http://localhost:5173/data.json");

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
          const response = await axios.get("/organisations");
          this.tousLesorganisations = response.data.organisations;

          // Dictionnaire de mappage des utilisateurs à leurs régions
          const userRegionMap = {
            "PCEC HM": "HAUTE MATSIATRA",
            "CCAP HM": "HAUTE MATSIATRA",
            "CCAP SOFIA": "SOFIA",
            "CCAP MENABE": "MENABE",
            "CCAP AANDREFANA": "ATSIMO-ANDREFANA",
            "CCAP ANOSY": "ANOSY",
            "CCAP AATSINANANA": "ATSIMO-ATSINANANA",
            "PCEC AATSINANANA": "ATSIMO-ATSINANANA",
            "PCEC ANOSY": "ANOSY",
            "PCEC AANDREFANA": "ATSIMO-ANDREFANA",
            "PCEC MENABE": "MENABE",
            "PCEC SOFIA": "SOFIA"
          };

          // Définir la région cible selon l'utilisateur
          this.regionCible = userRegionMap[this.user.name] || null;

          if (!this.regionCible) {
            console.warn("Aucune région assignée à cet utilisateur :", this.user.name);
          }

          // Filtrage des organisations en fonction de la région cible
          this.organisations = this.regionCible 
            ? this.tousLesorganisations.filter(org => org.region === this.regionCible)
            : [];

          console.log("Organisations chargées :", this.organisations);
        } catch (error) {
          console.error("Erreur de chargement des organisations", error);
        }
      },


    

    async loadPersonneData() {
      try {
        const response = await axios.get(`/personnes/${this.currentPersonneId}/`);
        const personne = response.data.data || response.data;
        console.log("Données personne:", personne);

        let organisationId = "";
        if (personne.organisation_id) {
          organisationId = personne.organisation_id;
        } else if (personne.organisation) {
          const org = this.organisations.find(o => 
            o.id === personne.organisation || 
            o.denomination === personne.organisation
          );
          organisationId = org ? org.id : "";
        }

        this.formData = {
          nom: personne.nom || "",
          age: personne.age || "",
          tel: personne.tel || "",
          psh: Boolean(personne.psh),
          email: personne.email || "",
          fb: personne.fb || "",
          fonction_fiche: personne.fonction_fiche || "",
          organisation: organisationId,
          region: personne.region || "",
          codeRegion: personne.codeRegion || "",
          district: personne.district || "",
          codeDistrict: personne.codeDistrict || "",
          commune: personne.commune || "",
          codeCommune: personne.codeCommune || ""
        };

        this.selectedRegion = personne.region;
        await this.loadDistricts();
        this.selectedDistrict = personne.district;
        await this.loadCommunes();
        this.selectedCommune = personne.commune;

        console.log("formData final:", this.formData);
      } catch (error) {
        console.error("Erreur chargement personne:", error);
      }
    },
    loadRegion() {
          this.user.name = this.user?.name;

          const regionMap = {
            "PCEC HM": "HAUTE MATSIATRA",
            "CCAP HM": "HAUTE MATSIATRA",
            "CCAP SOFIA": "SOFIA",
            "CCAP MENABE": "MENABE",
            "CCAP AANDREFANA": "ATSIMO-ANDREFANA",
            "CCAP ANOSY": "ANOSY",
            "CCAP AATSINANANA": "ATSIMO-ATSINANANA",
            "PCEC AATSINANANA": "ATSIMO-ATSINANANA",
            "PCEC ANOSY": "ANOSY",
            "PCEC AANDREFANA": "ATSIMO-ANDREFANA",
            "PCEC MENABE": "MENABE",
            "PCEC SOFIA": "SOFIA"
          };

          if (regionMap[this.user.name]) {
            this.selectedRegion = regionMap[this.user.name];
            console.log("🔧 Appel de loadDistricts()");
            this.loadDistricts();
          } else {
            console.log("Utilisateur non identifié");
          }
        },

    async loadDistricts() {
      const selectedRegionData = this.regions.find(region => region.Region === this.selectedRegion);
      if (selectedRegionData) {
        this.districts = Object.values(selectedRegionData.districts);
        if (!this.districts.some(d => d.District === this.selectedDistrict)) {
          this.selectedDistrict = null;
        }
      } else {
        this.districts = [];
        this.selectedDistrict = null;
      }
      this.communes = [];
      this.selectedCommune = null;
    },

    async loadCommunes() {
      const selectedDistrictData = this.districts.find(district => district.District === this.selectedDistrict);
      if (selectedDistrictData) {
        this.communes = selectedDistrictData.communes;
        if (!this.communes.some(c => c.Commune === this.selectedCommune)) {
          this.selectedCommune = null;
        }
      } else {
        this.communes = [];
        this.selectedCommune = null;
      }
    },

    async submitForm() {
      // Activer l'état de soumission
      console.log("Organisation sélectionnée :", this.formData.organisation); // doit refléter la sélection

      this.isSubmitting = true;

      // Validation supplémentaire si nécessaire
      if (!this.formData.nom || !this.formData.age || !this.formData.tel) {
        alert("Veuillez remplir tous les champs obligatoires (Nom, Sexe/Âge, Téléphone).");
        this.isSubmitting = false;
        return;
      }

      if (!/^(0\d{9})$/.test(this.formData.tel)) {
        alert("Le numéro de téléphone doit contenir exactement 10 chiffres et commencer par 0.");
        this.isSubmitting = false;
        return;
      }

      // Préparer les données à envoyer
      const updatedData = {
        nom: this.formData.nom,
        age: this.formData.age,
        tel: this.formData.tel,
        psh: this.formData.psh ? 1 : 0, // Convertir booléen en 1 ou 0
        email: this.formData.email || null,
        fb: this.formData.fb || null,
        fonction_fiche: this.formData.fonction_fiche || null,
        organisation_id: this.formData.organisation || null, // Envoyer l'ID de l'organisation
        region: this.selectedRegion || null,
        codeRegion: this.formData.codeRegion || null,
        district: this.selectedDistrict || null,
        codeDistrict: this.formData.codeDistrict || null,
        commune: this.selectedCommune || null,
        codeCommune: this.formData.codeCommune || null
      };

      try {
        // Envoyer la requête PUT à l'API
        
        const response = await axios.put(
          `/personnes/${this.currentPersonneId}/`,
          updatedData
        );
        console.log("MODIF : Données envoyées à l'API :", updatedData);

        //console.log("Réponse de l'API:", response.data);
        
        // Afficher une confirmation
        alert("La personne a été modifiée avec succès !");
        
        // Optionnel : Rediriger ou recharger les données
        this.$router.push(`/personne/${this.currentPersonneId}`);        
      } catch (error) {
        console.error("Erreur lors de la modification:", error);
        if (error.response) {
          alert(`Erreur: ${error.response.data.message || 'Une erreur est survenue lors de la modification.'}`);
        } else {
          alert("Une erreur réseau est survenue. Veuillez réessayer.");
        }
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  watch: {
    '$route.params.id'(newId) {
      if (newId) {
        this.initializeData();
      }
    },
    'formData.organisation'(newValue) {
      console.log("Organisation sélectionnée:", newValue);
    }
  }
};
</script>