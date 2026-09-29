/* Question 1
Write a function in JavaScript that will receive a string as a parameter and then perform the following:

• You don’t have to prompt for a string. Simply assign a string to a variable in your code as your starting point to use as an argument for your function.
• If the first and last characters of the string are the same (ignoring case), the function will return the string in reverse order. Otherwise, the function will return the string with the first and last letters removed.
• Example: “Triscuit” returns “tiucsirT” but “Cracker” returns “racke”.
*/

/* Create a function with the parameter on the topic of food, declare the food not ask the user */

function treat(input) {
  if (input.includes(' ')) {
    return input.slice(1, -1);
  }
  return input.split('').reverse().join('');
}

const testWord = "doordash";
console.log(treat(testWord));
console.log(treat("velvet cake"));



/* Question 2
Write a function in JavaScript that will return the sum of the longest streak of consecutive increasing numbers within an array.

• If there are no consecutive numbers in the array, the function will return zero.
• If there are multiple instances of the same number of consecutive numbers (increasing by 1) in the array, the function will return the largest sum calculated between all instances.
• Examples:
  [1, 2, 3, 6, 9, 34, 2, 6] → 6
  [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3] → 27
  [100, 101, 102, 3, 4, 5, 6, 9] → 18
*/

function calcMaxStreakSum(arr) {
    if (arr.length < 2) return 0;

    let maxSum = 0;
    let runningSum = arr[0];

    for (let idx = 1; idx < arr.length; idx++) {
        if (arr[idx] === arr[idx - 1] + 1) {
            runningSum += arr[idx];
        } else {
            if (runningSum > maxSum) {
                maxSum = runningSum;
            }
            runningSum = arr[idx];
        }
    }

    if (runningSum > maxSum) {
        maxSum = runningSum;
    }

    return maxSum;
}

console.log(calcMaxStreakSum([3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3]));
console.log(calcMaxStreakSum([32, 33, 34, 3, 4, 5, 6, 9]));



/* Question 3
Write a JavaScript program to calculate the number of weeks, days, hours, minutes and seconds left until midnight on your birthday.

• The script does not have to prompt for your birthdate. Simply assign it to a variable and start from there.
• Expected sample output:
  There are 35 weeks, 3 days, 13 hours, 25 minutes, and 12 seconds until my next birthday!
*/

var upcomingBirthday = new Date("2027-11-02T00:00:00");
var currentDate = new Date();
var msRemaining = upcomingBirthday - currentDate;

var allSeconds = Math.floor(msRemaining / 1000);
var allMinutes = Math.floor(allSeconds / 60);
var allHours = Math.floor(allMinutes / 60);
var allDays = Math.floor(allHours / 24);
var allWeeks = Math.floor(allDays / 7);

var remDays = allDays % 7;
var remHours = allHours % 24;
var remMinutes = allMinutes % 60;
var remSeconds = allSeconds % 60;

console.log(
    `There are ${allWeeks} weeks, ${remDays} days, ${remHours} hours, ${remMinutes} minutes, and ${remSeconds} seconds until my next birthday!`
);



/* Question 4
Write a JavaScript program to iterate through an array of ten positive randomly generated numbers. 
Each number will then be checked to see if it's a prime number.

• Sample Expected output:
  23-yes, 15-no, 22-no, 124-no, 11-yes, 9-no, 2-yes, 13-yes, 5-yes, 1-no
*/

function isPrimeNumber(num) {
    if (num <= 1) return false;

    for (let divisor = 2; divisor <= Math.sqrt(num); divisor++) {
        if (num % divisor === 0) {
            return false;
        }
    }

    return true;
}

let randomNums = [];
for (let idx = 0; idx < 10; idx++) {
    randomNums.push(Math.floor(Math.random() * 200) + 1);
}

let outputText = "";

for (let item of randomNums) {
    outputText += `${item}-${isPrimeNumber(item) ? "yes" : "no"}, `;
}

outputText = outputText.slice(0, -2);

console.log(outputText);



/*Question #5: Extend the string function to handle the following:
•   If the string contains any digits, remove them before processing.
•   If the string is a palindrome (ignoring case and spaces), return "Palindrome detected!" instead of reversing or trimming.
•   Allow the function to accept an optional second parameter: a Boolean true to force reverse regardless of first/last character match.
 */

function processPhrase(str, forceReverse = false) {
  const cleaned = str.replace(/\d/g, "");
  const check = cleaned.replace(/\s/g, "").toLowerCase();

  if (check === [...check].reverse().join("")) {
    return "Palindrome detected!";
  }

  if (forceReverse || cleaned.at(0) === cleaned.at(-1)) {
    return [...cleaned].reverse().join("");
  }

  return cleaned.slice(1, -1);
}



/*Question 6 : Task: Enhance the streak function to:
•   Return an object with the longest streak, its sum, and its starting index.
•   Log a visual representation of the streak using formatted output.
•   Accept a second parameter that allows the user to define the step size (e.g., streaks increasing by 2 instead of 1).
 */

function streakAnalysis(arr, step = 1) {
  let longest = [];
  let current = [];
  let startIndex = 0;
  let bestStartIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (current.length === 0) {
      current.push(arr[i]);
      startIndex = i;
    } else {
      if (arr[i] === current[current.length - 1] + step) {
        current.push(arr[i]);
      } else {
        if (current.length > longest.length) {
          longest = [...current];
          bestStartIndex = startIndex;
        }
        current = [arr[i]];
        startIndex = i;
      }
    }
  }

  if (current.length > longest.length) {
    longest = [...current];
    bestStartIndex = startIndex;
  }

  console.log("Streak Visualization:");
  console.log(longest.map(n => `[${n}]`).join(" → "));

  return {
    streak: longest,
    sum: longest.reduce((a, b) => a + b, 0),
    startIndex: bestStartIndex
  };
}
