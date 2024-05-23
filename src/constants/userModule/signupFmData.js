const listDataArray = ["Student", "Teacher"];

export const signUpFormInput = [
    {
        inputType: "input",
        fieldType: "text",
        name: "userName",
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
        defaultSelValue: "Student",
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