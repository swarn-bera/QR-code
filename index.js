/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        message: "Type in your URL: ",
        name:  "URL"
    }
])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("QR_img.png"));

    fs.writeFile("URL.txt", url , (err) => {
        if(err) throw err;
        console.log("QR code saved to QR_img.png and user input saved to userInput.txt");
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

