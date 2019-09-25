<template>
  <b-row>
    <b-col lg="3" sm="12" offset-lg="4">
      <h1 class="w-user-add-form-h1">Add User</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="ADD USER"
        :firstName="firstName"
        :surname="surname"
        :patronymic="patronymic"
        :email="email"
        :address="address"
        :birthDate="birthDate"
        :login="login"
        :password="password"
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
    import { mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import WForm from '../../components/WUserForm';
    import router from '../../router';

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
                surname: '',
                patronymic: '',
                email: '',
                address: '',
                birthDate: '',
                login: '',
                password: ''
            };
        },
        methods: {
            ...mapActions({
                sendNewUserData: 'createUser'
            }),
            redirect() {
                router.push('/users');
            },
            async sendData(newUser) {
                const res = await this.sendNewUserData(newUser);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
