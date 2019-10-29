<template>
  <div>
      <chart
        v-if="isChartShown"
        :options="chartOptions"
      ></chart>
      <b-row>
       <b-col class="w-chart-form" lg="4" offset-lg="4">
          <w-chart-options-form
            @form-submitted="sendData"
            :startDate="startDate"
            :finalDate="finalDate"
          >
          </w-chart-options-form>
        </b-col>
      </b-row>
  </div>
</template>

<script>
    import { Chart } from 'highcharts-vue';
    import { BRow, BCol } from 'bootstrap-vue';
    import { mapActions, mapState } from 'vuex';

    import WChartOptionsForm from '../../components/WChartOptionsForm/index';

    export default {
        name: 'WChart',
        components: {
            BRow,
            BCol,
            Chart,
            WChartOptionsForm
        },
        computed: {
            ...mapState([
                'companiesArrayDate',
                'companiesArrayPrices',
                'chartDateInterval'
            ]),
            isChartShown() {
                return this.companiesArrayDate.length > 0;
            },
            startDate() {
                return this.chartDateInterval.startDate;
            },
            finalDate() {
                return this.chartDateInterval.finalDate;
            },
            chartOptions() {
                return {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: this.companiesArrayDate
                    },
                    yAxis: {
                        title: {
                            text: 'Companies prices'
                        }
                    },
                    series: [{
                        data: this.companiesArrayPrices
                    }]
                };
            }
        },
        methods: {
            ...mapActions({
                getPrices: 'getPrices',
                setChartDateInterval: 'setChartDateInterval'
            }),
            async sendData(date) {
                this.setChartDateInterval(date);
                await this.getPrices(date);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
