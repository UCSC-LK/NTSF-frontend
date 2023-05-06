const commonData = {
  offence: {
    description: "Description",
    amount: "Amount",
    demerit_points: "Demerit Points",
  },
  fineNo: "Fine No",
  imposedDateTime: "Imposed Date Time",
  dueDateTime: "Due Date Time",
  paymentStatus: "Payment Status",
};

const data = {
  driver: {
    ...commonData,
    licenseNo: "License No",
  },
  vehicle: {
    ...commonData,
    vehicleNo: "Vehicle No",
  },
  pedestrian: {
    ...commonData,
    nic: "NIC",
  },
};

export default data;

// Additional knowledge ;)
// ... is the spread operator | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

// /**
//  * All data we receive from backend
//  */
// const commonData = {
//   offence: {
//     offence_no: "Offence No",
//     offence_type: "Offence Type",
//     description: "Description",
//     amount: "Amount",
//     demerit_points: "Demerit Points",
//   },
//   fineNo: "Fine No",
//   offenceNo: "Offence No",
//   nic: "NIC",
//   licenseNo: "License No",
//   vehicleNo: "Vehicle No",
//   spotDescription: "Spot Description",
//   imposedDateTime: "Imposed Date Time",
//   dueDateTime: "Due Date Time",
//   policeId: "Police Id",
//   policeStation: "Police Station",
//   paymentStatus: "Payment Status",
// };

// const data = [
//   {
//     type: "driver",
//     ...commonData,
//   },
//   {
//     type: "vehicle",
//     ...commonData,
//   },
//   {
//     type: "pedestrian",
//     ...commonData,
//   },
// ];
