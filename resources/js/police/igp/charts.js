const xValues1 = ["June", "July", "August", "September", "October", "November", "December", "January", "February", "April", "May"];
const yValues1 = [70000, 84000, 65000, 99000, 57000, 82000, 100000, 35000, 47000, 78000, 83000, 65000, 28000];

new Chart("myChart1", {
  type: "line",
  data: {
    labels: xValues1,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues1
    }]
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{
        ticks: { min: 0, max: 120000 },
        scaleLabel: {
          display: true,
          labelString: 'Fine Amount'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }]
    }
  }
});


//doughnut graph - myChart2
var xValues = ["Driver", "Vehicle", "Pedestrian"];
var yValues = [35000, 10000, 25000];
var barColors = [
  "#7E2B40",
  "#4A4173",
  "#394867",
];

new Chart("myChart2", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Offence Types"
    }
  }
});


//Bar Graph - myChart3
var xValues = ["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"];
var yValues = [22000, 25000, 30000, 19000, 28000, 16000, 34000, 37000, 24000, 35000, 21000, 33000, 29000, 18000, 31000, 27000, 23000, 19000, 32000, 22000, 36000, 25000, 27000, 23000, 30000];
var barColors = ["#0098A7", "#394867", "#0B6F92", "#756691", "#9675A3", "#6A789A", "#A5ABBD", "#9B6C74", "#005756","#394867", "#564629", "#897656", "#773426" , "#4A4173", "#132541", "#0B6F92", "#756691", "#9675A3", "#6A789A", "#A5ABBD", "#394867", "#564629", "#897656", "#0098A7", "#897656"];

new Chart("myChart3", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Fine Amounts By Districts"
    }
  }
});
