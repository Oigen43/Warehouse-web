<template>
  <div
    class="d-flex justify-content-center mb-3"
    :class="loading ? 'w-spinner-container-show' : 'w-spinner-container'">
    <b-spinner
      v-if="loading"
      style="width: 5rem; height: 5rem;"
      class="w-spinner"
    ></b-spinner>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { BSpinner } from 'bootstrap-vue';

    export default {
        name: 'WSpinner',
        components: {
            BSpinner
        },
        computed: {
            ...mapState([
                'loading'
            ])
        }
    };
</script>

<style lang="scss">
  @import './styles.scss';
</style>
