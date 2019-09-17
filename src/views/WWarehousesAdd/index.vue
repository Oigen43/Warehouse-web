<template>
  <b-row>
    <b-col lg="4"></b-col>
    <b-col lg="4" sm="12">
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
    <b-col lg="4"></b-col>
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
            WForm,
            BButton
        },
        data: function () {
            return {
                warehouseName: '',
                address: '',
                type: ''
            };
        },
        computed: {
            ...mapState([
                'currentCompany',
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
                newWarehouse.companyName = this.currentCompany;
                await this.sendNewWarehouseData(newWarehouse);
                this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
