// Identify and name key elements
const generateBtn = document.querySelector("#generate");
const passwordText = document.querySelector("#password");

// Create strings of character banks to draw from
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numericChars = "0123456789";
const specialChars = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~\"\\";

// Generate a password based on user prompts, ensure it meets criteria, then write it to the #password input
function writePassword() {
  // Prompt the user for password length & ensure a valid length was entered
  // (the userInput variable allows the user to click "cancel" and get out at this point)
  let userInput = prompt("How many characters long should the password be?", "Enter a number between 8 and 128");
  if (userInput == null) { return; }
  let passwordLength = parseInt(userInput, 10);
  
  while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    userInput = prompt("You must enter a length between 8 and 128 in number form.", "Enter a number between 8 and 128");
    if (userInput == null) { return; }
    passwordLength = parseInt(userInput, 10);
  }
  
  // Prompt the user for password character criteria
  let useLowerCase = confirm("Should the password include lowercase characters? \r\nClick 'OK' for yes, or 'Cancel' for no.");
  let useUpperCase = confirm("Should the password include uppercase characters? \r\nClick 'OK' for yes, or 'Cancel' for no.");
  let useNumeric = confirm("Should the password include numeric characters? \r\nClick 'OK' for yes, or 'Cancel' for no.");
  let useSpecial = confirm("Should the password include special characters (not including spaces)? \r\nClick 'OK' for yes, or 'Cancel' for no.");

  // If at least one character type is selected, identify the problem for the user and re-prompt each criteria
  while (useLowerCase === false && 
         useUpperCase === false && 
         useNumeric === false &&
         useSpecial === false) {
    alert("You must include at least one character type. \r\n \r\nLet's try this again");
    useLowerCase = confirm("Should the password include lowercase characters? \r\nClick 'okay' for yes, or 'cancel' for no.");
    useUpperCase = confirm("Should the password include uppercase characters? \r\nClick 'okay' for yes, or 'cancel' for no.");
    useNumeric = confirm("Should the password include numeric characters? \r\nClick 'okay' for yes, or 'cancel' for no.");
    useSpecial = confirm("Should the password include special characters? \r\nClick 'okay' for yes, or 'cancel' for no.");
  }

  // Create a variable ("isValid") to represent whether the generated password matches criteria
  let isValid = false;
  while (!isValid) {
    // Generate a new password with the prompted criteria
    let password = generatePassword(passwordLength, useLowerCase, useUpperCase, useNumeric, useSpecial);
    // If the new value of password matches all the criteria, write it in the #password element. If it doesn't, keep generating new passowrds until one does.
    if ((useLowerCase === commonChars(password, lowerCaseChars)) || 
    (useUpperCase === commonChars(password, upperCaseChars)) || 
    (useNumeric === commonChars(password, numericChars)) || 
    (useSpecial === commonChars(password, specialChars)) ){
      isValid = true;
      passwordText.value = password;
    } else {
      isValid = false;
    }
  }

}


// Event listener for generate button
generateBtn.addEventListener("click", writePassword);


// Generate a random password from the given criteria.
// Arguments:
//  - 'length' is the password length - a number between 8 and 128
//  - 'useLow' is a boolean telling us whether to include lower case letters
//  - 'useUpp' is a boolean telling us whether to include upper case letters
//  - 'useNum' is a boolean telling us whether to include numeric characters
//  - 'useSpe' is a boolean telling us whether to include special characters letters
function generatePassword(length, useLow, useUpp, useNum, useSpe) {
  // Create a string of all possible characters to choose from
  let possibleChars = "";
  if(useLow) { possibleChars += lowerCaseChars; }
  if(useUpp) { possibleChars += upperCaseChars; }
  if(useNum) { possibleChars += numericChars; }
  if(useSpe) { possibleChars += specialChars; }

  let newPassword = "";
  for (let i = 0; i < length; i++) {
    // Pick a random location in the string, extract the character at that location, add it to the password
    let randomLoc = Math.floor(Math.random()*possibleChars.length);
    let randomChar = possibleChars.charAt(randomLoc);
    newPassword += randomChar;
  }

  return newPassword;
}


// This function will return a boolean representing whether the two strings have any characters in common. It will be used to test whether the generated password includes a character from each requested character type.
function commonChars(pw, chars){
  if(pw.length > chars.length) {
    return commonChars(chars, pw)
  }

  for (let index = 0; index < chars.length; index++) {
    if (pw.indexOf(chars[index]) != -1) {
      return true
    }
  }
  return false
}