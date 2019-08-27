<template>
  <div class="list">
    <h1>List of Warehouses</h1>
    <WarehousesList/>
  </div>
</template>

<script>

import WarehousesList from '@/components/WarehousesList.vue';

export default {
  name: 'warehouses-list',
  components: {
    WarehousesList
  }
};
</script>
