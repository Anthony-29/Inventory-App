<template>
  <Header title="Remove Item" />
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
      </div>
    </div>
  </div>
</template>

<script>
const items = require("../../fetchItems");

import Header from "../components/Header";
import PopUpMsg from "../components/PopUpMsg";

export default {
  name: "RemoveItem",
  components: {
    Header,
    PopUpMsg,
  },
  data() {
    return {
      plu: null,
      id: null,
      dupe: null,
      message: "",
      popUpStyle: null,
      showPopUp: false,
    };
  },
  methods: {
    async onSubmit() {
      this.id = this.plu;

      // Call the isEmpty function to check if the fields are empty
      if (this.isEmpty()) {
        // If its true retrun method here
        return;
      }
      if (this.id == 0) {
        this.displayPopUp();
        this.message = "PLU Can Not Be 0";
        this.popUpStyle = false;
        this.clearFields();
        return;
      }

      this.dupe = await items.removeItem(this.id);
      this.clearFields();

      //  Check if the method call returns true (there is no duplicate) or false (if there is a duplicate)
console.log("DIPE", this.dupe);

      if (this.dupe) {
        console.log("deletedddd");
        // Set the message for the component
        this.message = "Item Deleted";
        this.popUpStyle = true;
        this.displayPopUp();
        this.clearFields();
        return;
      } else if (!this.dupe) {
        console.log("no exist");
        this.message = "Item Does Not Exist";
        this.popUpStyle = false;
        this.displayPopUp();
        return
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
      this.id = null;
      this.plu = null;
      this.itemName = null;
      this.itemQuantity = null;
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
