<template>
  <b-form @submit.prevent="onSubmit" class="w-storages-form">
    <b-form-input
      size="lg"
      v-model="form.storageCapacity"
      required
      placeholder="Storage Size"
      class="w-storages-form-input"
    ></b-form-input>

    <b-form-input
      size="lg"
      v-model="form.storageType"
      required
      placeholder="Storage Type"
      class="w-storages-form-input"
    ></b-form-input>

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

    export default {
        name: 'WStorageForm',
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
            storageCapacity: {
                type: String,
                default: '',
            },
            storageType: {
                type: String,
                default: '',
            }
        },
        data: function () {
            return {
                form: {
                    id: this.id,
                    storageCapacity: this.storageCapacity,
                    storageType: this.storageType
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
