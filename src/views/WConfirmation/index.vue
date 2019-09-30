<template>
    <b-row>
      <b-col lg="3" sm="12" offset-lg="4">
        <h1 class="w-user-registration-h1">Registration Completion</h1>
        <b-form class="w-users-form">
          <b-form-input
            size="lg"
            placeholder="User first name"
            class="w-users-form-input"
          ></b-form-input>

          <b-form-input
            size="lg"
            required
            placeholder="User surname"
            class="w-users-form-input"
          ></b-form-input>

          <b-button
            type="submit"
            variant="outline-dark"
            size="lg"
            class="w-users-form-button"
          >
          Complete
          </b-button>
        </b-form>
      </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WConfirmation',
        components: {
          BRow,
          BCol,
          BForm,
          BFormInput,
          BButton
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
