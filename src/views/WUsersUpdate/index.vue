<template>
  <div class="w-users-add-form">
    <w-navigation></w-navigation>
    <h1>Update User</h1>
    <w-form
      @form-submitted="sendData"
      submitButtonName="UPDATE USER"
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
      :password="password"
    ></w-form>
    <b-button
      variant="link"
      to="/users"
      class="w-users-go-back-link"
    >Go Back
    </b-button>

  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import WNavigation from '../../components/WNavigation/index';
    import WForm from '../../components/WUserForm';
    import router from '../../router';
    import { BButton } from 'bootstrap-vue';
    export default {
        name: 'WUsersUpdateForm',
        components: {
            WNavigation,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedUser'
            ]),
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
            password() {
                return this.updatedUser.password;
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
                await this.sendUpdatedUserData(user);
                this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
