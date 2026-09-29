/* Question 1
Write a function in JavaScript that will receive a string as a parameter and then perform the following:

• You don’t have to prompt for a string. Simply assign a string to a variable in your code as your starting point to use as an argument for your function.
• If the first and last characters of the string are the same (ignoring case), the function will return the string in reverse order. Otherwise, the function will return the string with the first and last letters removed.
• Example: “Triscuit” returns “tiucsirT” but “Cracker” returns “racke”.
*/

/* Create a function with the parameter on the topic of food, declare the food not ask the user */

function treat(input) {
  // If the string contains a space → strip the first and last characters
  if (input.includes(' ')) {
    return input.slice(1, -1);
  }
  // Single word → reverse the whole string
  return input.split('').reverse().join('');
}

// Testing sample
const testWord = "doordash";
console.log(treat(testWord));       // "hsadrood"  (no space → reverse)
console.log(treat("velvet cake"));  // "elvet cak"  (has space → strip ends)



/* Question 2
Write a function in JavaScript that will return the sum of the longest streak of consecutive increasing numbers within an array.

• If there are no consecutive numbers in the array, the function will return zero.
• If there are multiple instances of the same number of consecutive numbers (increasing by 1) in the array, the function will return the largest sum calculated between all instances.
• Examples:
  [1, 2, 3, 6, 9, 34, 2, 6] → 6
  [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3] → 27
  [100, 101, 102, 3, 4, 5, 6, 9] → 18
*/

// Function that finds the sum of the longest run of increasing-by-1 numbers
function calcMaxStreakSum(arr) {

    // If the array is too small, no streak can exist
    if (arr.length < 2) return 0;

    let maxSum = 0;          // Highest streak sum found
    let runningSum = arr[0]; // Sum of the current streak

    // Loop through the array starting at index 1
    for (let idx = 1; idx < arr.length; idx++) {

        // Check if current number continues the streak
        if (arr[idx] === arr[idx - 1] + 1) {
            runningSum += arr[idx]; // Add to streak
        } else {
            // Streak ended — compare totals
            if (runningSum > maxSum) {
                maxSum = runningSum;
            }
            runningSum = arr[idx]; // Reset streak
        }
    }

    // Final check in case best streak ends at last element
    if (runningSum > maxSum) {
        maxSum = runningSum;
    }

    return maxSum;
}

// Test sample
console.log(calcMaxStreakSum([3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3]));
console.log(calcMaxStreakSum([32, 33, 34, 3, 4, 5, 6, 9]));



/* Question 3
Write a JavaScript program to calculate the number of weeks, days, hours, minutes and seconds left until midnight on your birthday.

• The script does not have to prompt for your birthdate. Simply assign it to a variable and start from there.
• Expected sample output:
  There are 35 weeks, 3 days, 13 hours, 25 minutes, and 12 seconds until my next birthday!
*/

// Set your next birthday at midnight (change date as needed)
var upcomingBirthday = new Date("2027-11-02T00:00:00"); // Example birthday

// Current date/time
var currentDate = new Date();

// Difference in milliseconds
var msRemaining = upcomingBirthday - currentDate;

// Convert milliseconds into usable units
var allSeconds = Math.floor(msRemaining / 1000);
var allMinutes = Math.floor(allSeconds / 60);
var allHours = Math.floor(allMinutes / 60);
var allDays = Math.floor(allHours / 24);
var allWeeks = Math.floor(allDays / 7);

// Convert into proper leftover units
var remDays = allDays % 7;
var remHours = allHours % 24;
var remMinutes = allMinutes % 60;
var remSeconds = allSeconds % 60;

// Output formatted message
console.log(
    `There are ${allWeeks} weeks, ${remDays} days, ${remHours} hours, ${remMinutes} minutes, and ${remSeconds} seconds until my next birthday!`
);



/* Question 4
Write a JavaScript program to iterate through an array of ten positive randomly generated numbers. 
Each number will then be checked to see if it's a prime number.

• Sample Expected output:
  23-yes, 15-no, 22-no, 124-no, 11-yes, 9-no, 2-yes, 13-yes, 5-yes, 1-no
*/

// Function that checks if a number is prime
function isPrimeNumber(num) {

    // 1 and below are not prime
    if (num <= 1) return false;

    // Only check up to the square root for efficiency
    for (let divisor = 2; divisor <= Math.sqrt(num); divisor++) {
        if (num % divisor === 0) {
            return false; // Not prime
        }
    }

    return true; // Prime
}

// NEW ARRAY EXAMPLE (10 random numbers between 1–200)
let randomNums = [];
for (let idx = 0; idx < 10; idx++) {
    randomNums.push(Math.floor(Math.random() * 200) + 1);
}

// Build output string
let outputText = "";

for (let item of randomNums) {
    outputText += `${item}-${isPrimeNumber(item) ? "yes" : "no"}, `;
}

// Remove trailing comma + space
outputText = outputText.slice(0, -2);

// Test results
console.log(outputText);


/*Question #5: Extend the string function to handle the following:
•	If the string contains any digits, remove them before processing.
•	If the string is a palindrome (ignoring case and spaces), return "Palindrome detected!" instead of reversing or trimming.
•	Allow the function to accept an optional second parameter: a Boolean true to force reverse regardless of first/last character match.
 */


function processPhrase(str, forceReverse = false) {
  // Remove all digits from the string (0–9)
  const cleaned = str.replace(/\d/g, "");

  // Remove spaces and make lowercase for palindrome checking
  const check = cleaned.replace(/\s/g, "").toLowerCase();

  // Check if the cleaned string is a palindrome
  // [...check] turns the string into an array of characters
  // reverse().join("") flips it and turns it back into a string
  if (check === [...check].reverse().join("")) {
    return "Palindrome detected!";
  }

  // If forceReverse is true OR the first and last characters match,
  // reverse the cleaned string
  if (forceReverse || cleaned.at(0) === cleaned.at(-1)) {
    return [...cleaned].reverse().join("");
  }

  // Otherwise, remove the first and last character
  return cleaned.slice(1, -1);
}

/*Question 6 : Task: Enhance the streak function to:
•	Return an object with the longest streak, its sum, and its starting index.
•	Log a visual representation of the streak using formatted output.
•	Accept a second parameter that allows the user to define the step size (e.g., streaks increasing by 2 instead of 1).
 */

function streakAnalysis(arr, step = 1) {
  // This function finds the LONGEST streak of numbers that increase
  // by a specific step size (default is 1).
  // Example: [3,4,5] is a streak increasing by 1.
  // Example: [2,4,6] is a streak increasing by 2.

  // 'longest' will store the BEST streak found so far.
  let longest = [];

  // 'current' stores the streak we are currently building.
  let current = [];

  // 'startIndex' tracks where the current streak started.
  let startIndex = 0;

  // 'bestStartIndex' tracks where the longest streak started.
  let bestStartIndex = 0;

  // Loop through every number in the array
  for (let i = 0; i < arr.length; i++) {

    // If current streak is empty, start a new streak
    if (current.length === 0) {
      current.push(arr[i]);     // Add first number
      startIndex = i;           // Record where streak started

    } else {

      // Check if the next number continues the streak pattern
      // Example: if step = 1, we expect arr[i] === previous + 1
      if (arr[i] === current[current.length - 1] + step) {
        current.push(arr[i]);   // Continue streak

      } else {
        // Streak is broken — check if current streak is the longest
        if (current.length > longest.length) {
          longest = [...current];       // Save longest streak
          bestStartIndex = startIndex;  // Save where it started
        }

        // Reset streak starting from current number
        current = [arr[i]];
        startIndex = i;
      }
    }
  }

  // After loop ends, check one last time
  if (current.length > longest.length) {
    longest = [...current];
    bestStartIndex = startIndex;
  }

  // VISUALIZATION: Print streak nicely in console
  console.log("Streak Visualization:");
  console.log(
    longest.map(n => `[${n}]`).join(" → ") // Example: [8] → [9] → [10]
  );

  // Return the required object
  return {
    streak: longest,
    sum: longest.reduce((a, b) => a + b, 0), // Add all numbers
    startIndex: bestStartIndex
  };
}
