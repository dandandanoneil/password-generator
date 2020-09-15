// Assignment Code
var generateBtn = document.querySelector("#generate");

// Create strings of character banks to draw from
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numericChars = "0123456789";
// Is there a less clumsy way to include " in the specialChars string?
const specialChars = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"';

// Write password to the #password input
function writePassword() {
  // Prompt the user for password length
  let passwordLength = parseInt(prompt("How many characters long should the password be?", "Enter a number between 8 and 128"), 10);
  
  // Ensure a valid length was entered
  while (passwordLength < 8 || passwordLength > 128 || passwordLength == "NaN") {
    passwordLength = parseInt(prompt("You must enter a password length between 8 and 128 characters.", "Enter a number between 8 and 128"), 10);
  }
  
  // Prompt the user for password character criteria
  let useLowerCase = confirm("Should the password include lowercase characters? \r\nClick 'OK' for yes, or 'Cancel' for no.");
  let useUpperCase = confirm("Should the password include uppercase characters? \r\nClick 'OK' for yes, or 'Cancel' for no.");
  let useNumeric = confirm("Should the password include numeric characters? \r\nClick 'OK' for yes, or 'Cancel' for no.");
  let useSpecial = confirm("Should the password include special characters (not including spaces)? \r\nClick 'OK' for yes, or 'Cancel' for no.");

  // Ensure at least one character type is selected
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

  var password = generatePassword(passwordLength, useLowerCase, useUpperCase, useNumeric, useSpecial);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Prompt password criteria, and return a password based on user inputs
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

  // NEXT STEPS:
  // Add code to ensure newPassword includes at least one of each included character type
  //     (four if statements, and if that type was included and is missing, I replace a specific character in newPassword with a character of that type?)
  //     (write a function that takes in two strings, newPassword and a character list, and returned whether they had any characters in common?)

  // Test password criteria check by logging the initially generated password first
  // console.log(newPassword);

  // if(useLow && !commonChars(newPassword, lowerCaseChars)) {
  //   console.log("Missing lowercase characters");
  // }

  // if(useUpp && !commonChars(newPassword, upperCaseChars)) {
  //   console.log("Missing uppercase characters");
  // }

  // if(useNum && !commonChars(newPassword, numericChars)) {
  //   console.log("Missing numeric characters");
  // }

  // if(useSpe && !commonChars(newPassword, specialChars)) {
  //   console.log("Missing special characters");
  // }

  // // Test password criteria check by logging the updated password
  // console.log(newPassword);

  return newPassword;
}

// // Function that checks whether pw (the randomly generated password) includes any of the characters from a string (the list of characters in a certain type), and returns a boolean
// function commonChars(pw, chars){
//   if(pw.length > chars.length) {
//     return commonChars(chars, pw)
//   }

//   for (let index = 0; index < chars.length; index++) {
//     if (pw.indexOf(chars[index]) != -1) {
//       return true
//     }
//   }
//   return false
// }