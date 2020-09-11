// Assignment Code
var generateBtn = document.querySelector("#generate");

// Create strings of character banks to draw from
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numericChars = "0123456789";
// I can't figure out how to include " in the specialChars string in a less clumsy way...
var specialChars = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
specialChars += '"';

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Prompt password criteria, then generate a password based on answers
function generatePassword() {
  // Prompt the user for password criteria
  let passwordLength = 0;
  while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = prompt("How many characters long should the password to be?", "Enter a number between 8 and 128");
  } 
  console.log("--------");
  console.log(passwordLength, "characters long");
  let useLowerCase = confirm("Should the password include lowercase characters? Click 'okay' for yes, or 'cancel' for no.");
  let useUpperCase = confirm("Should the password include uppercase characters? Click 'okay' for yes, or 'cancel' for no.");
  let useNumeric = confirm("Should the password include numeric characters? Click 'okay' for yes, or 'cancel' for no.");
  let useSpecial = confirm("Should the password include special characters? Click 'okay' for yes, or 'cancel' for no.");

  // Ensure at least one character type is selected
  while (useLowerCase === false && 
         useUpperCase == false && 
         useNumeric == false &&
         useSpecial == false) {
    console.log("No character types included");
    alert("You must include at least one character type. Let's try this again");
    useLowerCase = confirm("Should the password include lowercase characters? Click 'okay' for yes, or 'cancel' for no.");
    useUpperCase = confirm("Should the password include uppercase characters? Click 'okay' for yes, or 'cancel' for no.");
    useNumeric = confirm("Should the password include numeric characters? Click 'okay' for yes, or 'cancel' for no.");
    useSpecial = confirm("Should the password include special characters? Click 'okay' for yes, or 'cancel' for no.");
  }

  console.log("Lowercase?", useLowerCase);
  console.log("Uppercase?", useUpperCase);
  console.log("Numeric?", useNumeric);
  console.log("Special?", useSpecial);

  let possibleChars = "";
  if(useLowerCase) { possibleChars += lowerCaseChars; }
  if(useUpperCase) { possibleChars += upperCaseChars; }
  if(useNumeric) { possibleChars += numericChars; }
  if(useSpecial) { possibleChars += specialChars; }

  // For now, return a string of all possible characters
  return possibleChars;
}