import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetLoader } from "../redux/slices/apiSlice";
import { CreateExam } from "../components/CreateExam";
import { createExam } from "../helpers/teacherModule/teacherActions";
import { removeAllErr } from "../redux/slices/teacherSlice";

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
    dispatch(resetLoader());
    dispatch(removeAllErr());
  }, []);

  return (
    <>
      <CreateExam data={data} exmAction={createExam} />
    </>
  );
};
