<template>
    <div class="w-users-cards-container">
      <div class="w-users-card-wrap" v-for="user in users" v-bind:key="user.id">
        <b-card no-body class="overflow-hidden w-users-card">
          <div class="w-users-card-role-label">Admin</div>
          <b-card-img src="https://www.zayedhotel.com/addons/default/themes/yoona/img/user.jpg"
                      class="rounded-0 w-users-card-img"
                      alt="User image"></b-card-img>
          <b-card-body class="w-users-card-body">
            <b-card-title class="mb-0">{{user.firstName}} {{user.patronymic}} {{user.surname}}</b-card-title>
            <hr>
            <b-card-text><span class="w-users-card-text">Date of Birth:</span> {{user.birthDate}}</b-card-text>
            <b-card-text><span class="w-users-card-text">Email:</span> {{user.email}}</b-card-text>
            <b-card-text><span class="w-users-card-text">Address:</span> {{user.address}}</b-card-text>
          </b-card-body>
          <b-card-footer class="w-users-card-footer">
            <b-button
              class="w-users-card-button"
              variant="warning"
              size="sm"
              @click="clickedUpdateButton(user)">
              Update
            </b-button>
            <b-button
              class="w-users-card-button"
              variant="outline-dark"
              size="sm"
              @click="clickedDeleteButton(user)">
              ✕
            </b-button>
          </b-card-footer>
        </b-card>
      </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {
        BRow,
        BCol,
        BCardGroup,
        BCard,
        BCardImg,
        BCardTitle,
        BCardBody,
        BCardText,
        BCardFooter,
        BButton
    } from 'bootstrap-vue';

    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';

    export default {
        name: 'WList',
        components: {
            BRow,
            BCol,
            BCardGroup,
            BCard,
            BCardImg,
            BCardTitle,
            BCardText,
            BCardBody,
            BCardFooter,
            BButton
        },
        props: ['users'],
        data() {
            return {
                fields: [
                    'firstName', 'surname', 'patronymic', 'birthDate', 'email', 'address',
                    {key: 'update', label: ''},
                    {key: 'delete', label: ''}
                ]
            };
        },
        methods: {
            ...mapActions({
                getUpdatedUserData: 'getUpdatedUser',
                sendDeletedUserData: 'deleteUser',
            }),
            clickedUpdateButton(item) {
                this.getUpdatedUserData(item);
                router.push('/users/update');
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.USER_TEXT, {
                    title: `${modal.USER_TITLE} ${item.firstName} ${item.surname}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteUser(item));
            },
            deleteUser(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
