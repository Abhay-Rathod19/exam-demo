import { CreateExam } from "./CreateExam";
import { createExam } from "../helpers/teacherModule/teacherActions";

export const ExmCrtMain = () => {
    const data = [
        {
            options: ["", "", "", ""],
            question: "",
            answer: "",
        },
    ];

    return (
        <>
            <CreateExam data={data} exmAction={createExam} />
        </>
    )
};

