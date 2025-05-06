let display = document.getElementById("display");

// Append value to the display
function append(value) {
  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
}

// Clear display
function clearDisplay() {
  display.value = "0";
}

// Delete last character
function deleteLast() {
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = "0";
  }
}

// Calculate result
function calculate() {
  try {
    // Evaluate using Function constructor instead of eval (safer)
    display.value = new Function("return " + display.value);
  } catch (e) {
    display.value = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/().".includes(key)) {
    append(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
