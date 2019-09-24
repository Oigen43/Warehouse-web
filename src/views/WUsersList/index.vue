<template>
  <b-row>
    <b-col lg="12" sm="12">
    <div class="w-users-list-page">
      <h1>List of Users</h1>
      <b-button
        to="/users/add"
        class="w-users-add-button"
        variant="success">
        add user
      </b-button>
      <div class="users-list-pagination">
        <w-pagination
          v-if="usersPageLimit > 1"
          :current="currentPage"
          :pageLimit="usersPageLimit"
          @page-changed="sendRequest"
        ></w-pagination>
      </div>
      <div class="users-list">
        <w-list
          :usersList="users"
          @delete-button-clicked="clickedDeleteButton"
        ></w-list>
      </div>
    </div>
    </b-col>
  </b-row>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import { validation } from '../../components/mixins/validation';
    import routesPermissions from '../../constants/routesPermissions';
    import WPagination from '../../components/WPagination';
    import WList from './components/WList';

    export default {
        name: 'WUsersListPage',
        mixins: [validation],
        components: {
            BRow,
            BCol,
            WPagination,
            WList,
            BButton
        },
        data() {
            return {
              currentPage: 1
            };
        },
        computed: {
            ...mapState([
                'users',
                'usersPageLimit',
                'roles'
            ])
        },
        methods: {
            ...mapActions({
                fetchUsersList: 'fetchUsersList',
                sendDeletedUserData: 'sendDeletedUser',
                deletedUserData: 'deleteUser'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchUsersList(this.currentPage);
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedUserData(item);
                this.deletedUserData(item);
                if (this.users.length === 0) {
                    this.currentPage -= 1;
                }
                this.fetchUsersList(this.currentPage);
            }
        },
        created: function () {
            this.fetchUsersList();
            // this.checkPermissions(this.roles, routesPermissions);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
