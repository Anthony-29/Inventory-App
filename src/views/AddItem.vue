<template>
  <Header title="Add Item" />
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

          <label for="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="Pineapple"
            v-model="itemName"
          />
          <label for="itemQuantity">Item Quantity:</label>
          <input
            type="number"
            id="itemQuantity"
            name="itemQuantity"
            placeholder="10"
            v-model="itemQuantity"
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
import Header from "../components/Header";
import PopUpMsg from "../components/PopUpMsg";

const items = require("../../fetchItems");

export default {
  name: "AddItem",
  components: {
    Header,
    PopUpMsg,
  },
  data() {
    return {
      id: null,
      plu: null,
      itemName: null,
      itemQuantity: null,
      dupe: null,
      message: "",
      popUpStyle: null,
      showPopUp: false,
    };
  },
  methods: {
    async onSubmit() {
      // Make id = to plu
      this.id = this.plu;

      // Call the isEmpty function to check if the fields are empty
      if (this.isEmpty()) {
        // If its true retrun method here
        this.clearFields();
        return;
      }

      if (this.id == 0) {
        this.displayPopUp();
        this.message = "PLU Can Not Be 0";
        this.popUpStyle = false;
        this.clearFields();
        return;
      }

      // Call the addItem function from the external js file
      this.dupe = await items.addItem(
        this.id,
        this.plu,
        this.itemName,
        this.itemQuantity
      );

      this.clearFields();

      //  Check if the method call returns true (there is no duplicate) or false (if there is a duplicate)
      if (!this.dupe) {
        console.log("dupeeeeeee");
        // Set the message for the component
        this.message = "Item Already Exists";
        this.popUpStyle = false;
        this.displayPopUp();
        this.clearFields();
        return;
      } else if (this.dupe) {
        console.log("all good");
        this.message = "Item Added Sucessfully";
        this.popUpStyle = true;
        this.displayPopUp();
      }
    },
    isEmpty() {
      if (
        this.id == null ||
        this.itemName == null ||
        this.itemQuantity == null
      ) {
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

<style scoped></style>
