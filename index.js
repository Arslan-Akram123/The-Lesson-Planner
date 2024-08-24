// Avatar changer

let avatar = document.getElementById("avatar");
let fileInput = document.getElementById("fileInput");

avatar.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  avatar.src = URL.createObjectURL(fileInput.files[0]);
});
// Sidebar setting
function openNav(){
   document.getElementById("mySideBar").style.display = "block";
   document.getElementById("overlay").style.display = "block";
}
function closeNav(){
  document.getElementById("mySideBar").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
function alsoclose(){
  document.getElementById("mySideBar").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
// Create new plan

let dashboard = document.getElementById("dashboard");
let dashHeroSection = document.getElementById("dashboard-hero-section");
let createNewPlan = document.getElementById("createNewPlan");
let form = document.getElementById("form");
let submitBtnContainer = document.getElementById("submit-btn-container");

createNewPlan.addEventListener("click", () => {
  emptyAllFields();
  dashboard.className =
    " px-3  md:px-1 bg-slate-300 w-full  box-border py-8 flex justify-center items-center flex-col gap-5 h-screen";
  dashHeroSection.classList.add("hidden");
  updateBtnContainer.classList.add("hidden");
  form.classList.remove("hidden");
  submitBtnContainer.classList.remove("hidden");
});

// Lectures form

let durationForm = document.getElementById("duration-form");
let lecturesForm = document.getElementById("lectures-form");
let lecturesInput = document.getElementById("lectures-input");
let startEndDateForm = document.getElementById("start-end-date-form");
let startDateInput = document.getElementById("start-date-input");
let endDateInput = document.getElementById("end-date-input");
// display appropriate duration
durationForm.addEventListener("change", () => {
  if (durationForm.value == "lectures") {
    lecturesForm.classList.remove("hidden");
    startEndDateForm.classList.add("hidden");
  } else if (durationForm.value == "start-end-date") {
    lecturesForm.classList.add("hidden");
    startEndDateForm.classList.remove("hidden");
  } else {
    lecturesForm.classList.add("hidden");
    startEndDateForm.classList.add("hidden");
  }
});
// pick up all the checked values
let checkedBoxes;
  checkedValues = 0;

function checkboxEventHandler() {
  checkedBoxes = document.querySelectorAll("input[name=day]:checked");
  checkedValues = [...checkedBoxes].map((checkbox) => checkbox.value);
}

// empty all the fields
function emptyAllFields() {
  checkboxEventHandler();
  if (checkedValues.length > 0)
    checkedBoxes.forEach((checkbox) => (checkbox.checked = false));

  checkedValues = 0;
  subjectInput.value = "";
  durationForm.value = "Choose a Format";
  startDateInput.value = "";
  endDateInput.value = "";
  lecturesInput.value = "";
  topicsInput.value = "";
  lecturesForm.classList.add("hidden");
  startEndDateForm.classList.add("hidden");
}

// submit

let subjectInput = document.getElementById("subject-input");
let topicsInput = document.getElementById("topics-input");
let plansListContainer = document.getElementById("plans-list-container");
let successAlert = document.getElementById("success-alert");
let failureAlert = document.getElementById("failure-alert");
let dashboardHeading = document.getElementById("dashboard-heading");
let submit = document.getElementById("submit");

let existingSubject;
let planDataList = [];
let calculatedPlansDataList = [];

submit.addEventListener("click", () => {
  checkboxEventHandler();

  // Validate form input
  if (
    subjectInput.value === "" ||
    checkedValues.length === 0 ||
    durationForm.value === "Choose a Format" ||
    (lecturesInput.value === 0 && startDateInput.value === "" && endDateInput.value === "") ||
    topicsInput.value === ""
  ) {
    // Show failure alert if validation fails
    failureAlert.classList.remove("hidden");
    failureAlert.classList.remove("-translate-y-40");
    setTimeout(() => {
      failureAlert.classList.add("hidden");
      failureAlert.classList.add("-translate-y-40");
    }, 2000);
  } else {
    // Attempt to add data to the plan list
    let success = pushDatainPlanList(subjectInput.value);

    if (success) {
      // Show success alert if data is successfully added
      successAlert.classList.remove("hidden");
      successAlert.classList.remove("-translate-y-40");
      setTimeout(() => {
        successAlert.classList.add("hidden");
        successAlert.classList.add("-translate-y-40");
      }, 2000);
    }

    // Display updated plans
    displayPlan();
  }
});


// push data in the planDataList

function pushDatainPlanList(subjectInput) {
  const subjectExists = planDataList.some(
    (value) => value.subject == subjectInput
  );
  let planData = {};

  if (!subjectExists) {
    if (durationForm.value == "lectures") {
      planData = {
        subject: subjectInput,
        days: checkedValues,
        durationForm: durationForm.value,
        lecturesInput: lecturesInput.value,
        topicsInput: topicsInput.value,
      };
    } else {
      planData = {
        subject: subjectInput,
        days: checkedValues,
        durationForm: durationForm.value,
        startDateInput: startDateInput.value,
        endDateInput: endDateInput.value,
        topicsInput: topicsInput.value,
      };
    }

    planDataList.push(planData);
    generatePlan(planData);
    displayPlanDetails(planData);
    updatePlansList(subjectInput);
    return true;
  } else {
    alert("Already added");
    return false;
  }
}
// sideplan list
function updatePlansList(subject) {
  // Avoid adding duplicate entries
  if (!document.getElementById(subject)) {
    plansListContainer.innerHTML += `
      <a id="${subject}" class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
         href="#">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <span class="mx-4 font-medium">${subject}</span>
      </a>`;
    // changeHeadingBg(subject); // Function to change heading background
  }
}


// display dashboard
function displayDashboard() {
  dashboard.className =
    "px-3 md:px-1 w-full box-border py-8 flex justify-center flex-col gap-5 min-h-screen flex-wrap";
  dashboardHeading.className =
  "flex items-center px-4 py-2 text-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-200";

  emptyAllFields();
  resetAllHeadingBg(); // Ensure this function is implemented to reset heading background
 

  dashHeroSection.classList.remove("hidden");
  form.classList.add("hidden");
  submitBtnContainer.classList.add("hidden");
  planDetails.classList.add("hidden");
}


// display specific plan details

let planDetails = document.getElementById("plan-details");
function displayPlan() {
  planDataList.forEach((plan) => {
    const element = document.getElementById(plan.subject);
    if (element) {
      element.addEventListener("click", () => {
        displayPlanDetails(plan); // Function to display plan details
        changeHeadingBg(plan.subject); // Function to update heading background
      });
    }
  });
}


let editPlan = document.getElementById("edit-plan");
let deletePlanBtn = document.getElementById("delete-plan");

// Function to display plan details and set up event listeners
function displayPlanDetails(plan) {
  editPlan.innerHTML = `Edit ${plan.subject}`;
  deletePlanBtn.innerHTML = `Delete ${plan.subject}`;

  // Set up event listeners for the buttons
  deletePlanBtn.onclick = () => deleteSpecificPlan(plan.subject);
  editPlan.onclick = () => updatePlan(plan);

  // Update the UI with calculated plan data
  calculatedPlansDataList.forEach((calculatedPlan) => {
    if (calculatedPlan.name === plan.subject) {
      updateUI(calculatedPlan);
    }
  });

  // Show and hide relevant sections
  form.classList.add("hidden");
  planDetails.classList.remove("hidden");
  dashHeroSection.classList.add("hidden");
  dashboard.classList.add("justify-start");
  dashboard.classList.remove("justify-center");
}
// ADD THE FUNCTIONALITY REGARDING THE FILTRATION OF THE EXISTING PLAN IF EXIST DON'T UPDATE THAT PLAN.....

// Edit or Update Plan

let updateBtnContainer = document.getElementById("update-btn-container");
let updatePlanBtn = document.getElementById("update-plan");



updatePlanBtn.addEventListener("click", updatePlanHandler);
function updatePlanHandler() {
  // Ensure checkboxEventHandler is called
  checkboxEventHandler();

  // Validate the form inputs
  if (
    subjectInput.value === "" ||
    checkedValues.length === 0 ||
    durationForm.value === "Choose a Format" ||
    (durationForm.value === "lectures" && lecturesInput.value === 0) ||
    (durationForm.value === "start-end-date" &&
      (startDateInput.value === "" || endDateInput.value === "")) ||
    topicsInput.value === ""
  ) {
    failureAlert.classList.remove("hidden");
    failureAlert.classList.remove("-translate-y-40");
    setTimeout(() => {
      failureAlert.classList.add("hidden");
      failureAlert.classList.add("-translate-y-40");
    }, 2000);
    return; // Exit the function if validation fails
  }

  // Prepare the updated plan object
  let obj = {
    subject: subjectInput.value,
    days: checkedValues,
    topicsInput: topicsInput.value,
    durationForm: durationForm.value,
    ...(durationForm.value === "lectures"
      ? { lecturesInput: lecturesInput.value }
      : {
        startDateInput: startDateInput.value,
        endDateInput: endDateInput.value,
      }),
  };

  // Check if the updated subject name already exists in the planDataList
  let existingPlan = planDataList.find(plan => plan.subject === obj.subject);

  if (existingPlan && existingPlan.subject !== currentEditingPlan.subject) {
    // If a plan with the same name exists and it's not the one being edited
    failureAlert.classList.remove("hidden");
    failureAlert.innerText = "The subject name is already taken.";
    failureAlert.classList.remove("-translate-y-40");
    setTimeout(() => {
      failureAlert.classList.add("hidden");
      failureAlert.classList.add("-translate-y-40");
    }, 2000);
    return; // Exit the function if a duplicate name is found
  }

  // Success: show alert
  successAlert.classList.remove("hidden");
  successAlert.classList.remove("-translate-y-40");
  setTimeout(() => {
    successAlert.classList.add("hidden");
    successAlert.classList.add("-translate-y-40");
  }, 2000);

 

  // Add or update the plan in the list
  let idx = planDataList.findIndex(plan => plan.subject === currentEditingPlan.subject);
 
  planDataList[idx] = obj;
  generatePlan(obj, idx);

  updatePlanHeading(currentEditingPlan.subject,obj.subject)
 

  displayPlan();
  displayPlanDetails(obj);
  form.classList.add("hidden");
  planDetails.classList.remove("hidden");
  updateBtnContainer.classList.add("hidden");
}



function showAlert(alertElement, message) {
  if (!alertElement.classList.contains("hidden")) {
    return; // If the alert is already visible, don't show it again
  }

  alertElement.innerText = message;
  alertElement.classList.remove("hidden");
  alertElement.classList.remove("-translate-y-40");

  setTimeout(() => {
    alertElement.classList.add("hidden");
    alertElement.classList.add("-translate-y-40");
  }, 2000);
}


function updatePlanHeading(oldId, newSubject) {
  let oldPlanHeading = document.getElementById(oldId);
  if (oldPlanHeading) {
    oldPlanHeading.innerHTML = `
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="mx-4 font-medium">${newSubject}</span>
    `;
    oldPlanHeading.id = newSubject;
  }
}



// Function to update a plan
function updatePlan(plan) {
  // Store the current editing plan
  currentEditingPlan = plan;

 

  // Pre-fill the form fields with the current plan's details
  subjectInput.value = plan.subject;
  topicsInput.value = plan.topicsInput;
  durationForm.value = plan.durationForm;
  lecturesInput.value = plan.lecturesInput;
  startDateInput.value = plan.startDateInput;
  endDateInput.value = plan.endDateInput;

  checkedBoxes.forEach((checkbox) => {
    checkbox.checked = plan.days.includes(checkbox.value);
  });

  // Show or hide form sections based on duration format
  if (plan.durationForm === "lectures") {
    lecturesForm.classList.remove("hidden");
    startEndDateForm.classList.add("hidden");
  } else if (plan.durationForm === "start-end-date") {
    lecturesForm.classList.add("hidden");
    startEndDateForm.classList.remove("hidden");
  } else {
    lecturesForm.classList.add("hidden");
    startEndDateForm.classList.add("hidden");
  }

  updateBtnContainer.classList.remove("hidden");
  planDetails.classList.add("hidden");
  form.classList.remove("hidden");
  submitBtnContainer.classList.add("hidden");
}

function changeHeadingBg(planHeading) {
  resetAllHeadingBg();

  // Get the heading element by ID
  let heading = document.getElementById(planHeading);

  // Check if the element exists
  if (heading) {
    heading.className =
      "flex items-center px-4 py-2 text-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-200";
  } else {
    console.error(`No element found with ID: ${planHeading}`);
  }
}

function resetAllHeadingBg() {
  Array.from(plansListContainer.children).forEach((heading) => {
    heading.classList.remove("dark:bg-gray-800", "dark:text-gray-200");
    heading.classList.add("dark:text-gray-400");
  });
}



// delete specific plan

function deleteSpecificPlan(planSubject) {
  console.log("Deleting plan:", planSubject);

  // Remove the plan heading element from the UI
  let planHeading = document.getElementById(planSubject);
  if (planHeading) {
    planHeading.remove();
  }

  // Remove the plan from planDataList and calculatedPlansDataList
  planDataList = planDataList.filter(plan => plan.subject !== planSubject);
  calculatedPlansDataList = calculatedPlansDataList.filter(plan => plan.name !== planSubject);

  // Log the updated arrays for debugging
  console.log("Updated planDataList:", planDataList);
  console.log("Updated calculatedPlansDataList:", calculatedPlansDataList);

  // Refresh the display
  displayDashboard();
}




// Generate Plan Logic
function generatePlan(plan, ...rest) {
  let days = plan.days; // Array of working days, e.g., ['Monday', 'Wednesday']
  let topics = plan.topicsInput;
  topics = topicsSeparator(topics); // Split topics if necessary

  if (plan.durationForm === "lectures") {
    let lectures = plan.lecturesInput;
    topicsDistributor(topics, lectures, days, plan.subject, rest[0]);
  } else {
    let lectures = calculateWorkingDays(
      days,
      startDateInput.value,
      endDateInput.value
    );
    topicsDistributor(topics, lectures, days, plan.subject, rest[0]);
  }
}

function topicsDistributor(topics, lectures, days, planSubject, index) {
  let topicsPerLecture = Math.floor(topics.length / lectures);
  let remainder = topics.length % lectures;
  let weeks = Math.ceil(lectures / days.length);

  let weeksArray = [];
  let topicIndex = 0;

  for (let k = 0; k < weeks; k++) {
    let daysOfWeek = [];

    for (let i = 0; i < days.length; i++) {
      let day = days[i % days.length];
      let topicsForToday = topicsPerLecture + (remainder > 0 ? 1 : 0);
      remainder--;

      let topicsArray = [];
      for (let j = 0; j < topicsForToday; j++) {
        if (topicIndex < topics.length) {
          topicsArray.push(topics[topicIndex]);
          topicIndex++;
        }
      }

      let obj = {
        name: day,
        topic: topicsArray,
        topicChecked: [] // Initialize an array to keep track of checked topics
      };
      daysOfWeek.push(obj);

      if (topicIndex >= topics.length) break;
    }

    let week = {
      name: "Week " + (k + 1),
      days: daysOfWeek,
    };

    weeksArray.push(week);
  }

  let planObj = {
    name: planSubject,
    weeks: weeksArray,
  };

  if (index !== undefined && index >= 0) {
    calculatedPlansDataList[index] = planObj;
  } else {
    calculatedPlansDataList.push(planObj);
  }

  console.log(calculatedPlansDataList);

  updateUI(planObj, index);
}

function updateUI(planObj, planIndex) {
    let weeksWrapper = document.getElementById("weeks-wrapper");
    weeksWrapper.innerHTML = "";
  
    planObj.weeks.forEach((week, weekIndex) => {
        let weekDiv = document.createElement("div");
        weekDiv.className = "week-container  flex justify-center flex-col gap-4";
        weekDiv.innerHTML = `<h1 class="text-3xl text-center sm:font-bold mb-4 mt-5">${week.name}</h1>`;
  
        let daysWrapper = document.createElement("div");
        daysWrapper.className = "days-wrapper flex gap-4 px-4 justify-center items-start flex-wrap w-full";
        weekDiv.appendChild(daysWrapper);
  
        week.days.forEach((day, dayIndex) => {
            let cardId = `card-${weekIndex}-${dayIndex}`;
            let dayDiv = document.createElement("div");
            dayDiv.className = "day-container bg-white  shadow-md dark:bg-gray-800 flex justify-between flex-col p-4 w-80 rounded-lg";
            dayDiv.id = cardId;
            dayDiv.setAttribute("ondrop", `drop(event, '${planObj.name}')`);
            dayDiv.setAttribute("ondragover", "allowDrop(event)");
  
            dayDiv.innerHTML = `
                <div class=" bg-white rounded-lg shadow-md dark:bg-gray-800 flex justify-between flex-col flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-lg font-semibold text-gray-800 dark:text-white">${day.name}</span>
                  </div>
                  ${day.topic.map((topic, topicIndex) => `
                    <div class="flex" draggable="true" id="topic-${weekIndex}-${dayIndex}-${topicIndex}" ondragstart="drag(event)">
                      <input id="statusCheck-${weekIndex}-${dayIndex}-${topicIndex}" name="statusCheck-${weekIndex}-${dayIndex}-${topicIndex}" type="checkbox" class=" mt-1 w-3 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500">
                      <label for="statusCheck-${weekIndex}-${dayIndex}-${topicIndex}" class="w-full pb-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${topic}</label>
                    </div>
                  `).join('')}
                </div>
            `;
            daysWrapper.appendChild(dayDiv);
        });
  
        weeksWrapper.appendChild(weekDiv);
    });
  
    handleTopicCheck(planObj.weeks, `${planObj.name}`);
  }
  

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event, subject) {
    event.preventDefault();
    let planIndex = calculatedPlansDataList.findIndex(plan => plan.name === subject);
    let data = event.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);
  
    // Extract the indices from the dragged element's id
    let [draggedWeekIndex, draggedDayIndex, draggedTopicIndex] = data.split("-").slice(1);
  
    // Ensure we are only dropping into the correct container
    let dropTarget = event.target.closest(".day-container");
  
    // Check if dropTarget is a valid day container
    if (!dropTarget) {
        return;
    }

    // Get the drop target's day and week indices
    let dropCardId = dropTarget.id;
    let [dropWeekIndex, dropDayIndex] = dropCardId.split("-").slice(1);

    // Update the UI by appending the dragged element to the drop target
    dropTarget.querySelector('.flex-1').appendChild(draggedElement);
  
    // Move the topic within the array
    let draggedTopic = calculatedPlansDataList[planIndex].weeks[draggedWeekIndex].days[draggedDayIndex].topic[draggedTopicIndex];
  
    // Remove the topic from the original location
    calculatedPlansDataList[planIndex].weeks[draggedWeekIndex].days[draggedDayIndex].topic.splice(draggedTopicIndex, 1);
  
    // Add the topic to the new location
    calculatedPlansDataList[planIndex].weeks[dropWeekIndex].days[dropDayIndex].topic.push(draggedTopic);
  
    // Update the UI for both the original and new locations
    updateUI(calculatedPlansDataList[planIndex], planIndex);
}

  

function handleTopicCheck(weeks, subject) {
    const planIndex = calculatedPlansDataList.findIndex(plan => plan.name === subject);

    weeks.forEach((week, weekIndex) => {
        week.days.forEach((day, dayIndex) => {
            const cardElement = document.querySelector(`#card-${weekIndex}-${dayIndex}`);
            const checkboxes = cardElement.querySelectorAll('input[type="checkbox"]');
            const topics = weeks[weekIndex].days[dayIndex].topic;

            // Restore previous state from topicChecked if already checked
            checkboxes.forEach((checkbox, checkboxIndex) => {
                const topicName = weeks[weekIndex].days[dayIndex].topic[checkboxIndex];
                const savedState = calculatedPlansDataList[planIndex]?.weeks[weekIndex]?.days[dayIndex]?.topicChecked || [];

                if (savedState.includes(topicName)) {
                    checkbox.checked = true;
                    checkbox.disabled = true;
                    const draggableItem = document.getElementById(`topic-${weekIndex}-${dayIndex}-${checkboxIndex}`);
                    if (draggableItem) {
                        draggableItem.setAttribute('draggable', 'false');
                    }
                } else {
                    checkbox.checked = false;
                    checkbox.disabled = false;
                    const draggableItem = document.getElementById(`topic-${weekIndex}-${dayIndex}-${checkboxIndex}`);
                    if (draggableItem) {
                        draggableItem.setAttribute('draggable', 'true');
                    }
                }
            });

            function updateCardStatus() {
                const allChecked = Array.from(checkboxes).every(cb => cb.checked);

                if (topics.length === 0) {
                    cardElement.classList.remove('disabled');
                } else if (allChecked) {
                    cardElement.classList.add('disabled');
                } else {
                    cardElement.classList.remove('disabled');
                }
            }

            checkboxes.forEach((checkbox, checkboxIndex) => {
                const topicName = weeks[weekIndex].days[dayIndex].topic[checkboxIndex];
                const draggableItem = document.getElementById(`topic-${weekIndex}-${dayIndex}-${checkboxIndex}`);

                checkbox.addEventListener('change', () => {
                    const isChecked = checkbox.checked;

                    // Ensure topicChecked is initialized
                    if (!calculatedPlansDataList[planIndex].weeks[weekIndex].days[dayIndex].topicChecked) {
                        calculatedPlansDataList[planIndex].weeks[weekIndex].days[dayIndex].topicChecked = [];
                    }

                    if (isChecked) {
                        if (!calculatedPlansDataList[planIndex].weeks[weekIndex].days[dayIndex].topicChecked.includes(topicName)) {
                            calculatedPlansDataList[planIndex].weeks[weekIndex].days[dayIndex].topicChecked.push(topicName);
                        }
                        checkbox.disabled = true;
                        if (draggableItem) {
                            draggableItem.setAttribute('draggable', 'false');
                        }
                    } else {
                        const index = calculatedPlansDataList[planIndex].weeks[weekIndex].days[dayIndex].topicChecked.indexOf(topicName);
                        if (index > -1) {
                            calculatedPlansDataList[planIndex].weeks[weekIndex].days[dayIndex].topicChecked.splice(index, 1);
                        }
                        checkbox.disabled = false;
                        if (draggableItem) {
                            draggableItem.setAttribute('draggable', 'true');
                        }
                    }

                    updateCardStatus();
                });
            });

            // Initial card status update
            updateCardStatus();
        });
    });
}



  
  

// let calculatedPlansData = [
//     {
//         name: "Plan 1",
//         weeks: [
//             {
//                 week: "Week 2",
//                 days: [
//                     {
//                         day: "Monday",
//                         topics: ["Topic 1", "Topic 2", "Topic 3"]
//                     },
//                     {
//                         day: "Wednesday",
//                         topics: ["Topic 4", "Topic 5", "Topic 6"]
//                     }
//                 ],
//             },
//             {
//                 week: "Week 2",
//                 days: [
//                     {
//                         day: "Monday",
//                         topics: ["Topic 1", "Topic 2", "Topic 3"]
//                     },
//                     {
//                         day: "Wednesday",
//                         topics: ["Topic 4", "Topic 5", "Topic 6"]
//                     }
//                 ],
//             }

//         ]

//     },
//     {
//         name: "Plan 2",
//         weeks: [
//             {
//                 week: "Week 1",
//                 days: ["Monday", "Wednesday"],
//                 topics: ["Topic 1", "Topic 2", "Topic 3"]
//             },
//             {
//                 week: "Week 2",
//                 days: ["Monday", "Wednesday"],
//                 topics: ["Topic 4", "Topic 5", "Topic 6"]
//             }
//         ]
//     }
// ];

// console.log(calculatedPlansData[1].name, calculatedPlansData[1].weeks[1].days)

function topicsSeparator(topicsInput) {
  return topicsInput
    .split(/[\n]+/)
    .map((topic) => topic.trim())
    .filter((topic) => topic !== "");
}

function calculateWorkingDays(days, startDT, endDT) {
  // Get start and end dates
  const startDate = new Date(startDT);
  const endDate = new Date(endDT);

  // Map day names to day numbers
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Convert the array of day names to an array of corresponding day numbers
  const dayNumbers = days.map((day) => dayMap[day]);

  // Calculate the total number of days between the start and end dates
  const totalDays = Math.floor((endDate - startDate) / (1000 * 3600 * 24)) + 1;

  let workingDaysCount = 0;

  // Loop through each day in the date range
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const currentDay = currentDate.getDay();

    if (dayNumbers.includes(currentDay)) {
      workingDaysCount++;
    }
  }

  return workingDaysCount;
}