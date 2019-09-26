<template>
  <b-row>
    <b-col lg="3" sm="12" offset-lg="4">
    <h1 class="w-warehouses-add-form-h1">Add a New Warehouse</h1>
    <w-form
      @form-submitted="sendData"
      submitButtonName="ADD WAREHOUSE"
      :warehouseName="warehouseName"
      :address="address"
      :type="type"
    ></w-form>
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
            async sendData(newWarehouse) {
                newWarehouse.companyInfo = this.currentCompany;
                const res = await this.sendNewWarehouseData(newWarehouse);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
