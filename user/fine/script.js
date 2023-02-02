const fineModel = {
  ticketNo: "Ticket No",
  fineNo: "Fine No",
  date: "Date",
  dueDate: "Due Date",
  fineAmount: "Fine Amount",
  fineType: "Fine Type",
  paymentStatus: "Payment Status",
};

// On load event listener
window.addEventListener("load", () => {
  renderColumnHeaders();
  viewFines();
});

/**
 * Service call
 */
const getFines = () => {
  // TODO - Implement the service call

  // Mock data
  const fines = [
    {
      ticketNo: 500,
      fineNo: 1234,
      date: "2022-04-05",
      dueDate: "2022-05-10",
      fineAmount: "Rs. 500",
      fineType: "VEH",
      paymentStatus: true,
    },
    {
      ticketNo: 120,
      fineNo: 1543,
      date: "2023-01-05",
      dueDate: "2023-02-05",
      fineAmount: "Rs. 1000",
      fineType: "PED",
      paymentStatus: false,
    },
  ];
  return fines;
};

/**
 * Render the headers
 */
const renderColumnHeaders = () => {
  const userFinesDiv = document.getElementById("user-fines");

  Object.entries(fineModel).map(([key, value]) => {
    userFinesDiv.innerHTML += `<div class="blok">
			<i class="fa fa-money"></i>
			<div id="${key}"
				 class="no">
				<p>${value}</p>
			</div>
		</div>`;
  });
};

/**
 * Populate the fines data
 */
const viewFines = () => {
  const finesList = getFines();

  console.log(finesList);

  finesList.map((fine) => {
    Object.entries(fineModel).map(([key]) => {
      const data = document.createElement("tr");
      if (key === "paymentStatus") {
        const payButton = document.createElement("button");
        if (fine.paymentStatus === true) {
          payButton.innerHTML = "Paid";
          payButton.className += "paid";
        } else {
          payButton.innerHTML = "Pay Now";
          payButton.className += "unpaid";
        }
        data.appendChild(payButton);
      } else {
        data.innerText = fine[key];
      }
      document.getElementById(key).append(data);
    });
  });
};
