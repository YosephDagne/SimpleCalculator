// Get all the necessary elements
const valueDisplay = document.querySelector(".value");
const buttons = document.querySelectorAll(".button");

// Variables for calculation state
let currentValue = "0"; // Display value
let previousValue = null; // Store previous value for operations
let operator = null; // Store current operator

// Event listener for button clicks
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
  const button = event.target;

  // Handle function buttons (AC, ±, %)
  if (button.classList.contains("ac")) {
    resetCalculator();
  } else if (button.classList.contains("pm")) {
    toggleSign();
  } else if (button.classList.contains("percent")) {
    applyPercent();
  }
  // Handle numbers
  else if (
    button.classList.contains("number-0") ||
    button.classList.contains("number-1") ||
    button.classList.contains("number-2") ||
    button.classList.contains("number-3") ||
    button.classList.contains("number-4") ||
    button.classList.contains("number-5") ||
    button.classList.contains("number-6") ||
    button.classList.contains("number-7") ||
    button.classList.contains("number-8") ||
    button.classList.contains("number-9")
  ) {
    handleNumberClick(button.innerText);
  }
  // Handle operators (+, −, ×, ÷)
  else if (button.classList.contains("operator")) {
    handleOperatorClick(button.innerText);
  }
  // Handle equal sign (=)
  else if (button.classList.contains("equal")) {
    calculateResult();
  }
  // Handle decimal point
  else if (button.classList.contains("decimal")) {
    handleDecimal();
  }
}

function handleNumberClick(number) {
  if (currentValue === "0") {
    currentValue = number; // Replace 0 with the clicked number
  } else {
    currentValue += number; // Append the number to the current value
  }
  updateDisplay();
}

function handleOperatorClick(operatorSymbol) {
  // If there's a previous value and operator, calculate the result
  if (previousValue !== null && operator !== null) {
    calculateResult();
  }

  previousValue = currentValue; // Store current value as previous value
  operator = operatorSymbol; // Store operator
  currentValue = "0"; // Reset the current value for the next number
}

function calculateResult() {
  let result;

  // Convert current and previous values to numbers
  const num1 = parseFloat(previousValue);
  const num2 = parseFloat(currentValue);

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "−":
      result = num1 - num2;
      break;
    case "×":
      result = num1 * num2;
      break;
    case "÷":
      result = num1 / num2;
      break;
    default:
      return;
  }

  // Update the current value with the result and reset operator and previous value
  currentValue = result.toString();
  operator = null;
  previousValue = null;

  updateDisplay();
}

function updateDisplay() {
  valueDisplay.innerText = currentValue;
}

function resetCalculator() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  updateDisplay();
}

function toggleSign() {
  // Toggle the sign of the current number
  currentValue = (parseFloat(currentValue) * -1).toString();
  updateDisplay();
}

function applyPercent() {
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay();
}

function handleDecimal() {
  // Prevent adding multiple decimal points
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}
