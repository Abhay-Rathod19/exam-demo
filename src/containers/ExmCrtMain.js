import { useEffect } from "react";
import { CreateExam } from "../components/CreateExam";
import { createExam } from "../helpers/teacherModule/teacherActions";
import { removeAllErr } from "../redux/slices/teacherSlice";
import { useDispatch } from "react-redux";

export const ExmCrtMain = () => {
  const data = [
    {
      options: ["", "", "", ""],
      question: "",
      answer: "",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllErr());
  }, []);

  return (
    <>
      <CreateExam data={data} exmAction={createExam} />
    </>
  );
};
