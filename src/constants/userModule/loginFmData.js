
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
        addActionData: [
            { label: "Sign up", onClickPath: "/signup" },
            { label: "Forgot Password", onClickPath: "/forgetpassword" }
        ],
        styles: { color: "blue", cursor: "pointer", display: "grid" },
    },
];