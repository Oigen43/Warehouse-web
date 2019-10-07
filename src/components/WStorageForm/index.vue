<template>
  <b-form @submit.prevent="onSubmit" class="w-storages-form">
    <b-form-input
      size="lg"
      v-model="form.storageCapacity"
      required
      placeholder="Storage Size"
      class="w-storages-form-input"
    ></b-form-input>

    <b-form-select
      class="w-storages-form-input"
      required
      size="lg"
      v-model="form.storageType"
      :options="options">
      <template v-slot:first>
        <option :value="null" disabled>Please select storage type</option>
      </template>
    </b-form-select>

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
    import { BForm, BFormInput, BFormSelect, BButton } from 'bootstrap-vue';

    export default {
        name: 'WStorageForm',
        components: {
            BForm,
            BFormInput,
            BFormSelect,
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
                type: Number,
                default: null
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
                }
            };
        },
        computed: {
          options() {
              return this.storageTypes.map(function(item) {
                  return {
                      value: item.id,
                      text: item.type
                  };
              });
          }
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
