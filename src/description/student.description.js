export const STUDENT = "student";

export const studSideBarOpts = [
  {
    label: "All Exam",
    link: "/dashboard/student/allExam",
  },
  {
    label: "My profile",
    link: "/dashboard/student/myProfile",
  },
];

export const editProfileForm = [
  {
    inputType: "input",
    fieldType: "text",
    name: "name",
    label: "Enter your new name to update : ",
  },
  {
    inputType: "button",
    btnValue: "Update Name",
    btnType: "Submit",
    styles: { my: "5px", width: "400px" },
  },
];

export const studProfData = [
  {
    label: "Name",
    id: "name",
  },
  {
    label: "Email",
    id: "email",
  },
  {
    label: "Id",
    id: "_id",
  },
  {
    label: "Role",
    id: "role",
  },
];
