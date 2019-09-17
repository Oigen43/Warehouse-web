<template>
  <div class="w-warehouses-add-form">
    <w-navigation></w-navigation>
    <h1>Add a New Warehouse</h1>
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
  </div>
</template>

<script>
    import { BButton } from 'bootstrap-vue';
    import { mapActions, mapState } from 'vuex';

    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WWarehouseForm';
    import router from '../../router';

    export default {
        name: 'WWarehousesAddForm',
        components: {
            WNavigation,
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
                newWarehouse.companyName = this.currentCompany;
                const res = await this.sendNewWarehouseData(newWarehouse);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
