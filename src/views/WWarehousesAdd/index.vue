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
    import Vue from 'vue';
    import { ToastPlugin, BButton } from 'bootstrap-vue';
    import { mapActions, mapState } from 'vuex';

    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WWarehouseForm';
    import router from '../../router';

    Vue.use(ToastPlugin);

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
                'currentCompany',
                'popup'
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
                if (this.popup.done) {
                    this.redirect();
                } else {
                    this.popup.done = true;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
