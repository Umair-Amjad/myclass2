import { createSlice } from "@reduxjs/toolkit";

const instituteSlice = createSlice({
  name: "institute",
  initialState: {
    institutes: [
      // Initial dummy data to replace previous static data
      {
        id: 1,
        name: "Institute A",
        type: "K-12",
        status: "Active",
        students: 350,
        classes: 15,
        address: "123 Main St",
        contact: "+1234567890",
        email: "instituteA@example.com",
      },
      {
        id: 2,
        name: "Institute B",
        type: "Higher Education",
        status: "Active",
        students: 500,
        classes: 20,
        address: "456 College Ave",
        contact: "+1234567891",
        email: "instituteB@example.com",
      },
      {
        id: 3,
        name: "Institute C",
        type: "College",
        status: "Pending",
        students: 200,
        classes: 10,
        address: "789 University Rd",
        contact: "+1234567892",
        email: "instituteC@example.com",
      },
      {
        id: 4,
        name: "Institute D",
        type: "Online",
        status: "Active",
        students: 150,
        classes: 8,
        address: "Online",
        contact: "+1234567893",
        email: "instituteD@example.com",
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    addInstitute(state, action) {
      state.institutes.push(action.payload);
    },
  },
});

export const { addInstitute } = instituteSlice.actions;
export default instituteSlice.reducer;
