<template>
  <div class="w-users-add-form">
    <w-navigation></w-navigation>
    <h1>Add a New Company</h1>
    <w-form
      @form-submitted="sendData"
      submitButtonName="ADD USER"
      :firstName="firstName"
      :surname="surname"
      :patronymic="patronymic"
      :email="email"
      :city="address.city"
      :street="address.street"
      :house="address.house"
      :flat="address.flat"
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
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';
    import { ToastPlugin, BButton } from 'bootstrap-vue';

    import WNavigation from '../../components/WNavigation';
    import WForm from '../../components/WUserForm';
    import router from '../../router';

    Vue.use(ToastPlugin);

    export default {
        name: 'WUsersAddForm',
        components: {
            WNavigation,
            WForm,
            BButton
        },
        data() {
            return {
                firstName: '',
                surname: '',
                patronymic: '',
                email: '',
                address: {
                    city: '',
                    street: '',
                    house: '',
                    flat: ''
                },
                birthDate: new Date(),
                login: '',
                password: ''
            };
        },
        computed: {
            ...mapState([
                'toast'
            ])
        },
        methods: {
            ...mapActions({
                sendNewUserData: 'createUser'
            }),
            redirect() {
                router.push('/users');
            },
            async sendData(newUser) {
                await this.sendNewUserData(newUser);
                if (this.toast.done) {
                    this.redirect();
                } else {
                    this.toast.done = true;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
