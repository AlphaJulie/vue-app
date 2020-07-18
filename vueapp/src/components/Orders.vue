<template>
  <div class="container">
    <h3 class="heading">Customer Order Management</h3>
    <div>
    </div>
    <div class="table-wrapper">
      <input type="text" class="search" v-model="search" placeholder="Search Order Name" />
      <table>
        <thead>
          <tr>
            <th class="col" scope="col">ID</th>
            <th class="col" scope="col">Order Name</th>
            <th class="col" scope="col">Customer Company</th>
            <th class="col" scope="col">CustomerName</th>
            <th class="col" scope="col">Order Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in rows" v-bind:key="user.id">
            <td class="row" >{{user.id}}</td>
            <td class="row" >{{user.order_name}}</td>
            <td class="row" >{{user.company_name}}</td>
            <td class="row" >{{user.customer_name}}</td>
            <td class="row" >{{user.created_at}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <jw-pagination :items="customerOrders" :pageSize="5" @changePage="onChangePage"></jw-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let customerOrders = [];
export default {
  data() {
    return {
      search: null,
      column: "order_name",
      customerOrders,
      pageOfItems: []
    };
  },
  beforeMount() {
    axios.get("http://localhost:3000/customer_orders").then(res => {
      this.customerOrders = res.data;
    });
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    }
  },
  computed: {
    cols() {
      return this.pageOfItems.length >= 1
        ? Object.keys(this.pageOfItems[0])
        : [];
    },
    rows() {
      if (!this.pageOfItems.length) {
        return [];
      }

      return this.pageOfItems.filter(item => {
        let props =
          this.search && this.column
            ? [item[this.column]]
            : Object.values(item);

        return props.some(
          prop =>
            !this.search ||
            (typeof prop === "string"
              ? prop.includes(this.search)
              : prop.toString(10).includes(this.search))
        );
      });
    }
  }
};
</script>
<style scoped>
.container {
  padding-top: 30px;
}
.table-wrapper {
  margin: auto;
  box-sizing: content-box;
  width: 100%;
  max-width: 650px;
  padding-top: 10px;
}
th.col {
  padding: 10px;
}
input.search {
    float: left;
    padding: 6px;
    border: 1px bold grey;
    margin-top: 8px;
    margin-right: 16px;
    font-size: 17px;
}
</style>