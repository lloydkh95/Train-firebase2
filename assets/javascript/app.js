var firebaseConfig = {
    apiKey: "AIzaSyB-ECeY9SIWkioHBrA1_qnPk-1zDRHhxno",
    authDomain: "employee-time-sheet-78a27.firebaseapp.com",
    databaseURL: "https://employee-time-sheet-78a27.firebaseio.com",
    projectId: "employee-time-sheet-78a27",
    storageBucket: "",
    messagingSenderId: "914736031348",
    appId: "1:914736031348:web:2e350f6505c8cbf3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 

  let database = firebase.database();

  let name = '';
  let role = '';
  let startDate = '';
  let monthlyRate = 0;

  $("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#inputName").val().trim();
    role = $("#inputRole").val().trim();
    startDate = moment($("#inputStartDate").val().trim(), "MM/DD/YYYY").format("X");
    monthlyRate = $("#inputMonthlyRate").val().trim();

    // Code for handling the push
    database.ref().push({
      name, 
      role,
      startDate,
      monthlyRate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  database.ref().on("child_added", function(childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    let sv = childSnapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.monthlyRate);

    $('#newEmployee').append(`<tr>
    <th id="nameDisp" scope="col">${sv.name}</th>
    <th id="roleDisp" scope="col">${sv.role}</th>   
    <th id="startDateDisp" scope="col">${sv.startDate}</th>
    <th id="monthsWorkedDisp" scope="col">....($)</th>  
    <th id="monthlyRateDisp" scope="col">${sv.monthlyRate}</th>
    <th id="totalBilledDisp" scope="col">...($)</th>
    </tr>`);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  const momentDate = moment(startDate, 'MMDDYYYY');

    console.log(momentDate.diff(moment(), 'months'));