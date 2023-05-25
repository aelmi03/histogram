const boundsContainer = document.querySelector(".bounds");

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
  ["F+", 0.0],
]);

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
  ["F+", 0],
]);

const calculateCountForEachGrade = () => {
  resetGradeCount();
  grades.forEach((grade) => {
    const letterGrade = getLetterGrade(grade);
    const previousCount = gradeCount.get(letterGrade);
    gradeCount.set(letterGrade, previousCount + 1);
  });
};
const resetGradeCount = () => {
  [...gradeCount.keys].forEach((key) => gradeCount.set(key, 0));
};
const getLetterGrade = (grade) => {
  const ranges = [...gradeToPercentage.values];
  for (let i = 0; i < ranges.length - 1; i++) {
    const percentage = ranges[i];
    const nextLetterGradePercentage = ranges[i + 1];
    if (grade >= percentage && grade < nextLetterGradePercentage) {
      gradeToPercentage.forEach((val, key) => {
        if (val == percentage) {
          return key;
        }
      });
    }
  }
  return "Max";
};

const renderLowerBounds = () => {
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
    boundInput.setAttribute("step", "any");
    boundInput.value = val;
    boundInput.setAttribute("min", "0");
    boundInput.setAttribute("max", "100");
    boundContainer.appendChild(boundLabel);
    boundContainer.appendChild(boundInput);
    boundsContainer.append(boundContainer);
  });
};

{
  /* <div class = "bound">
                    <label for = "adjustBound">
                        Max
                    </label>
                    <input type="number" id = "adjustBound"></input> */
}
