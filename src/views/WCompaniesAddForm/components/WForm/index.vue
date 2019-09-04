<template>
  <div>
    <b-form @submit="onSubmit" v-if="show" class="w-companies-add-form">
      <b-form-group
        id="company-name"
        label-size="lg"
        label-cols-lg="4"
        label="Company name:"
        label-for="company-name-input"
        class="w-companies-add-input-group"
      >
        <b-form-input
          id="company-name-input"
          size="lg"
          v-model="form.name"
          required
          placeholder="Enter company name"

        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="company-address"
        label-size="lg"
        label-cols-lg="4"
        label="Company address:"
        label-for="company-address-input"
        class="w-companies-add-input-group"
      >
        <b-form-input
          id="company-address-input"
          size="lg"
          v-model="form.address"
          required
          placeholder="Enter company address"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="company-description"
        label-size="lg"
        label-cols-lg="4"
        label="Description:"
        label-for="company-description-input"
        class="w-companies-add-input-group"
      >
        <b-form-input
          id="company-description-input"
          size="lg"
          v-model="form.description"
          required
          placeholder="Enter company description"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit">add company</b-button>
    </b-form>
  </div>
</template>

<script>
    import { BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WForm',
        components: {
            BForm,
            BFormGroup,
            BFormInput,
            BButton
        },
        data() {
            return {
                form: {
                    name: '',
                    address: '',
                    description: null,
                    active: true
                },
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.form))
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
