<template>
  <b-form @submit.prevent="onSubmit" class="w-storages-form">
    <b-form-input
      size="lg"
      v-model="form.storageCapacity"
      required
      placeholder="Storage Size"
      class="w-storages-form-input"
    ></b-form-input>

    <w-multiselect
      :options="storageTypes"
      :multiple="false"
      label="type"
      size="lg"
      :allow-empty="false"
      :preselectFirst="true"
      :close-on-select="true"
      :placeholder="placeholder"
      v-model="form.storageType"
      class="w-storages-form-input"
    ></w-multiselect>

    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-storages-form-button"
    >
      {{ submitButtonName }}
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    import WMultiselect from '../WMultiselect';

    export default {
        name: 'WStorageForm',
        components: {
            BForm,
            BFormInput,
            WMultiselect,
            BButton
        },
        props: {
            submitButtonName: {
                type: String
            },
            id: {
                type: Number
            },
            storageCapacity: {
                type: String,
                default: ''
            },
            selectedStorageType: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            storageTypes: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data: function () {
            return {
                form: {
                    id: this.id,
                    storageCapacity: this.storageCapacity,
                    storageType: this.selectedStorageType
                },
                placeholder: 'Please select storage type'
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
