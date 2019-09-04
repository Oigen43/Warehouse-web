<template>
  <div class='w-warehouses-list-pagination'>
      <b-button
        variant="outline-secondary"
        :disabled="onFirstPage"
        @click="changePage(1)">
        First
      </b-button>

      <b-button
        @click="changePage(prevPage)"
        :disabled = "current < 2"
        variant="outline-secondary">Previous</b-button>

      <b-button
        v-for="page in pages"
        :key="page.name"
        @click="changePage(page.name)"
        :class="{active: isPageActive(page.name)}"
        variant="outline-secondary">
        {{ page.name }}</b-button>

      <b-button
        @click="changePage(nextPage)"
        :disabled = "current === pageLimit"
        variant="outline-secondary">
        Next</b-button>

      <b-button
        variant="outline-secondary"
        :disabled="onLastPage"
        @click="changePage(pageLimit)">
        Last
      </b-button>
  </div>
</template>

<script>
  import { BButton } from 'bootstrap-vue';

  export default {
    name: 'WPagination',
    components: {
      BButton
    },
    data () {
        return {
            maxVisibleButtons: 3
        };
    },
    props: {
      current: {
        type: Number,
        default: 1
      },
      pageLimit: {
        type: Number,
        default: 1
      },
    },
    computed: {
      onFirstPage() {
          return this.current === 1;
      },
      onLastPage() {
          return this.current === this.pageLimit;
      },
      nextPage: function() {
        return this.current + 1;
      },
      prevPage: function() {
        return this.current - 1;
      },
      startPage() {
          if (this.current === 1) {
              return 1;
          }

          if (this.current === this.pageLimit) {
              return this.pageLimit - this.maxVisibleButtons + 1;
          }

          return this.current - 1;
      },
      endPage() {
          return Math.min(this.startPage + this.maxVisibleButtons - 1, this.pageLimit);
      },
      pages() {
          const range = [];
          for (let i = this.startPage; i <= this.endPage; i++) {
              range.push({
                  name: i,
                  isDisabled: i === this.current
              });
          }

          return range;
      }
    },
    methods: {
      changePage: function(page) {
        this.$emit('page-changed', page);
      },
      isPageActive(page) {
          return this.current === page;
      }
    }
  };
</script>
