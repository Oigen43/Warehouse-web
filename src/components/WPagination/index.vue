<template>
  <div>
    <b-button
      :disabled="onFirstPage"
      @click="changePage(1)"
      variant="outline-dark">
      ⭅
    </b-button>

    <b-button
      :disabled="current < 2"
      @click="changePage(prevPage)"
      class="w-pagination-button-first"
      variant="outline-dark">
      ⇐
    </b-button>

    <b-button-group>
      <b-button
        v-for="page in pages"
        :key="page.name"
        @click="changePage(page.name)"
        :class="{active: isPageActive(page.name)}"
        variant="outline-dark">
        {{ page.name }}
      </b-button>
    </b-button-group>

    <b-button
      @click="changePage(nextPage)"
      :disabled="current === pageLimit"
      class="w-pagination-button-last"
      variant="outline-dark">
      ⇒
    </b-button>

    <b-button
      :disabled="onLastPage"
      @click="changePage(pageLimit)"
      variant="outline-dark">
      ⭆
    </b-button>
    </div>
</template>

<script>
    import { BButton, BButtonGroup } from 'bootstrap-vue';

    export default {
        name: 'WPagination',
        components: {
            BButton,
            BButtonGroup
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
            maxVisibleButtons() {
                if (this.pageLimit < 3) {
                    return this.pageLimit;
                }

                return 3;
            },
            onFirstPage() {
                return this.current === 1;
            },
            onLastPage() {
                return this.current === this.pageLimit;
            },
            nextPage: function () {
                return this.current + 1;
            },
            prevPage: function () {
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
            changePage: function (page) {
                this.$emit('page-changed', page);
            },
            isPageActive(page) {
                return this.current === page;
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
