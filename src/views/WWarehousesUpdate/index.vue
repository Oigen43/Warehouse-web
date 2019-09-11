<template>
  <div class="w-warehouses-add-form">
    <w-navigation></w-navigation>
    <h1>Update Warehouse</h1>
    <w-form
      @form-submitted="sendData"
      submitButtonName="UPDATE WAREHOUSE"
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
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import router from '../../router';
    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WWarehouseForm';
    import { BButton } from 'bootstrap-vue';

    export default {
        name: 'WWarehousesUpdateForm',
        components: {
            WNavigation,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedWarehouse'
            ]),
            warehouseName () {
                return this.updatedWarehouse.warehouseName;
            },
            address () {
                return this.updatedWarehouse.address;
            },
            type () {
                return this.updatedWarehouse.type;
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
                await this.sendUpdatedWarehouseData(warehouse);
                this.redirect();
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
