<template>
  <b-row>
    <b-col class="w-warehouses-update-form" lg="4" sm="12" offset-lg="4">
      <h1 class="w-warehouses-update-form-h1">Update Warehouse</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE WAREHOUSE"
        :id="warehouseId"
        :warehouseName="warehouseName"
        :address="address"
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
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from '../../components/WWarehouseForm';

    export default {
        name: 'WWarehousesUpdateForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedWarehouse'
            ]),
            warehouseId() {
                return this.updatedWarehouse.id;
            },
            warehouseName() {
                return this.updatedWarehouse.warehouseName;
            },
            address() {
                return this.updatedWarehouse.address;
            }
        },
        methods: {
            ...mapActions({
                sendUpdatedWarehouseData: 'sendUpdatedWarehouse'
            }),
            redirect() {
                router.push('/warehouses');
            },
            async sendData(warehouse) {
                const res = await this.sendUpdatedWarehouseData(warehouse);
                !res.error && this.redirect();
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
