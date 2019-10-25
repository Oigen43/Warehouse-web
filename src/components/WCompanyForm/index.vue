<template>
  <b-form @submit.prevent="onSubmit" class="w-companies-form">
    <label
      class="w-companies-form-input-label"
      for="company-name-input">
      Company name:
    </label>
    <b-form-input
      id="company-name-input"
      size="lg"
      v-model="companyForm.companyName"
      required
      class="w-companies-form-input"
    ></b-form-input>

    <label
      class="w-companies-form-input-label"
      for="company-address-input">
      Company address:
    </label>
    <b-form-input
      id="company-address-input"
      size="lg"
      v-model="companyForm.address"
      required
      class="w-companies-form-input"
    ></b-form-input>

    <label
      class="w-companies-form-input-label"
      for="company-description-textarea">
      Company description:
    </label>
    <b-form-textarea
      id="company-description-textarea"
      size="lg"
      v-model="companyForm.description"
      required
      rows="3"
      class="w-companies-form-input"
    ></b-form-textarea>

    <div v-if="withAdminFields">
      <h3 class="w-companies-admin-h1">Add company admin</h3>
      <label
        class="w-companies-form-input-label"
        for="admin-name-input">
        Admin name:
      </label>
      <b-form-input
        id="admin-name-input"
        v-model="adminForm.firstName"
        size="lg"
        required
        class="w-companies-admin-form-input">
      </b-form-input>

      <label
        class="w-companies-form-input-label"
        for="admin-email-input">
        Admin email:
      </label>
      <b-form-input
        id="admin-email-input"
        v-model="adminForm.email"
        type="email"
        size="lg"
        required
        class="w-companies-admin-form-input"
      ></b-form-input>
    </div>

    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-companies-form-button"
      :disabled="disableState">
      {{ submitButtonName }}
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BFormTextarea, BButton } from 'bootstrap-vue';

    import * as userRoles from '../../constants/roles';

    export default {
        name: 'WCompanyForm',
        components: {
            BForm,
            BFormInput,
            BFormTextarea,
            BButton
        },
        props: {
            submitButtonName: {
                type: String,
            },
            id: {
                type: Number
            },
            companyName: {
                type: String,
                default: '',
            },
            address: {
                type: String,
                default: '',
            },
            description: {
                type: String,
                default: '',
            },
            adminName: {
                type: String,
                default: ''
            },
            adminEmail: {
                type: String,
                default: ''
            },
            disableState: {
                type: Boolean,
                default: false
            },
            withAdminFields: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                companyForm: {
                    id: this.id,
                    companyName: this.companyName,
                    address: this.address,
                    description: this.description
                },
                adminForm: {
                    firstName: this.adminName,
                    email: this.adminEmail
                }
            };
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', {
                    company: this.companyForm,
                    user: {
                        data: this.adminForm,
                        roles: [userRoles.COMPANY_ADMIN_ROLE]
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
