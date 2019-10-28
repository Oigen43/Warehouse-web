<template>
  <div id="content">
    <h1 class="w-ttn-form-h1">Goods Consignment Note #{{ updatedTTN.number }}</h1>
    <b-row v-if="updatedTTN.id && goods.length">
      <b-col class="w-ttn-form-col" lg="3" md="12" offset-lg="1" align-self="start">
        <w-form
          @click-download="clickedDownloadButton"
          :id="updatedTTN.id"
          :number="updatedTTN.number"
          :dischargeDate="updatedTTN.dischargeDate"
          :receiver="updatedTTN.Receiver"
          :sender="updatedTTN.Sender"
          :carrier="updatedTTN.Carrier"
          :transport="updatedTTN.Transport"
          :driver="updatedTTN.Driver"
          :warehouse="updatedTTN.Warehouse"
          :description="updatedTTN.description"
          :dispatcher="updatedTTN.User"
          :registrationDate="updatedTTN.registrationDate"
          :type="updatedTTN.type"
        ></w-form>
        <b-button
          variant="link"
          to="/gcn"
          class="w-ttn-go-back-link"
        >Go Back
        </b-button>
      </b-col>
      <b-col class="w-ttn-form-col" lg="6" md="12" offset-lg="1">
        <w-goods
          :goods="goods"
          :type="type"
        ></w-goods>
      </b-col>
    </b-row>
    <div id="pdf"></div>
  </div>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapState, mapActions } from 'vuex';
    import pdfMake from 'pdfmake/build/pdfmake';
    import pdfFonts from 'pdfmake/build/vfs_fonts';

    import types from '../../constants/TTNtypes';
    import WForm from './components/WForm';
    import WGoods from '../../components/WGoodsList';

    export default {
        name: 'WTTN',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WGoods
        },
        data() {
            return {
                name: ''
            };
        },
        computed: {
            ...mapState([
                'updatedTTN',
                'userInfo',
                'updatedCompany'
            ]),
            registrationDate() {
                return this.updatedTTN.registrationDate;
            },
            TTNId() {
                return +this.$route.params.TTNId;
            },
            goods() {
                return this.updatedTTN.Goods;
            },
            type() {
                return types.OUTCOMING_TYPE;
            },
            driverFullName() {
                return `${this.updatedTTN.Driver.firstName} ${this.updatedTTN.Driver.surname}`;
            },
            dispatcherFullName() {
                return `${this.updatedTTN.User.firstName} ${this.updatedTTN.User.surname}`;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedTTNData: 'getUpdatedTTN',
                fetchUserInfo: 'fetchUserInfo',
                getUpdatedCompanyData: 'getUpdatedCompany'
            }),
            buildTableBody(data, header, columns) {
                let body = [];

                body.push(header);

                data.forEach(row => {
                    let dataRow = [];

                    columns.forEach(column => {
                        dataRow.push(row[column].toString());
                    });

                    body.push(dataRow);
                });

                return body;
            },
            table(data, header, columns) {
                return {
                    style: 'table',
                    table: {
                        headerRows: 1,
                        widths: [100, 50, 80, 50, 70, 115],
                        body: this.buildTableBody(data, header, columns)
                    }
                };
            },
            clickedDownloadButton() {
                const docName = `gcn_${this.updatedTTN.number}.pdf`;

                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                const docDefinition = {
                    content: [
                        {
                            text: `Goods Consignment Note #${this.updatedTTN.number}`,
                            style: 'header',
                            alignment: 'center'
                        },
                        'Company (warehouses owner)',
                        {
                            style: 'table',
                            table: {
                                widths: [200, 200, 90],
                                body: [
                                    ['Name', 'Address', 'Dispatcher'],
                                    [
                                        `${this.updatedCompany.companyName}`,
                                        `${this.updatedCompany.address}`,
                                        `${this.dispatcherFullName}`
                                    ]
                                ]
                            }
                        },
                        'Sender',
                        {
                            style: 'table',
                            table: {
                                widths: [200, 200, 90],
                                body: [
                                    ['Name', 'TIN', 'Country Code'],
                                    [
                                        `${this.updatedTTN.Sender ? this.updatedTTN.Sender.senderName : '---'}`,
                                        `${this.updatedTTN.Sender ? this.updatedTTN.Sender.upn : '---'}`,
                                        `${this.updatedTTN.Sender ? this.updatedTTN.Sender.countryCode : '---'}`
                                    ]
                                ]
                            }
                        },

                        'Receiver',
                        {
                            style: 'table',
                            table: {
                                widths: [200, 200, 90],
                                height: [200, 200, 90],
                                body: [
                                    ['Name', 'TIN', 'Country Code'],
                                    [
                                        `${this.updatedTTN.Receiver ? this.updatedTTN.Receiver.receiverName : '---'}`,
                                        `${this.updatedTTN.Receiver ? this.updatedTTN.Receiver.upn : '---'}`,
                                        `${this.updatedTTN.Receiver ? this.updatedTTN.Receiver.countryCode : '---'}`
                                    ]
                                ]
                            }
                        },

                        'Carrier',
                        {
                            style: 'table',
                            table: {
                                widths: [200, 200, 90],
                                body: [
                                    ['Name', 'TIN', 'Country Code'],
                                    [
                                        `${this.updatedTTN.Carrier.name}`,
                                        `${this.updatedTTN.Carrier.upn}`,
                                        `${this.updatedTTN.Carrier.countryCode}`
                                    ]
                                ]
                            }
                        },

                        'Transport',
                        {
                            style: 'table',
                            table: {
                                widths: [250, 250],
                                body: [
                                    ['Type', 'Number'],
                                    [`${this.updatedTTN.Transport.transportType}`, `${this.updatedTTN.Transport.transportNumber}`]
                                ]
                            }
                        },

                        'Driver',
                        {
                            style: 'table',
                            table: {
                                widths: [164, 164, 164],
                                body: [
                                    ['Name', 'Passport Number', 'Licence Issuing Date'],
                                    [
                                        `${this.updatedTTN.Driver ? this.driverFullName : '---'}`,
                                        `${this.updatedTTN.Driver ? this.updatedTTN.Driver.passportNumber : '---'}`,
                                        `${this.updatedTTN.Driver ? this.updatedTTN.Driver.issuingDate : '---'}`
                                    ]
                                ]
                            }
                        },

                        'Goods',
                        this.table(
                            this.goods,
                            ['Name', 'Volume', 'Count', 'Weight', 'Price', 'Storage Recommendation'],
                            ['name', 'volume', 'count', 'weight', 'price', 'recommendation']
                        )
                    ],
                    styles: {
                        header: {
                            fontSize: 20,
                            bold: true,
                            margin: [0, 0, 0, 20]
                        },
                        table: {
                            margin: [0, 5, 0, 15]
                        }
                    }
                };

                pdfMake.createPdf(docDefinition).download(docName);
            }
        },
        created: async function () {
            await this.getUpdatedTTNData(this.TTNId);
            await this.fetchUserInfo();
            await this.getUpdatedCompanyData(this.userInfo.companyId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
