const boundsContainer = document.querySelector(".bounds");
const distributionContainer = document.querySelector("#distribution-container");
const addGradeButton = document.querySelector("button");
const addNewGradeInput = document.querySelector("#newGrade");
const warningText = document.querySelector("#warningText");

const grades = [
  65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.0, 81.43, 86.22, 88.33,
  9.03, 49.93, 52.34, 53.11, 50.1, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54,
  90.0, 71.11, 80.01,
];

const gradeToPercentage = new Map([
  ["Max", 100.0],
  ["A+", 95.0],
  ["A", 90.0],
  ["A-", 85.0],
  ["B+", 80.0],
  ["B", 75.0],
  ["B-", 70.0],
  ["C+", 65.0],
  ["C", 60.0],
  ["C-", 55.0],
  ["D", 50.0],
  ["F", 0.0],
]);

const gradeToNextLetterGrade = new Map([
  ["A+", "Max"],
  ["A", "A+"],
  ["A-", "A"],
  ["B+", "A-"],
  ["B", "B+"],
  ["B-", "B"],
  ["C+", "B-"],
  ["C", "C+"],
  ["C-", "C"],
  ["D", "C-"],
  ["F", "D"],
]);
const gradeToPreviousLetterGrade = new Map([
  ["Max", "A+"],
  ["A+", "A"],
  ["A", "A-"],
  ["A-", "B+"],
  ["B+", "B"],
  ["B", "B-"],
  ["B-", "C+"],
  ["C+", "C"],
  ["C", "C-"],
  ["C-", "D"],
  ["D", "F"],
]);
console.log(gradeToPercentage.keys());
const gradeCount = new Map([
  ["A+", 0],
  ["A", 0],
  ["A-", 0],
  ["B+", 0],
  ["B", 0],
  ["B-", 0],
  ["C+", 0],
  ["C", 0],
  ["C-", 0],
  ["D", 0],
  ["F", 0],
]);
console.log();
const calculateCountForEachGrade = () => {
  resetGradeCount();
  grades.forEach((grade) => {
    const letterGrade = getLetterGrade(grade);
    const previousCount = gradeCount.get(letterGrade);
    gradeCount.set(letterGrade, previousCount + 1);
  });
};
const resetGradeCount = () => {
  [...gradeCount.keys()].forEach((key) => gradeCount.set(key, 0));
};
const getLetterGrade = (grade) => {
  if (grade > parseInt(gradeToPercentage.get("Max"))) {
    return "A+";
  } else if (grade < parseInt(gradeToPercentage.get("F"))) {
    return "F";
  }
  const ranges = [...gradeToPercentage.values()].sort((a, b) => a - b);
  for (let i = 0; i < ranges.length - 1; i++) {
    const percentage = ranges[i];
    const nextLetterGradePercentage = ranges[i + 1];
    if (grade >= percentage && grade < nextLetterGradePercentage) {
      return [...gradeToPercentage.keys()].filter(
        (key) => gradeToPercentage.get(key) === percentage
      )[0];
    }
  }
  return "A+";
};

const renderLowerBounds = () => {
  boundsContainer.innerHTML = "";
  gradeToPercentage.forEach((val, key) => {
    const boundContainer = document.createElement("div");
    boundContainer.className = "bound";
    const boundLabel = document.createElement("label");
    boundLabel.setAttribute("for", "adjustBound");
    boundLabel.textContent = key;
    const boundInput = document.createElement("input");
    boundInput.setAttribute("type", "number");
    boundInput.setAttribute("id", "adjustBound");
    boundInput.className = "adjustBound";
    boundInput.value = val;
    boundInput.addEventListener("input", changeLowerBound);
    boundInput.setAttribute("data-key", key);
    const minimumPercentage = calculateMinimum(key);
    const maximumPercentage = calculateMax(key);
    boundInput.setAttribute("min", minimumPercentage);
    boundInput.setAttribute("max", maximumPercentage);
    boundContainer.appendChild(boundLabel);
    boundContainer.appendChild(boundInput);
    boundsContainer.append(boundContainer);
  });
};
const calculateMinimum = (grade) => {
  if (grade === "F") {
    return 0;
  } else {
    const previousLetterGrade = gradeToPreviousLetterGrade.get(grade);
    console.log(grade, previousLetterGrade);
    const minimum = gradeToPercentage.get(previousLetterGrade) + 1;
    return minimum;
  }
};
const calculateMax = (grade) => {
  if (grade === "Max") {
    return 100;
  } else {
    const nextLetterGrade = gradeToNextLetterGrade.get(grade);
    const maximum = gradeToPercentage.get(nextLetterGrade) - 1;
    return maximum;
  }
};
const renderHistogram = () => {
  distributionContainer.innerHTML = "";
  gradeCount.forEach((val, key) => {
    const gradeCountContainer = document.createElement("div");
    gradeCountContainer.className = "grade-count";
    const letterGrade = document.createElement("p");
    letterGrade.textContent = key;
    const progressBarContainer = document.createElement("div");
    progressBarContainer.className = "progress-bar-container";
    const progressBarBorder = document.createElement("div");
    progressBarBorder.className = "grade-border";
    const progressBarWidth = document.createElement("div");
    progressBarWidth.className = "grade-progress";
    progressBarContainer.appendChild(progressBarBorder);
    progressBarBorder.appendChild(progressBarWidth);
    const letterGradeCount = document.createElement("p");
    letterGradeCount.textContent = val;
    const determineProgressWidth = calculateProgressPercentage(key);
    console.log(determineProgressWidth);
    progressBarWidth.style.width = `${determineProgressWidth}%`;
    progressBarContainer.appendChild(letterGradeCount);
    gradeCountContainer.appendChild(letterGrade);
    gradeCountContainer.appendChild(progressBarContainer);
    distributionContainer.appendChild(gradeCountContainer);
  });
};
const calculateProgressPercentage = (letterGrade) => {
  const letterGradeCount = gradeCount.get(letterGrade);
  const totalCount = [...gradeCount.values()].reduce(
    (prev, curr) => prev + curr,
    0
  );
  console.log(
    letterGradeCount,
    totalCount,
    (letterGradeCount / totalCount) * 100
  );
  return (letterGradeCount / totalCount) * 100;
};
const changeLowerBound = (e) => {
  const boundInput = e.target;
  let newAmount = parseInt(boundInput.value);
  if (e.target.value == "") {
    newAmount = 0;
  }
  const minimum = parseInt(boundInput.getAttribute("min"));
  const maximum = parseInt(boundInput.getAttribute("max"));
  console.log(newAmount, minimum, maximum);
  if (newAmount > maximum) {
    newAmount = maximum;
  } else if (newAmount < minimum) {
    newAmount = minimum;
  }
  console.log(newAmount, minimum, maximum);
  const letterGrade = boundInput.getAttribute("data-key");
  gradeToPercentage.set(letterGrade, newAmount);
  console.log(gradeToPercentage);
  updateRender();
};
const initialRender = () => {
  renderLowerBounds();
  calculateCountForEachGrade();
  renderHistogram();
};

const updateRender = () => {
  renderLowerBounds();
  calculateCountForEachGrade();
  renderHistogram();
};
const addNewGrade = (e) => {
  if (addNewGradeInput.value == "" || isNaN(addNewGradeInput.value)) {
    warningText.style.visibility = "visible";
    return;
  }
  grades.push(parseFloat(addNewGradeInput.value));
  updateRender();
};
const validateNewGradeInput = (e) => {
  let value = parseFloat(e.target.value);
  warningText.style.visibility = "hidden";
  if (e.target.value == "") {
    value = 0;
    e.target.value = value;
  } else if (
    e.target.value.length > 1 &&
    e.target.value[0] == "0" &&
    e.target.value[1] != "."
  ) {
    console.log(e.target.value);
    e.target.value = e.target.value.substring(1);
  } else if (value > 100) {
    value = 100;
    e.target.value = value;
  } else if (value < 0) {
    value = 0;
    e.target.value = value;
  }
};

initialRender();
addGradeButton.addEventListener("click", addNewGrade);
addNewGradeInput.addEventListener("input", validateNewGradeInput);
/* <div class = "bound">
                    <label for = "adjustBound">
                        Max
                    </label>
                    <input type="number" id = "adjustBound"></input> */

/* <div class = "grade-count">
                        <p>A+</p>
                        <div class="grade-border">
  <div class="grade-progress" ></div>
</div>
                   </div> */
