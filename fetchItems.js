async function fetchDB(id) {
  // Fetch the db
  const res = await fetch(process.env.VUE_APP_LOCALHOST);
  const data = await res.json();

  // Cycle through the items
  for (let i = 0; i < data.length; i++) {
    // Check if the plu given is already an item
    if (data[i].id === id) {
      // return true if there is a match
      return true;
    }
  }
  // Return false if there is no match
  return false;
}

// Object for produce items
const items = {
  /*

  ====GetItems====

  */
  getItems: async function () {
    const res = await fetch(`${process.env.VUE_APP_LOCALHOST}`);
    const data = await res.json();
    return data;
  },
  /*
  
    ====AddItem====
  
    */
  addItem: async function (id, plu, name, quantity) {
    // Declaring all the variables

    let submittedToDB = false;

    // Call the fetchDB function to check if the id already exists
    const duplicate = await fetchDB(id);
    // If the id exists retyrb false
    if (duplicate) {
      submittedToDB = false;
      return;
    }

    //Add the item into the db
    await fetch(process.env.VUE_APP_LOCALHOST, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        plu: plu,
        itemName: name,
        quantity: quantity,
      }),
    });

    submittedToDB = true;
    return submittedToDB;
  },

  /*
  
    ====removeItem====
  
    */

  removeItem: async function (id) {
    let submittedToDB = false;
    // Call the fetchDB function to check if the id already exists
    const duplicate = await fetchDB(id);

    // Check if the id is not a duplicate
    if (!duplicate) {
      // Return false (no match)
      submittedToDB = false;
      return submittedToDB;
    }

    // Fetch and delete based on the id
    try {
      await fetch(`${process.env.VUE_APP_LOCALHOST}/${id}`, {
        method: "delete",
      });
    } catch (err) {
      console.log(err);
    }

    // Return true when process has been completed
    submittedToDB = true;
    return submittedToDB;
  },
  /*
 
  ====updateitems====
  
  */
  updateItem: async function (id, quantity) {
    let submittedToDB = false;
    // Call the fetchDB function to check if the id already exists
    const duplicate = await fetchDB(id);

    // Check if the id is not a duplicate
    if (!duplicate) {
      // Return false (no match)
      submittedToDB = false;
      return submittedToDB;
    }

    await fetch(`${process.env.VUE_APP_LOCALHOST}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });

    return true;
  },
  searchItem: async function (id) {
    let submittedToDB = false;
    // Call the fetchDB function to check if the id already exists
    const duplicate = await fetchDB(id);

    // Check if the id is not a duplicate
    if (!duplicate) {
      // Return false (no match)
      submittedToDB = false;
      return submittedToDB;
    }

    const res = await fetch(`${process.env.VUE_APP_LOCALHOST}/${id}`);
    const data = await res.json();

    submittedToDB = true;

    const itemInfo = {
      item: data,
      submittedToDB: submittedToDB,
    };

    return itemInfo;
  },
};

module.exports = items;
