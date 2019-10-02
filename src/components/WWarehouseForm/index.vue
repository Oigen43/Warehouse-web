<template>
    <b-form @submit.prevent="onSubmit" class="w-warehouses-form">
      <b-form-input
        id="warehouse-name-input"
        size="lg"
        v-model="form.warehouseName"
        required
        placeholder="Warehouse name"
        class="w-warehouses-form-input"
      ></b-form-input>

      <b-form-input
        id="warehouse-address-input"
        size="lg"
        v-model="form.address"
        required
        placeholder="Warehouse address"
        class="w-warehouses-form-input"
      ></b-form-input>

      <b-form-input
        id="warehouse-type-input"
        size="lg"
        v-model="form.type"
        required
        placeholder="Warehouse type"
        class="w-warehouses-form-input"
      ></b-form-input>

      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-warehouses-form-button"
      >
        {{ submitButtonName }}
      </b-button>
    </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WWarehouseForm',
        components: {
            BForm,
            BFormInput,
            BButton
        },
        props: {
            submitButtonName: {
                type: String,
            },
            id: {
                type: Number
            },
            warehouseName: {
                type: String,
                default: '',
            },
            address: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: '',
            }
        },
        data: function () {
            return {
                form: {
                    id: this.id,
                    warehouseName: this.warehouseName,
                    address: this.address,
                    type: this.type
                }
            };
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', this.form);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
