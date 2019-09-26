<template>
  <b-row>
    <b-col class="w-users-update-form" lg="3" sm="12" offset-lg="4">
      <h1 class="w-user-update-form-h1">Update User</h1>
      <w-form
        @form-submitted="sendData"
        submitButtonName="UPDATE USER"
        :id="userId"
        :firstName="firstName"
        :surname="surname"
        :patronymic="patronymic"
        :email="email"
        :city="city"
        :street="street"
        :house="house"
        :flat="flat"
        :birthDate="birthDate"
        :login="login"
        :userRoles="roles"
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
                'updatedUser'
            ]),
            userId() {
                return this.updatedUser.id;
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
            city() {
                return this.updatedUser.address.city;
            },
            street() {
                return this.updatedUser.address.street;
            },
            house() {
                return this.updatedUser.address.house;
            },
            flat() {
                return this.updatedUser.address.flat;
            },
            birthDate() {
                return this.updatedUser.birthDate;
            },
            login() {
                return this.updatedUser.login;
            },
            roles() {
                return this.updatedUser.roles.map(role => role.title);
            }
        },
        methods: {
            ...mapActions({
                sendUpdatedUserData: 'sendUpdatedUser'
            }),
            redirect() {
                router.push('/users');
            },
            async sendData(user) {
                const res = await this.sendUpdatedUserData(user);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
