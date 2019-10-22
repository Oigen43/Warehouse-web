<template>
  <b-row>
    <b-col class="w-warehouses-add-form" lg="4" offset-lg="4">
    <h1 class="w-warehouses-add-form-h1">Add a New Warehouse</h1>
    <w-form
      @form-submitted="sendData"
      submitButtonName="ADD WAREHOUSE"
      :warehouseName="warehouseName"
      :address="address"
    ></w-form>
    <b-button
      variant="link"
      @click="redirect"
      class="w-warehouses-go-back-link"
    >Go Back
    </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions } from 'vuex';

    import WForm from '../../components/WWarehouseForm';
    import router from '../../router';

    export default {
        name: 'WWarehousesAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
        },
        data: function () {
            return {
                warehouseName: '',
                address: '',
                adminName: '',
                adminEmail: ''
            };
        },
        computed: {
            companyId: function() {
                return this.$route.params.companyId;
            }
        },
        methods: {
            ...mapActions({
                sendNewWarehouseData: 'createWarehouse'
            }),
            redirect() {
                router.push(`/companies/${this.companyId}/warehouses`);
            },
            async sendData(newWarehouse) {
                newWarehouse.companyId = this.companyId;

                const res = await this.sendNewWarehouseData(newWarehouse);

                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
