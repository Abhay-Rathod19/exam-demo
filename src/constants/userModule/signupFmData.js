const listDataArray = ["-- Select your role --", "Student", "Teacher"];

export const signUpFormInput = [
    {
        inputType: "input",
        fieldType: "text",
        name: "name",
        label: "Enter your name : ",
    },
    {
        inputType: "input",
        fieldType: "text",
        name: "email",
        label: "Enter your email : ",
    },
    {
        inputType: "input",
        fieldType: "password",
        name: "password",
        label: "Set your password : ",
    },
    {
        // for select
        inputType: "select",
        listData: listDataArray,
        defaultSelValue: listDataArray[0],
        name: "userRole",
        label: "Select your role : ",
    },
    {
        inputType: "button",
        btnValue: "Sign up",
        btnType: "Submit",
        styles: { my: '25px' }
    }
];