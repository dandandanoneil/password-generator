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
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Prompt password criteria, and return a password based on user inputs
function generatePassword() {
  // Prompt the user for password criteria
  let passwordLength = 0;
  while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = prompt("How many characters long should the password be?", "Enter a number between 8 and 128");
  } 
  
  // Log the password length so I know it works this far
  // console.log("--------");
  // console.log(passwordLength, "characters long");
  
  let useLowerCase = confirm("Should the password include lowercase characters? Click 'okay' for yes, or 'cancel' for no.");
  let useUpperCase = confirm("Should the password include uppercase characters? Click 'okay' for yes, or 'cancel' for no.");
  let useNumeric = confirm("Should the password include numeric characters? Click 'okay' for yes, or 'cancel' for no.");
  let useSpecial = confirm("Should the password include special characters (not included spaces)? Click 'okay' for yes, or 'cancel' for no.");

  // Ensure at least one character type is selected
  while (useLowerCase === false && 
         useUpperCase === false && 
         useNumeric === false &&
         useSpecial === false) {
    // console.log("No character types included");
    alert("You must include at least one character type. Let's try this again");
    useLowerCase = confirm("Should the password include lowercase characters? Click 'okay' for yes, or 'cancel' for no.");
    useUpperCase = confirm("Should the password include uppercase characters? Click 'okay' for yes, or 'cancel' for no.");
    useNumeric = confirm("Should the password include numeric characters? Click 'okay' for yes, or 'cancel' for no.");
    useSpecial = confirm("Should the password include special characters? Click 'okay' for yes, or 'cancel' for no.");
  }

  // Log the collected password criteria so I know it works this far
  // console.log("Lowercase?", useLowerCase);
  // console.log("Uppercase?", useUpperCase);
  // console.log("Numeric?", useNumeric);
  // console.log("Special?", useSpecial);

  // Create a string of all possible characters to choose from
  let possibleChars = "";
  if(useLowerCase) { possibleChars += lowerCaseChars; }
  if(useUpperCase) { possibleChars += upperCaseChars; }
  if(useNumeric) { possibleChars += numericChars; }
  if(useSpecial) { possibleChars += specialChars; }

  // Log the string of all possible characters so I know it works this far
  // console.log(possibleChars);

  let newPassword = "";
  for (let i = 0; i < passwordLength; i++) {
    // Pick a random location in the string to pull from, extract the character at that location, and add it to the password
    let randomLoc = Math.floor(Math.random()*possibleChars.length);
    let randomChar = possibleChars.charAt(randomLoc);
    newPassword += randomChar;
  }

  // NEXT STEP:
  // Add code to ensure newPassword includes at least one of each included character type
  //     (four if statements, and if that type was included and is missing, I replace a specific character in newPassword with a character of that type?)
  //     (write a function that takes in two strings, newPassword and a character list, and returned whether they had any characters in common?)

  return newPassword;
}