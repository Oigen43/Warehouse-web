<template>
  <b-row>
    <b-col lg="3" sm="6" v-for="user in users" v-bind:key="user.id">
      <b-card no-body class="overflow-hidden w-users-card">
        <div class="w-users-card-role-container">
          <div v-for="role in user.roles" class="w-users-card-role-label" v-bind:key="role.id">{{role.title}}</div>
        </div>
        <b-card-img src="https://www.zayedhotel.com/addons/default/themes/yoona/img/user.jpg"
                    class="rounded-0 w-users-card-img"
                    alt="User image"></b-card-img>
        <b-card-body>
          <b-card-title class="mb-0 w-users-card-text">{{user.firstName}} {{user.surname}}</b-card-title>
          <hr>
          <b-card-text class="w-users-card-text"><span class="w-users-card-text-bold">Date of Birth:</span>
            {{user.birthDate}}
          </b-card-text>
          <b-card-text class="w-users-card-text"><span class="w-users-card-text-bold">Email:</span> {{user.email}}
          </b-card-text>
          <b-card-text class="w-users-card-text"><span class="w-users-card-text-bold">Address:</span> {{user.address}}
          </b-card-text>
        </b-card-body>
        <b-card-footer class="w-users-card-footer">
          <b-button
            class="w-users-update-card-button"
            variant="dark"
            size="sm"
            @click="clickedUpdateButton(user)">
            Update
          </b-button>
          <b-button
            variant="light"
            size="sm"
            @click="clickedDeleteButton(user)">
            ✕
          </b-button>
        </b-card-footer>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
    import { mapActions } from 'vuex';
    import {
        BRow,
        BCol,
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
            BCard,
            BCardImg,
            BCardTitle,
            BCardText,
            BCardBody,
            BCardFooter,
            BButton
        },
        props: ['users'],
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
