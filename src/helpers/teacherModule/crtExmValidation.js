import { addToAllErr } from "../../redux/slices/teacherSlice";

export const valCreateExm = (QusData, dispatch, allErrors, name, value) => {

    let isValid = true;

    if (name) {
        if (!value) {
            dispatch(addToAllErr({ [name]: " This field required." }));
            isValid = false;
        } else {
            dispatch(addToAllErr({ [name]: "" }));
            isValid = false;
        }
        return 1;
    }

    for (let field in QusData[0]) {
        if (typeof (QusData[0]?.[field]) === 'string') {
            if (QusData[0]?.[field] === '') {
                dispatch(addToAllErr({ [field]: " This field required." }));
                isValid = false;
            }
        } else if (typeof (QusData[0]?.[field]) !== 'string') {
            const optArray = [...(QusData[0]?.[field])];
            optArray.forEach((ele, index) => {
                if (ele === '') {
                    isValid = false;
                    dispatch(addToAllErr({ [`opt-${index}`]: " This field required." }));
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
            if (typeof (examDataObj[field]) === 'string') {
                if (!examDataObj[field]) {
                    validData = false;
                    dispatch(addToAllErr({ ['Subject']: `Subject field is required` }));
                }
            } else {
                if (!(examDataObj[field].filter((ele) => ele).length)) {
                    validData = false;
                    dispatch(addToAllErr({ ['Notes']: `Notes field is required` }));
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
}