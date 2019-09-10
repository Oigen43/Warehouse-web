<template>
    <div class="w-users-list-page">
      <w-navigation></w-navigation>
      <h1>List of Users</h1>
      <b-button to="/users/add" class="w-users-add-button">add user</b-button>
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
</template>

<script>
    import WNavigation from '../../components/WNavigation';
    import WPagination from '../../components/WPagination';
    import WList from './components/WList';
    import { mapActions, mapState } from 'vuex';
    import { BButton } from 'bootstrap-vue';
    export default {
        name: 'WUsersListPage',
        components: {
            WPagination,
            WNavigation,
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
                'usersPageLimit'
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
                this.fetchUsersList(this.currentPage);
            }
        },
        created: function () {
            this.fetchUsersList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
