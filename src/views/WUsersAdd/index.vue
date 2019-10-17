<template>
  <b-row>
    <b-col class="w-users-add-form" lg="4" offset-lg="4">
      <h1 class="w-user-add-form-h1">Add User</h1>
      <w-form
        @form-submitted="sendData"
        @get-warehouses="getWarehousesData"
        submitButtonName="ADD USER"
        :firstName="firstName"
        :email="email"
        :company-id="userInfo.companyId"
        :warehouses-for-select="warehousesForSelect"
        add-user
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
    import router from '../../router';
    import { mapActions, mapState } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import WForm from '../../components/WUserForm';

    export default {
        name: 'WUsersAddForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        data() {
            return {
                firstName: '',
                email: '',
            };
        },
        computed: {
            ...mapState([
                'roles',
                'userInfo',
                'warehousesForSelect'
            ])
        },
        methods: {
            ...mapActions({
                sendNewUserData: 'createUser',
                getCurrentUser: 'fetchUserInfo',
                fetchWarehousesSelect: 'fetchWarehousesSelect'
            }),
            redirect() {
                router.push('/users');
            },
            async getWarehousesData() {
                await this.fetchWarehousesSelect({ companyId: this.userInfo.companyId });
            },
            async sendData(newUser) {
                newUser.user.data.companyId = this.userInfo.companyId;
                const res = await this.sendNewUserData(newUser);
                !res.error && this.redirect();
            }
        },
        created() {
            this.getCurrentUser();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
