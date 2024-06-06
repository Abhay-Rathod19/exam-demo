import { addToAllErr } from "../../redux/slices/teacherSlice";
import { areEqual } from "../../utils/javaScript";

export const valCreateExm = (QusData, dispatch, allErrors, name, value) => {
  let isValid = true;

  if (name) {
    if (!value?.trim()) {
      dispatch(addToAllErr({ [name]: " This field is required" }));
      isValid = false;
    }
    return 1;
  }

  for (let field in QusData[0]) {
    if (areEqual(typeof QusData[0]?.[field], "string")) {
      if (areEqual(QusData[0]?.[field], "")) {
        dispatch(addToAllErr({ [field]: " This field is required" }));
        isValid = false;
      }
    } else if (typeof QusData[0]?.[field] !== "string") {
      const optArray = [...QusData[0]?.[field]];
      optArray.forEach((ele, index) => {
        if (areEqual(ele, "")) {
          isValid = false;
          dispatch(
            addToAllErr({ [`opt-${index}`]: " This field is required" })
          );
        }
      });
    }
  }
  return isValid;
};

export const valCrtExmForm = (name, value, examDataObj, dispatch) => {
  let validData = true;

  if (examDataObj) {
    for (let field in examDataObj) {
      if (areEqual(typeof examDataObj[field], "undefined")) {
        if (!examDataObj[field]) {
          console.log(`Form sub req to not`);
          validData = false;
          dispatch(addToAllErr({ ["Subject"]: `Subject field is required` }));
        }
      } else {
        if (Array.isArray(examDataObj[field])) {
          if (!examDataObj[field]?.filter((ele) => ele)?.length) {
            validData = false;
            dispatch(addToAllErr({ ["Notes"]: `Notes field is required` }));
          }
        }
      }
    }
    return validData;
  } else {
    if (!value) {
      dispatch(addToAllErr({ [name]: `${name} field is required` }));
      validData = false;
    } else {
      dispatch(addToAllErr({ [name]: `` }));
    }
    return validData;
  }
};
