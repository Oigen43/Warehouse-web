<template>
    <b-row>
      <b-col class="w-chart-form">
        <h3 class="w-chart-form-h3">Time period</h3>
        <b-form @submit.prevent="onSubmit">
          <label
            class="w-chart-form-input-label"
            for="start-date-input">
            Start date:
          </label>
          <b-form-input
            id="start-date-input"
            size="lg"
            :max="maxDate"
            v-model="form.startDate"
            required
            type="date"
            class="w-chart-form-input"
          ></b-form-input>

          <label
            class="w-chart-form-input-label"
            for="end-date-input">
            Final date:
          </label>
          <b-form-input
            id="end-date-input"
            size="lg"
            :max="maxDate"
            v-model="form.finalDate"
            required
            type="date"
            class="w-chart-form-input"
          ></b-form-input>

          <b-button
            type="submit"
            variant="outline-dark"
            size="lg"
            class="w-chart-form-button">
            Draw chart
          </b-button>
        </b-form>
      </b-col>
    </b-row>
</template>

<script>
    import { BForm, BFormInput, BButton, BRow, BCol } from 'bootstrap-vue';

    export default {
        name: 'WChartOptions',
        components: {
            BRow,
            BCol,
            BForm,
            BFormInput,
            BButton
        },
        props: {
            startDate: {
                type: String
            },
            finalDate: {
                type: String
            }
        },
        data() {
            return {
                form: {
                    startDate: this.startDate,
                    finalDate: this.finalDate
                }
            };
        },
        computed: {
            maxDate() {
                const date = new Date();
                const year = date.getFullYear();
                const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                const day = (date.getDate() + 1) < 10 ? '0' + (date.getDate()) : (date.getDate());

                return `${year}-${month}-${day}`;
            }
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', this.form);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
