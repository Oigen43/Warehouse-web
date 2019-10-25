<template>
  <b-row>
    <b-col
      v-if="updatedWarehouse.id"
      class="w-warehouses-update-form"
      lg="4"
      offset-lg="4">
      <h1 class="w-warehouses-update-form-h1">Update Warehouse</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE WAREHOUSE"
        :id="warehouseId"
        :warehouseName="warehouseName"
        :address="warehouseAddress"
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
            companyId() {
              return this.$route.params.companyId;
            },
            warehouseId() {
                return +this.$route.params.warehouseId;
            },
            warehouseName() {
                return this.updatedWarehouse.warehouseName;
            },
            warehouseAddress() {
                return this.updatedWarehouse.address;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedWarehouseData: 'getUpdatedWarehouse',
                sendUpdatedWarehouseData: 'sendUpdatedWarehouse'
            }),
            redirect() {
                router.push(`/companies/${this.companyId}/warehouses`);
            },
            async sendData(warehouse) {
                const res = await this.sendUpdatedWarehouseData(warehouse);

                !res.error && this.redirect();
            }
        },
        created: function() {
            this.getUpdatedWarehouseData(this.warehouseId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
