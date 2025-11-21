document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application display
    showActiveFunction(); 
});

// --- UTILITY FUNCTION FOR INPUT RESET (Includes DOB fix) ---
function resetInputsAndResult() {
  document.querySelectorAll('input, select').forEach(element => {
    if (element.id !== 'function-selector') {
      if (element.type === 'number') {
        element.value = element.id === 'unit-value' ? 1 : 0;
      } else if (element.tagName === 'SELECT') {
        element.selectedIndex = 0;
      } else if (element.type === 'date' || element.type === 'datetime-local') {
        element.value = '';  // clear date/datetime inputs
      }
    }
  });
  document.getElementById('final-result').textContent = "Result will appear here.";
}

// --- 1. DYNAMIC SWITCHING LOGIC (UX Control) ---
function showActiveFunction() {
  const selector = document.getElementById('function-selector');
  const sections = document.querySelectorAll('.calculator-section');

  // Reset inputs and results when switching function
  resetInputsAndResult();

  // Hide all function sections
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // Show the selected function's section by matching id to option value + '-section'
  const selected = selector.value; // now directly matches section IDs like 'add-sub' or 'time-unit'
  const activeSection = document.getElementById(selected + '-section');
  if (activeSection) {
    activeSection.style.display = 'block';
  }

  // Clear the result display area
  document.getElementById('final-result').textContent = 'Result will appear here.';
}

// --- 2. MAIN CALCULATOR DISPATCHER ---
function runCalculator() {
  const selection = document.getElementById('function-selector').value;
  let result = '';
  
  try {
    switch (selection) {
      case 'age':
        result = calculateAge();
        break;
      case 'diff':
        result = calculateDateTimeDifference(); // option 2
        break;
      case 'add-sub':
        result = calculateDateAddSubtract();
        break;
      case 'time-unit':
        result = calculateTimeUnitConversion();
        break;
      case 'weekday':
        result = findWeekday(); // option 5
        break;
      default:
        result = 'Please select a valid function';
    }
  } catch (error) {
    result = `Error: ${error.message}`;
  }

  document.getElementById('final-result').textContent = result;
}


// --- 3. FULL CALCULATION LOGIC IMPLEMENTATION ---

// 1. Age Calculator Logic
function calculateAge() {
    const dobInput = document.getElementById('dob-input').value;
    if (!dobInput) throw new Error("Please enter a Date of Birth.");
    
    const dob = new Date(dobInput);
    const now = new Date();

    if (dob > now) throw new Error("Date of Birth cannot be in the future.");

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }
    
    return `Age: ${years} years, ${months} months, ${days} days`; 
}

// 2. Date/Time Difference Logic
function calculateDateTimeDifference() {
    const startInput = document.getElementById('start-diff-date').value;
    const endInput = document.getElementById('end-diff-date').value;
    
    if (!startInput || !endInput) throw new Error("Please enter both start and end Date/Time.");
    
    const start = new Date(startInput);
    const end = new Date(endInput);

    if (start > end) throw new Error("Start Date/Time must be before End Date/Time.");

    let diffMs = end.getTime() - start.getTime(); 

    const msInDay = 1000 * 60 * 60 * 24;
    const msInHour = 1000 * 60 * 60;
    const msInMinute = 1000 * 60;

    const days = Math.floor(diffMs / msInDay);
    diffMs %= msInDay;
    
    const hours = Math.floor(diffMs / msInHour);
    diffMs %= msInHour;
    
    const minutes = Math.floor(diffMs / msInMinute);

    return `Difference: ${days} days, ${hours} hours, ${minutes} minutes`;
}

// 3. Date Adder/Subtracter Logic
function calculateDateAddSubtract() {
  const startDateInput = document.getElementById('start-add-date').value;
  const operation = document.getElementById('operation-select').value;
  const durationValue = parseInt(document.getElementById('duration-value').value, 10);
  const durationUnit = document.getElementById('duration-unit').value;

  if (!startDateInput || isNaN(durationValue) || durationValue < 0) {
    return 'Please enter a valid start date and duration';
  }

  let date = new Date(startDateInput);

  if (operation === 'subtract') {
    // For subtraction, use negative value
    switch(durationUnit) {
      case 'years':
        date.setFullYear(date.getFullYear() - durationValue);
        break;
      case 'months':
        date.setMonth(date.getMonth() - durationValue);
        break;
      case 'days':
        date.setDate(date.getDate() - durationValue);
        break;
      case 'hours':
        date.setHours(date.getHours() - durationValue);
        break;
    }
  } else { // add operation
    switch(durationUnit) {
      case 'years':
        date.setFullYear(date.getFullYear() + durationValue);
        break;
      case 'months':
        date.setMonth(date.getMonth() + durationValue);
        break;
      case 'days':
        date.setDate(date.getDate() + durationValue);
        break;
      case 'hours':
        date.setHours(date.getHours() + durationValue);
        break;
    }
  }

  return `Resulting date: ${date.toLocaleDateString('en-GB')}`;
}

// 4. Time Unit Converter Logic
function calculateTimeUnitConversion() {
    const value = parseFloat(document.getElementById('unit-value').value);
    const fromUnit = document.getElementById('from-time-unit').value;
    const toUnit = document.getElementById('to-time-unit').value;
    
    if (isNaN(value) || value < 0) throw new Error("Please enter a valid positive number.");

    const factors = {
        'seconds': 1,
        'minutes': 60,
        'hours': 3600,
        'days': 86400
    };

    if (fromUnit === toUnit) {
        return `${value} ${fromUnit}`;
    }

    const valueInSeconds = value * factors[fromUnit];
    const finalResult = valueInSeconds / factors[toUnit];
    
    return `${value} ${fromUnit} = ${finalResult.toFixed(4)} ${toUnit}`;
}

// 5. Weekday Finder Logic (NEW)
function findWeekday() {
    const dateInput = document.getElementById('weekday-date').value;
    if (!dateInput) throw new Error("Please select a date.");
    
    const date = new Date(dateInput);
    
    const weekdays = [
        "Sunday", "Monday", "Tuesday", "Wednesday", 
        "Thursday", "Friday", "Saturday"
    ];
    
    const dayName = weekdays[date.getDay()];
    
    // Format the date for the result display
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options);
    return `The date ${dateString} was a ${dayName}.`;
}
