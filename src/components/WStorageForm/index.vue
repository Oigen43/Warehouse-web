<template>
  <b-form @submit.prevent="capacityCheck" class="w-storage-form">
    <label
      class="w-storage-form-input-label"
      for="storage-size-input">
      Storage size (m³):
    </label>
    <b-form-input
      id="storage-size-input"
      size="lg"
      v-model="form.storageCapacity"
      type="number"
      min="1"
      required
      class="w-storage-form-input"
    ></b-form-input>

    <label
      class="w-storage-form-input-label"
      for="storage-type-input">
      Storage type:
    </label>
    <w-multiselect
      id="storage-type-input"
      :options="storageTypes"
      :multiple="false"
      :searchable="false"
      :taggable="false"
      label="type"
      size="lg"
      :allow-empty="false"
      :preselectFirst="true"
      :close-on-select="true"
      :placeholder="placeholder"
      v-model="form.storageType"
      class="w-storage-form-input"
    ></w-multiselect>

    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-storage-form-button">
      {{ submitButtonName }}
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    import customToasts from '../../constants/customToasts';
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
                type: Number
            },
            currentCapacity: {
                type: Number
            },
            currentCapacityCheck: {
                type: Boolean
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
                    currentCapacity: this.currentCapacity,
                    storageType: this.selectedStorageType
                },
                placeholder: 'Please select storage type'
            };
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', this.form);
            },
            capacityCheck() {
                if (this.currentCapacityCheck) {
                    const fulledPlace = this.storageCapacity - this.currentCapacity;

                    this.form.storageCapacity < fulledPlace ? this.makeToast(customToasts.wrongStorageCapacity) : this.onSubmit();
                } else {
                    this.form.currentCapacity = this.form.storageCapacity;
                    this.onSubmit();
                }
            },
            makeToast(toast, number) {
                this.$bvToast.toast(`${toast.message} ${number}`, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
