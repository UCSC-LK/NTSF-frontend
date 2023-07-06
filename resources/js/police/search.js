var selectedOption = getSelectedOption();
var x;

function getSelectedOption(){
    console.log("getSelectedOption() called");
    var dropdown = document.getElementById("myDropdown");
    selectedOption  = dropdown.value;
    console.log("selectedOption: " + selectedOption);

    if(selectedOption == "searchByName"){
        x = 0;
        document.getElementById("myInput").placeholder = "Search by Name";
        document.getElementById("myInput").setAttribute("title", "Type in a Name");
    }
    else if(selectedOption == "searchByPoliceID"){
        x = 1;
        document.getElementById("myInput").placeholder = "Search by Police ID";
        document.getElementById("myInput").setAttribute("title", "Type in a Police ID");
    }
    else if(selectedOption == "searchByNIC"){
        x = 2;
        document.getElementById("myInput").placeholder = "Search by NIC";
        document.getElementById("myInput").setAttribute("title", "Type in a NIC");
    }
    else if(selectedOption == "searchByEmail"){
        x = 3;
        document.getElementById("myInput").placeholder = "Search by Email";
        document.getElementById("myInput").setAttribute("title", "Type in an Email");
    }
    else if(selectedOption == "searchByRank"){
        x = 4;
        document.getElementById("myInput").placeholder = "Search by Rank";
        document.getElementById("myInput").setAttribute("title", "Type in a Rank");
    }
    else if(selectedOption == "searchByGrade"){
        x = 5;
        document.getElementById("myInput").placeholder = "Search by Grade";
        document.getElementById("myInput").setAttribute("title", "Type in a Grade");
    }
    else if(selectedOption == "searchByPoliceStation"){
        x = 6;
        document.getElementById("myInput").placeholder = "Search by Police Station";
        document.getElementById("myInput").setAttribute("title", "Type in a Police Station");
    }
    else {
        console.log("Error");
    }
}


function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[x];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }