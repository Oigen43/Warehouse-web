<template>
  <div class='w-warehouses-list-pagination'>
    <div>
      <b-button
        @click="changePage(prevPage)"
        :disabled = "current < 2"
        variant="outline-primary">Previous</b-button>
      <b-button
        @click="changePage(nextPage)"
        :disabled = "current === pageLimit"
        variant="outline-primary">Next</b-button>
    </div>
  </div>
</template>

<script>
  import { BButton } from 'bootstrap-vue';
  import { mapState } from 'vuex';

  export default {
    name: 'WPagination',
    components: {
      BButton
    },
    props: {
      current: {
        type: Number,
        default: 1
      },
    },
    computed: {
      ...mapState([
      'pageLimit'
      ]),
      nextPage: function() {
        return this.current + 1;
      },
      prevPage: function() {
        return this.current - 1;
      }
    },
    methods: {
      changePage: function(page) {
        this.$emit('page-changed', page);
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
