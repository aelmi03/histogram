const boundsContainer = document.querySelector(".bounds");

const defaultGrades =  [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

const gradeToPercentage = new Map([
    ["Max", 100.00],
    ["A+", 95.00 ],
    ["A", 90.00],
    ["A-", 85.00 ],
    ["B+", 80.00],
    ["B", 75.00 ],
    ["B-", 70.00],
    ["C+", 65.00 ],
    ["C", 60.00],
    ["C-", 55.00 ],
    ["D", 50.00],
    ["F+", 0.00 ]
])

gradeToPercentage.forEach((val, key) => {
    const boundContainer = document.createElement("div");
    boundContainer.className = "bound";
    const boundLabel = document.createElement("label");
    boundLabel.setAttribute("for", "adjustBound");
    boundLabel.textContent = key;
    const boundInput = document.createElement("input");
    boundInput.setAttribute("type", "number");
    boundInput.setAttribute("id", "adjustBound");
    boundInput.className = "adjustBound"
    boundInput.setAttribute("step", "any");
    boundInput.value = val;
    boundContainer.appendChild(boundLabel);
    boundContainer.appendChild(boundInput);
    boundsContainer.append(boundContainer);
})

{/* <div class = "bound">
                    <label for = "adjustBound">
                        Max
                    </label>
                    <input type="number" id = "adjustBound"></input> */}