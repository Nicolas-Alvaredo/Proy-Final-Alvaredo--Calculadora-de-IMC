# Body Mass Index (BMI) Calculator Project

This project is a web-based BMI (Body Mass Index) calculator that allows users to input the details of multiple individuals and calculate their BMI. The application dynamically generates input fields based on the number of people specified by the user, calculates BMI for each individual, and displays the results.

## Features

- **Dynamic Form Generation**: The form adapts to the number of people for whom the BMI needs to be calculated.
- **BMI Calculation**: The BMI is calculated using the formula: `BMI = weight / (height * height)`.
- **Result Display**: The BMI and health status (underweight, normal weight, overweight) of each individual is displayed.
- **Local Storage**: The results are saved in the browser's local storage so that they persist even after a page reload.
- **Fetch Global BMI Average**: The application fetches the global average BMI from a JSON file and displays it.
- **Error Handling**: SweetAlert is used to display error messages and success notifications.

