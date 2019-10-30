<template>
    <b-form @submit.prevent="onSubmit" class="w-users-form">
      <div v-if="addUser">
        <label
          class="w-user-form-input-label"
          for="company-user-first-name-input">
          User first name:
        </label>
        <b-form-input
          id="company-user-first-name-input"
          size="lg"
          v-model="form.firstName"
          required
          class="w-users-form-input"
        ></b-form-input>

        <label
          class="w-user-form-input-label"
          for="company-user-email-input">
          User email:
        </label>
        <b-form-input
          id="company-user-email-input"
          size="lg"
          v-model="form.email"
          required
          type="email"
          class="w-users-form-input"
        ></b-form-input>
      </div>
      <div v-else>
        <label
          class="w-user-form-input-label"
          for="user-first-name-input">
          User first name:
        </label>
        <b-form-input
        id="user-first-name-input"
        size="lg"
        v-model="form.firstName"
        required
        class="w-users-form-input"
        ></b-form-input>

        <label
          class="w-user-form-input-label"
          for="user-surname-input">
          User surname:
        </label>
        <b-form-input
          id="user-surname-input"
          size="lg"
          v-model="form.surname"
          class="w-users-form-input"
        ></b-form-input>

        <label
          class="w-user-form-input-label"
          for="user-patronymic-input">
          User patronymic:
        </label>
        <b-form-input
          id="user-patronymic-input"
          size="lg"
          v-model="form.patronymic"
          class="w-users-form-input"
        ></b-form-input>

        <label
          class="w-user-form-input-label"
          for="user-email-input">
          User email:
        </label>
        <b-form-input
          id="user-email-input"
          size="lg"
          v-model="form.email"
          required
          type="email"
          class="w-users-form-input"
        ></b-form-input>

        <label
          class="w-user-form-input-label"
          for="user-address-input">
          User address (city, street, house, flat):
        </label>
        <b-form-input
          id="user-address-input"
          size="lg"
          v-model="form.address"
          class="w-users-form-input"
        ></b-form-input>

        <label
          class="w-user-form-input-label"
          for="user-birth-date-input">
          User birth date:
        </label>
        <b-form-input
          id="user-birth-date-input"
          size="lg"
          v-model="form.birthDate"
          type="date"
          class="w-users-form-input"
        ></b-form-input>

        <label
          class="w-user-form-input-label"
          for="user-login-input">
          User login:
        </label>
        <b-form-input
          id="user-login-input"
          size="lg"
          v-model="form.login"
          required
          class="w-users-form-input"
        ></b-form-input>

        <label
          v-if="passwordDisplay"
          class="w-user-form-input-label"
          for="user-password-input">
          User password:
        </label>
        <b-form-input
          v-if="passwordDisplay"
          id="user-password-input"
          size="lg"
          v-model="form.password"
          type="password"
          required
          class="w-users-form-input"
        ></b-form-input>
      </div>

      <label
        class="w-user-form-input-label"
        for="user-role-input">
        User role:
      </label>
      <w-multiselect
        id="user-role-input"
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

      <label
        v-if="isWarehousesRoleSelected"
        class="w-user-form-input-label"
        for="user-warehouse-input">
        User warehouse:
      </label>
      <w-multiselect
        id="user-warehouse-input"
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
                this.form.warehouseId = this.selectedWarehouseData ? this.selectedWarehouseData.id : null;
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
