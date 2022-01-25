<template>
  <div >
    <table class="wrapper" border="3" id="item-table">
      <thead>
          <th colspan="2">Item Information</th>
      </thead>
      <tbody>
        <tr>
          <!-- First row -->
          <td>Item PLU</td>
          <td>{{ itemInfo.plu }}</td>

          <!-- <td>Table Cell</td> -->
        </tr>
        <tr>
          <!-- Second row -->
          <td>Item Name</td>
          <td>{{ itemInfo.itemName }}</td>
        </tr>
        <tr>
          <!-- Third row -->
          <td>Item Quantity</td>
          <td> {{itemInfo.quantity}} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DisplayItem",
  props: ["itemInfo"],
  data() {
    return {};
  },
};
</script>

<style>
.wrapper {
  margin: 20px auto;
  text-align: center;
  font-size: 1.5em;
}


#item-table td, #item-table th {
  border: 1px solid #ddd;
  padding: 20px;
}

#item-table tr:nth-child(even){background-color: #c2c2c2;}

#item-table tr:hover {background-color: #ddd;}

#item-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #161718;
  color: white;
}
</style>