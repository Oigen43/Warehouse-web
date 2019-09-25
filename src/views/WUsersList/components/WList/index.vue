<template>
    <b-row>
      <b-col lg="4" md="6" sm="12" v-for="user in users" v-bind:key="user.id">
        <b-card no-body class="overflow-hidden w-users-card">
          <b-row no-gutters>
            <b-col lg="6" md="12">
              <div class="w-role-label">Admin</div>
              <b-card-img src="https://www.zayedhotel.com/addons/default/themes/yoona/img/user.jpg" class="rounded-0"
                           alt="User image"></b-card-img>
            </b-col>
            <b-col lg="6" md="12">
              <b-card-body class="w-users-card-body">
                <b-card-title class="mb-0">{{user.firstName}} {{user.patronymic}} {{user.surname}}</b-card-title>
                <hr>
                <b-card-text><span class="w-users-card-text">Date of Birth:</span> {{user.birthDate}}</b-card-text>
                <b-card-text><span class="w-users-card-text">Email:</span> {{user.email}}</b-card-text>
                <b-card-text><span class="w-users-card-text">Address:</span> {{user.address}}</b-card-text>
              </b-card-body>
              <b-card-footer>
                <b-button
                  class="w-list-button"
                  variant="warning"
                  size="sm"
                  @click="clickedUpdateButton(user)">
                  Update
                </b-button>
                <b-button
                  class="w-list-button"
                  variant="outline-dark"
                  size="sm"
                  @click="clickedDeleteButton(user)">
                  ✕
                </b-button>
              </b-card-footer>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
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
        computed: {
            ...mapState([
                'modalValue'
            ])
        },
        watch: {
            modalValue(newVal, oldVal) {
                if (newVal) {
                    this.deleteUser(this.clickedUser);
                    this.setModalValue(false);
                }
            }
        },
        data() {
            return {
                fields: [
                    'firstName', 'surname', 'patronymic', 'birthDate', 'email', 'address',
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ],
                clickedUser: {}
            };
        },
        methods: {
            ...mapActions({
                getUpdatedUserData: 'getUpdatedUser',
                sendDeletedUserData: 'deleteUser',
                setModalValue: 'setModalValue'
            }),
            clickedUpdateButton(item) {
                this.getUpdatedUserData(item);
                router.push('/users/update');
            },
            clickedDeleteButton(item) {
                this.clickedUser = item;
                this.$bvModal.msgBoxConfirm(modal.USER_TEXT, {
                    title: `${modal.USER_TITLE} ${item.firstName} ${item.surname}`,
                    size: modal.SIZE,
                    buttonSize: modal.BUTTON_SIZE,
                    okVariant: modal.OK_VARIANT,
                    cancelVariant: modal.CANCEL_VARIANT,
                    okTitle: modal.OK_TITLE,
                    cancelTitle: modal.CANCEL_TITLE,
                    hideHeaderClose: modal.HIDE_HEADER_CLOSE,
                    centered: modal.CENTERED
                })
                    .then(value => {
                        this.setModalValue(value);
                    });
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
