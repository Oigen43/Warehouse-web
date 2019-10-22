<template>
    <b-form @submit.prevent="onSubmit" class="w-users-form">
      <div
        v-if="addUser">
        <b-form-input
          id="company-user-first-name-input"
          size="lg"
          v-model="form.firstName"
          required
          placeholder="User first name"
          class="w-users-form-input"
        ></b-form-input>
        <b-form-input
          id="company-user-email-input"
          size="lg"
          v-model="form.email"
          required
          type="email"
          placeholder="User email"
          class="w-users-form-input"
        ></b-form-input>
      </div>
      <div v-else>
        <b-form-input
        id="user-first-name-input"
        size="lg"
        v-model="form.firstName"
        required
        placeholder="User first name"
        class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          id="user-surname-input"
          size="lg"
          v-model="form.surname"
          placeholder="User surname"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          id="user-patronymic-input"
          size="lg"
          v-model="form.patronymic"
          placeholder="User patronymic"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          id="user-email-input"
          size="lg"
          v-model="form.email"
          required
          type="email"
          placeholder="User email"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          size="lg"
          v-model="form.address"
          placeholder="User address (city, street, house, flat)"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          size="lg"
          v-model="form.birthDate"
          type="date"
          placeholder="User birth date"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          id="user-login-input"
          size="lg"
          v-model="form.login"
          required
          placeholder="User login"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          v-if="passwordDisplay"
          id="user-password-input"
          size="lg"
          v-model="form.password"
          type="password"
          required
          placeholder="User password"
          class="w-users-form-input"
        ></b-form-input>
      </div>

      <w-multiselect
        :value="selectedRoles"
        :options="checkRolesForCompanyUsers ? rolesForCreatingCompanyUsers : rolesForCreating"
        :multiple="true"
        :searchable="false"
        :taggable="true"
        :close-on-select="false"
        :placeholder="placeholder"
        @input="updateValue"
        class="w-users-form-input"
      ></w-multiselect>

      <w-multiselect
        v-if="isWarehousesRoleSelected"
        v-model="selectedWarehouseData"
        :options="warehousesNames"
        label="warehouseName"
        :searchable="false"
        :allow-empty="false"
        :preselectFirst="true"
        :placeholder="selectWarehousePlaceholder"
        class="w-users-form-input"
      ></w-multiselect>

      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-users-form-button"
        :disabled="disableState">
        {{ submitButtonName }}
      </b-button>
    </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';
    import { mapState } from 'vuex';
    import * as userRoles from '../../constants/roles';
    import WMultiselect from '../WMultiselect';

    export default {
        name: 'WUserForm',
        components: {
            BForm,
            BFormInput,
            BButton,
            WMultiselect
        },
        props: {
            submitButtonName: {
                type: String
            },
            id: {
                type: Number,
            },
            firstName: {
                type: String,
            },
            surname: {
                type: String,
            },
            patronymic: {
                type: String,
            },
            email: {
                type: String,
            },
            address: {
                type: String,
            },
            birthDate: {
                type: String,
            },
            login: {
                type: String,
            },
            password: {
                type: String,
            },
            passwordDisplay: {
                type: Boolean,
                default: true
            },
            userRoles: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            companyId: {
                type: Number,
                default: null
            },
            warehousesNames: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            selectedWarehouse: {
                type: Object
            },
            disableState: {
                type: Boolean,
                default: false
            },
            addUser: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                form: {
                    id: this.id,
                    firstName: this.firstName,
                    surname: this.surname,
                    patronymic: this.patronymic,
                    email: this.email,
                    address: this.address,
                    birthDate: this.birthDate,
                    login: this.login,
                    password: this.password
                },

                selectedWarehouseData: this.selectedWarehouse,
                rolesForCreating: userRoles.ROLES_FOR_CREATING,
                rolesForCreatingCompanyUsers: userRoles.ROLES_FOR_CREATING_COMPANY_USERS,
                selectedRoles: this.userRoles,
                placeholder: 'Add a role',
                selectWarehousePlaceholder: 'Please select the warehouse',
            };
        },
        computed: {
          ...mapState([
              'roles',
          ]),
          checkRolesForCompanyUsers() {
              return this.roles.includes(userRoles.COMPANY_ADMIN_ROLE);
          },
          isWarehousesRoleSelected() {
              return this.selectedRoles.some(item => userRoles.WAREHOUSE_ROLES.includes(item));
          }
        },
        methods: {
            updateValue(newRoles) {
                this.selectedRoles = newRoles;
                this.$emit('role-selected', this.selectedRoles);
            },

            onSubmit() {
                this.form.warehouseId = this.selectedWarehouseData.id;
                this.$emit('form-submitted', { user: {
                    data: this.form,
                    selectedRoles: this.selectedRoles
                } });
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
