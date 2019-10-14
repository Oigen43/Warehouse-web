<template>
  <b-row>
    <b-col v-if="storageTypes" class="w-storages-add-form" lg="4" offset-lg="4">
      <h1 class="w-storages-add-form-h1">Add a New Storage</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD STORAGE"
        :storageTypes="storageTypes"
        :selectedStorageType="selectedStorageType"
        :storageCapacity="storageCapacity"
      ></w-form>
      <b-button
        variant="link"
        @click="redirect"
        class="w-storages-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions, mapState } from 'vuex';

    import WForm from '../../components/WStorageForm';
    import router from '../../router';

    export default {
        name: 'WStoragesAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
        },
        data: function () {
            return {
                storageCapacity: '',
                selectedStorageType: null
            };
        },
        computed: {
            ...mapState([
                'currentWarehouse',
                'storageTypes'
            ]),
            companyId() {
                return +this.$route.params.companyId;
            },
            warehouseId() {
                return +this.$route.params.warehouseId;
            },
        },
        methods: {
            ...mapActions({
                fetchStorageTypes: 'fetchStorageTypes',
                sendNewStorageData: 'createStorage'
            }),
            redirect() {
                router.push(`/companies/${this.companyId}/warehouses/${this.warehouseId}/storages`);
            },
            async sendData(newStorage) {
                newStorage.warehouseId = this.warehouseId;
                const res = await this.sendNewStorageData(newStorage);
                !res.error && this.redirect();
            }
        },
        created: function() {
            this.fetchStorageTypes();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
