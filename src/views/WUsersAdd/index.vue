<template>
  <b-row>
    <b-col class="w-users-add-form" lg="4" offset-lg="4">
      <h1 class="w-user-add-form-h1">Add User</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD USER"
        :firstName="firstName"
        :email="email"
        :company-id="updatedUser.companyId"
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
    import jwtDecode from 'jwt-decode';

    import store from '../../store';
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
                'updatedUser'
            ]),
            store() {
                return store;
            }
        },
        methods: {
            ...mapActions({
                sendNewUserData: 'createUser',
                getCurrentUser: 'getUpdatedUser'
            }),
            redirect() {
                router.push('/users');
            },
            async sendData(newUser) {
                newUser.user.data.companyId = this.updatedUser.companyId;
                const res = await this.sendNewUserData(newUser);
                !res.error && this.redirect();
            }
        },
        created() {
            this.getCurrentUser(jwtDecode(this.store.state.token).id);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
