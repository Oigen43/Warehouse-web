<template>
  <b-form @submit.prevent="onSubmit" class="w-write-off-form">
    <label
      class="w-write-off-form-input-label"
      for="write-off-number">
      Write-off number:
    </label>
    <b-form-input
      id="write-off-number"
      size="lg"
      v-model="form.number"
      type="number"
      min="1"
      required
      placeholder="Write-Off Number"
      class="w-write-off-form-input"
    ></b-form-input>

    <label
      class="w-write-off-form-input-label"
      for="write-off-controller">
      Controller:
    </label>
    <b-form-input
      id="write-off-controller"
      size="lg"
      :value="formattedControllerName"
      disabled
      class="w-write-off-form-input"
    ></b-form-input>
    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-write-off-form-button">
      CONFIRM
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WForm',
        components: {
            BForm,
            BFormInput,
            BButton
        },
        props: {
            controller: {
                type: Object
            },
            TTNId: {
                type: Number
            },
            submitButtonName: {
                type: String
            }
        },
        data() {
            return {
                form: {
                    number: null,
                    controller: this.controller,
                    TTNId: this.TTNId
                }
            };
        },
        computed: {
            formattedControllerName() {
                return `${this.controller.surname} ${this.controller.firstName}`;
            },
        },
        methods: {
            onSubmit() {
                this.form.registrationDate = new Date();
                this.$emit('form-submitted', this.form);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
