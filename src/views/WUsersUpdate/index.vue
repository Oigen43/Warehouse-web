<template>
  <b-row>
    <b-col
      v-if="isFormShown"
      class="w-users-update-form"
      lg="4"
      offset-lg="4">
      <h1 class="w-users-update-form-h1">Update User</h1>
      <w-form
        @form-submitted="sendData"
        @role-selected="getWarehousesData"
        submitButtonName="UPDATE USER"
        :id="userId"
        :firstName="firstName"
        :surname="surname"
        :patronymic="patronymic"
        :email="email"
        :address="address"
        :birthDate="birthDate"
        :login="login"
        :userRoles="roles"
        :companyId="companyId"
        :warehouses-names="warehousesNames"
        :selected-warehouse="warehouse"
        :passwordDisplay="false"
      ></w-form>
      <b-button
        variant="link"
        to="/users"
        class="w-users-go-back-link"
      >Go Back
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import * as userRoles from '../../constants/roles';
    import WForm from '../../components/WUserForm';
    import router from '../../router';

    export default {
        name: 'WUsersUpdateForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedUser',
                'warehousesNames'
            ]),
            userId() {
                return +this.$route.params.userId;
            },
            firstName() {
                return this.updatedUser.firstName;
            },
            surname() {
                return this.updatedUser.surname;
            },
            patronymic() {
                return this.updatedUser.patronymic;
            },
            email() {
                return this.updatedUser.email;
            },
            address() {
                return this.updatedUser.address;
            },
            birthDate() {
                return this.updatedUser.birthDate;
            },
            login() {
                return this.updatedUser.login;
            },
            roles() {
                return this.updatedUser.roles ? this.updatedUser.roles.map(role => role.title) : [];
            },
            companyId() {
                return this.updatedUser.companyId;
            },
            warehouse() {
                if (this.warehousesNames) {
                    const index = this.warehousesNames.findIndex(item => {
                        return item.id === this.updatedUser.warehouseId;
                    });

                    return index !== -1 ? this.warehousesNames[index] : {};
                } else {
                    return null;
                }
            },
            hasWarehousesRole() {
                return this.updatedUser.roles &&
                    this.updatedUser.roles.some(item => this.userRoles.WAREHOUSE_ROLES.includes(item.title));
            },
            userRoles() {
                return userRoles;
            },
            isFormShown() {
                if (!this.updatedUser.id) {
                    return false;
                }

                return !(!this.warehousesNames && this.updatedUser.roles &&
                    this.updatedUser.roles.some(item => userRoles.WAREHOUSE_ROLES.includes(item.title)));
            }
        },
        methods: {
            ...mapActions({
                getUpdatedUserData: 'getUpdatedUser',
                sendUpdatedUserData: 'sendUpdatedUser',
                fetchWarehousesNames: 'fetchWarehousesNames'
            }),
            redirect() {
                router.push('/users');
            },
            async getWarehousesData(selectedRoles) {
                selectedRoles.some(item => this.userRoles.WAREHOUSE_ROLES.includes(item)) &&
                await this.fetchWarehousesNames({ companyId: this.updatedUser.companyId });
            },
            async sendData(user) {
                const res = await this.sendUpdatedUserData(user);
                !res.error && this.redirect();
            }
        },
        created: async function () {
            await this.getUpdatedUserData(this.userId);
            this.hasWarehousesRole && await this.fetchWarehousesNames({ companyId: this.updatedUser.companyId });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
