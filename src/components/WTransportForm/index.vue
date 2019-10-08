<template>
  <b-form @submit.prevent="onSubmit" class="w-transport-form">
    <b-form-input
      size="lg"
      v-model="form.transportType"
      required
      placeholder="Transport type"
      class="w-transport-form-input"
    ></b-form-input>

    <b-form-input
      size="lg"
      v-model="form.transportNumber"
      required
      placeholder="Transport Number"
      class="w-transport-form-input"
    ></b-form-input>

    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-transport-form-button">
      {{ submitButtonName }}
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WSenderForm',
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
            transportType: {
                type: String,
                default: '',
            },
            transportNumber: {
                type: String,
                default: '',
            }
        },
        data: function () {
            return {
                form: {
                    id: this.id,
                    transportType: this.transportType,
                    transportNumber: this.transportNumber
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
  @import './styles.scss';
</style>
