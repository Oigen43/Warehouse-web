<template>
  <div>
    <b-form @submit="onSubmit" v-if="show" class="w-companies-add-form">
      <b-form-input
        id="company-name-input"
        size="lg"
        v-model="form.companyName"
        required
        placeholder="Company name"
        class="w-companies-add-input"
      ></b-form-input>

      <b-form-input
        id="company-address-input"
        size="lg"
        v-model="form.address"
        required
        placeholder="Company address"
        class="w-companies-add-input"
      ></b-form-input>

      <b-form-input
        id="company-description-input"
        size="lg"
        v-model="form.description"
        required
        placeholder="Company description"
        class="w-companies-add-input"
      ></b-form-input>

      <b-button
        type="submit"
        variant="outline-success"
        size="lg"
        class="w-companies-add-button"
      >
        ADD COMPANY
      </b-button>
    </b-form>

    <b-button
      variant="link"
      to="/companies"
      class="w-companies-add-link"
    >Go Back
    </b-button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { BForm, BFormInput, BButton } from 'bootstrap-vue';

  export default {
    name: 'WForm',
    components: {
      BForm,
      BFormInput,
      BButton
    },
    data: function () {
      return {
        form: {
          companyName: '',
          address: '',
          description: null,
          active: true
        },
        show: true
      };
    },
    methods: {
      ...mapActions({
        sendNewCompanyData: 'createCompany'
      }),
      onSubmit(evt) {
        evt.preventDefault();
        this.sendNewCompanyData(this.form);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
