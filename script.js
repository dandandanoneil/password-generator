// Identify and name key elements
const passwordText = document.querySelector("#password");
const lowerCaseCheck = document.querySelector("#lowerCase");
const upperCaseCheck = document.querySelector("#upperCase");
const numericCheck = document.querySelector("#numeric");
const specialCheck = document.querySelector("#special");
const lengthRange = document.querySelector("#length");
const rangeDisplay = document.querySelector("#rangeDisplay");
const copyButton = document.querySelector("#copy");
const generateButton = document.querySelector("#generate");
const confusingCheck = document.querySelector("#confusing");

// Create strings of character banks to draw from
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numericChars = "0123456789";
const specialChars = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~\"\\";

// Preset the inputs on page load & generate first password
lowerCaseCheck.checked = true;
upperCaseCheck.checked = true;
numericCheck.checked = true;
specialCheck.checked = true;
lengthRange.value = 10;
confusingCheck.checked - false;

showLength();
writePassword();
console.log("This web application will log here each new password it generates. Often, the first password generated randomly will not meet all the user criteria, so the app will continue to generate new random options until a satisfactory password is generated.")


// Generate a password based on user inputs & write it to the #password div
function writePassword() {
  // Collect data drom user inputs
  let passwordLength = lengthRange.value;
  let useLowerCase = lowerCaseCheck.checked;
  let useUpperCase = upperCaseCheck.checked;
  let useNumeric = numericCheck.checked;
  let useSpecial = specialCheck.checked;
  let makeReadable = confusingCheck.checked;

  // If no character types are selected, don't run generatPassword()
  if (!useLowerCase && !useUpperCase  && !useNumeric  && !useSpecial) {
    passwordText.value = "password123... just kidding. Select at least one character type!"
    return;
  }

  // Generate a new password with the prompted criteria. If the new value of password matches all the criteria, write it in the #password element. If it doesn't, keep generating new passowrds until one does.
  let isValid = false;
  while (!isValid) {
    let password = generatePassword(passwordLength, useLowerCase, useUpperCase, useNumeric, useSpecial, makeReadable);

    if ((useLowerCase != commonChars(password, lowerCaseChars)) || 
    (useUpperCase != commonChars(password, upperCaseChars)) || 
    (useNumeric != commonChars(password, numericChars)) || 
    (useSpecial != commonChars(password, specialChars)) ||
    (makeReadable == commonChars(password, "O0I1l")) ){
      isValid = false;
      console.log(password, isValid);
    } else {
      isValid = true;
      passwordText.value = password;
      console.log(password, isValid);
      console.log("----")
    }
  }
  
}

// Generate a random password from the given criteria.
function generatePassword(length, useLow, useUpp, useNum, useSpe, makeRea) {
  // Create a string of all possible characters to choose from
  let possibleChars = "";
  if(useLow) { possibleChars += lowerCaseChars; }
  if(useUpp) { possibleChars += upperCaseChars; }
  if(useNum) { possibleChars += numericChars; }
  if(useSpe) { possibleChars += specialChars; }

  // If they want a more readble password, eliminate easily misread characters
  if (makeRea) {
    possibleChars = possibleChars.replace("O", "");
    possibleChars = possibleChars.replace("0", "");
    possibleChars = possibleChars.replace("I", "");
    possibleChars = possibleChars.replace("l", "");
    possibleChars = possibleChars.replace("1", "");
  }

  let newPassword = "";
  for (let i = 0; i < length; i++) {
    // Pick a random location in the string, extract the character at that location, add it to the password
    let randomLoc = Math.floor(Math.random()*possibleChars.length);
    let randomChar = possibleChars.charAt(randomLoc);
    newPassword += randomChar;
  }

  return newPassword;
}

// Displays the value next to the range, then calls writePassword
function showLength() {
  rangeDisplay.textContent = lengthRange.value + " characters";
}

// Copies the text from the read only password text area to the user's clipboard
function copyPassword() {
  // Select text
  passwordText.select();
  passwordText.setSelectionRange(0, 99999); /*For mobile devices*/
  document.execCommand("copy");
}

// Checks whether two strings have any characters in common and returns a boolean
function commonChars(a, b){
  if(a.length > b.length) {
    return commonChars(b, a)
  }

  for (let j = 0; j < b.length; j++) {
    if (a.indexOf(b[j]) != -1) {
      return true
    }
  }
  return false
}


// Event listeners for changes to inputs
lowerCaseCheck.addEventListener("click", writePassword);
upperCaseCheck.addEventListener("click", writePassword);
numericCheck.addEventListener("click", writePassword);
specialCheck.addEventListener("click", writePassword);
lengthRange.addEventListener("change", writePassword);
confusingCheck.addEventListener("click", writePassword);

// Event listeners for buttons
copyButton.addEventListener("click", copyPassword);
generateButton.addEventListener("click", writePassword);

// Event listener to display range as the input is dragged
lengthRange.addEventListener("input", showLength);