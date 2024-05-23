
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
        styles: { my: '15px' }
    },
    {
        inputType: "additionalAction",
        label: "Forgot Password",
        styles: { color: "blue", cursor: "pointer" },
        onClick: () => console.log("Forget password."),
    }
];