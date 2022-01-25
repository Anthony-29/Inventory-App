<template>
  <Header title="Search Item" />
  <div class="container">
    <div class="row">
      <div class="col-11 form-wrapper">
        <form v-on:submit.prevent="onSubmit">
          <label for="plu">Item PLU</label>
          <input
            type="number"
            id="plu"
            name="plu"
            placeholder="1234"
            v-model="plu"
          />

          <input type="submit" value="Submit" />
        </form>
        <PopUpMsg
          v-if="showPopUp"
          :message="message"
          :popUpStyle="popUpStyle"
        />
        <DisplayItem v-if="showItem" :itemInfo="item" />
      </div>
    </div>
  </div>
</template>

<script>
const items = require("../../fetchItems");

import Header from "../components/Header";
import PopUpMsg from "../components/PopUpMsg";
import DisplayItem from "../components/DisplayItem";

export default {
  name: "SearchItem",
  components: {
    Header,
    PopUpMsg,
    DisplayItem,
  },
  data() {
    return {
      plu: null,
      id: null,
      itemInfo: null,
      message: "",
      popUpStyle: null,
      showPopUp: false,
      showItem: false,
      item: null,
    };
  },
  methods: {
    async onSubmit() {
      this.id = this.plu;

      // Call the isEmpty function to check if the fields are empty
      if (this.isEmpty()) {
        this.showItem = false
        // If its true retrun method here
        return;
      }
      if (this.id == 0) {
        this.displayPopUp();
        this.message = "PLU Can Not Be 0";
        this.popUpStyle = false;
        this.showItem = false
        this.clearFields();
        return;
      }

      this.itemInfo = await items.searchItem(this.id);
      this.clearFields();

      this.item = this.itemInfo.item;

      if (this.itemInfo.submittedToDB) {
        this.showItem = true
        console.log("FOUND", this.itemInfo.item);
        this.clearFields();
        return;
      } else if (!this.itemInfo) {
        this.showItem = false
        this.message = "Item Does Not Exist"
        this.displayPopUp()
        console.log("NOT FOUND");
        return;
      }
    },
    isEmpty() {
      if (this.plu == null) {
        this.displayPopUp();
        this.message = "All Fields Are Required";
        this.popUpStyle = false;
        this.clearFields();
        return true;
      } else {
        return false;
      }
    },
    clearFields() {
      this.plu = null;
    },
    displayPopUp() {
      this.showPopUp = true;
      setTimeout(() => {
        this.showPopUp = !this.showPopUp;
      }, 3000);
    },
  },
};
</script>

<style></style>
