// A child component of App.js. The component includes:
// A logo
// The current date that can be generated using the Date() object:
const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

// The current location (see Section 4 for details)
// An “Add Clothes” button that opens ModalWithForm
// The user’s name and avatar (both are hardcoded at this point)
