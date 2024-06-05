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
        styles: { my: '25px', background: "#a952a3" }
    }
];

export const loginFormData = [
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
        label: "Enter your password : ",
    },
    {
        inputType: "button",
        btnValue: "Log in",
        btnType: "Submit",
        styles: { my: '15px', background: "#a952a3" }
    },
    {
        inputType: "additionalAction",
        addActionData: [
            { label: "Sign up", onClickPath: "/signup" },
            { label: "Forgot Password", onClickPath: "/forgetpassword" }
        ],
        styles: {
            color: "#3f1a85", fontWeight: "500", cursor: "pointer", display: "grid"
        },
    },
];