const display = document.querySelector("#display"); //grab display
let answer = false; // a flag to reset result

function append(value) {
  if (value === "." && /(^|\D)\d*\.\d*$/.test(display.value)) {
    return; // prevent multiple "."
  }
  if (answer && /[0-9.]/.test(value)) {
    display.value = value; // check display for new calculation
  } else if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
  answer = false; // reset display for new calculation
}

function clearDisplay() {
  display.value = "0";
}

function deleteLast() {
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = "0";
  }
}

function calculate() {
  try {
    const result = eval(display.value);
    if (isFinite(result)) {
      display.value = result;
      answer = true;
    } else {
      display.value = "Error";
    }
  } catch (e) {
    display.value = "Error";
  }
}
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[\d\+\-\*\/\.\(\)]/.test(key)) {
    append(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace" || key === "Delete") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
