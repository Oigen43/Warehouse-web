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

      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-warehouses-form-button">
        <b-spinner v-if="loading" class="w-warehouses-form-button-spinner"></b-spinner>
        {{ submitButtonName }}
      </b-button>
    </b-form>
</template>

<script>
    import { mapState } from 'vuex';
    import { BForm, BFormInput, BSpinner, BButton } from 'bootstrap-vue';

    export default {
        name: 'WWarehouseForm',
        components: {
            BForm,
            BFormInput,
            BSpinner,
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
            }
        },
        data: function () {
            return {
                form: {
                    id: this.id,
                    warehouseName: this.warehouseName,
                    address: this.address
                }
            };
        },
        computed: {
            ...mapState([
                'loading'
            ])
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', this.form);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
