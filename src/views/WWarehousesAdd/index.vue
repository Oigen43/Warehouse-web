<template>
  <b-row>
    <b-col lg="3" sm="12" offset-lg="4">
    <h1 class="w-warehouses-add-form-h1">Add a New Warehouse</h1>
    <w-form
      @form-submitted="getNewWarehouse"
      submitButtonName="ADD WAREHOUSE"
      :warehouseName="warehouseName"
      :address="address"
      :type="type"
    ></w-form>

    <w-admin-create
      @submit-warehouse-admin="getWarehouseAdmin"
      :name="adminName"
      :email="adminEmail"
    ></w-admin-create>

    <b-button
      @submit.prevent="sendNewWarehouse"
      variant="success"
    ></b-button>

    <b-button
      variant="link"
      to="/warehouses"
      class="w-warehouses-go-back-link"
    >Go Back
    </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions, mapState } from 'vuex';

    import WForm from '../../components/WWarehouseForm';
    import router from '../../router';
    import WAdminCreate from '../../components/WWarehouseAdminCreateForm';

    export default {
        name: 'WWarehousesAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WAdminCreate
        },
        data: function () {
            return {
                warehouseName: '',
                address: '',
                type: '',
                adminName: '',
                adminEmail: ''
            };
        },
        computed: {
            ...mapState([
                'currentCompany'
            ])
        },
        methods: {
            ...mapActions({
                sendNewWarehouseData: 'createWarehouse'
            }),
            redirect() {
                router.push('/warehouses');
            },
            getNewWarehouse(newWarehouse) {
                newWarehouse.companyInfo = this.currentCompany;
                return newWarehouse;
            },
            getWarehouseAdmin(warehouseAdmin) {
                return warehouseAdmin;
            },
            // async sendData(newWarehouse) {
            //     newWarehouse.companyInfo = this.currentCompany;
            //     const res = await this.sendNewWarehouseData(newWarehouse);
            //     !res.error && this.redirect();
            // },
            // async sendAdminData(warehouseAdmin) {
            //
            // },
            async sendNewWarehouse() {
                const warehouse = this.getNewWarehouse();
                const admin = this.getWarehouseAdmin();
                const res = await this.sendNewWarehouseData({ warehouse, admin });
                //!res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
