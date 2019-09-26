<template>
    <div>
      <b-form @submit.prevent="onSubmit">
         <b-form-input
           v-model="form.name"
           placeholder="Enter name"
           required
         ></b-form-input>

         <b-form-input
           v-model="form.email"
           placeholder="Enter email"
           type="email"
           required
         ></b-form-input>
      </b-form>
    </div>
</template>

<script>
    import { BForm, BFormGroup, BFormInput } from 'bootstrap-vue';

    export default {
        name: 'WWarehouseAdminCreateForm',
        components: {
            BForm,
            BFormGroup,
            BFormInput
        },
        props: {
            name: {
                type: String
            },
            email: {
                type: String
            }
        },
        data() {
            return {
                form: {
                    name: this.name,
                    email: this.email
                }
            };
        },
        methods: {
            onSubmit() {
                this.$emit('submit-warehouse-admin', this.form);
            }
        }
    }
</script>

<style scoped>

</style>
