<template>
  <b-row>
    <b-col>
      <div class="w-users-list-page">
        <h1>List of Users</h1>
        <b-row>
          <b-col>
            <b-button
              to="/users/add"
              class="w-users-add-button"
              variant="dark">
              add user
            </b-button>

          </b-col>
        </b-row>
        <div class="users-list">
          <w-list
            :users="users"
            @delete-button-clicked="clickedDeleteButton"
          ></w-list>
        </div>
        <b-row>
          <b-col>
            <div class="users-list-pagination">
              <w-pagination
                v-if="usersPageLimit > 1"
                :current="currentPage"
                :pageLimit="usersPageLimit"
                @page-changed="sendRequest"
              ></w-pagination>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import WPagination from '../../components/WPagination';
    import WList from './components/WList';

    export default {
        name: 'WUsersListPage',
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
                await this.sendDeletedUserData(item.id);
                this.deletedUserData(item);
                if (this.users.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
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
