<template>
  <b-form @submit.prevent="onSubmit" class="w-companies-form">
    <b-form-input
      id="company-name-input"
      size="lg"
      v-model="companyForm.companyName"
      required
      placeholder="Company name"
      class="w-companies-form-input"
    ></b-form-input>

    <b-form-input
      id="company-address-input"
      size="lg"
      v-model="companyForm.address"
      required
      placeholder="Company address"
      class="w-companies-form-input"
    ></b-form-input>

    <b-form-input
      id="company-description-input"
      size="lg"
      v-model="companyForm.description"
      required
      placeholder="Company description"
      class="w-companies-form-input"
    ></b-form-input>

    <div
      v-if="addCompany">
      <b-form-input
        id="company-price-input"
        size="lg"
        v-model="priceForm.dailyPrice"
        required
        placeholder="Company price"
        class="w-companies-form-input"
      ></b-form-input>

      <b-form-input
        id="company-begin-date-input"
        size="lg"
        v-model="priceForm.activeDate"
        type="date"
        :min="minDate"
        required
        placeholder="Company price"
        class="w-companies-form-input"
      ></b-form-input>
    </div>

    <div v-if="withAdminFields"
         class="w-companies-admin">
      <h3>Add company admin</h3>
      <b-form-input
        v-model="adminForm.firstName"
        size="lg"
        required
        placeholder="Admin name"
        class="w-companies-admin-form-input">
      </b-form-input>

      <b-form-input
        v-model="adminForm.email"
        size="lg"
        required
        placeholder="Admin email"
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
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    import * as userRoles from '../../constants/roles';

    export default {
        name: 'WCompanyForm',
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
            dailyPrice: {
                type: Number,
                default: 0
            },
            activeDate: {
                type: String,
                default: ''
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
            },
            addCompany: {
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
                    description: this.description,
                },
                adminForm: {
                    firstName: this.adminName,
                    email: this.adminEmail
                },
                priceForm: {
                    dailyPrice: this.dailyPrice,
                    activeDate: this.activeDate
                }
            };
        },
        computed: {
            minDate() {
                const date = new Date();
                const year = date.getFullYear();
                const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                const day = (date.getDate() + 1) < 10 ? '0' + (date.getDate()) : (date.getDate());

                return `${year}-${month}-${day}`;
            }
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', {
                    company: this.companyForm,
                    priceForm: this.priceForm,
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
