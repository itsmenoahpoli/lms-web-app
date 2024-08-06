import React from "react";
import { Form, Input, Select, Card, Button } from "antd";
import {
  IoPencilOutline,
  IoPencilSharp,
  IoTrashOutline,
} from "react-icons/io5";
import { getPopupContainer } from "@/utils/select.util";
import { QuizsesService, LecturesService } from "@/services";
import { Lecture, LectureQuizQuestion, type LectureQuiz } from "@/types/models";
import { set } from "react-hook-form";

const statusOptions = [
  {
    value: 1,
    label: "Published",
  },
  {
    value: 0,
    label: "Draft",
  },
];

const submissionStatusOptions = [
  {
    value: 1,
    label: "Open",
  },
  {
    value: 0,
    label: "Closed",
  },
];

export const LectureQuizForm: React.FC<{
  type: "add" | "update";
  data?: LectureQuiz;
}> = (props) => {
  const [lectures, setLectures] = React.useState<Lecture[]>([]);
  const [questions, setQuestions] = React.useState<LectureQuizQuestion[]>([]);

  const initialValues: LectureQuiz | undefined = React.useMemo(() => {
    return props.data ? { ...props.data } : undefined;
  }, [props.data]);

  const handleFormSubmit = async (formData: LectureQuiz) => {
    if (props.type === "update" && props.data?.id) {
      return await QuizsesService.updateQuiz(props.data?.id, {
        ...formData,
      });
    }

    return await QuizsesService.createQuiz({
      ...formData,
    });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: "",
        answer: "",
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    console.log(index);
    const questionsCopy = [...questions];

    questionsCopy.splice(index, 1);
    setQuestions(questionsCopy);
  };

  const handleQuestionInput = (
    key: keyof LectureQuizQuestion,
    value: string,
    index: number
  ) => {
    console.log(key, value, index);
    const questionsCopy = [...questions];

    questionsCopy[index] = {
      ...questionsCopy[index],
      [key]: value,
    };

    setQuestions(questionsCopy);
  };

  const fetchLecturesList = async () => {
    await LecturesService.getLecturesList().then((result) => {
      const mappedResult = result.map((r: Lecture) => ({
        value: r.id,
        label: r.name,
      }));

      setLectures(mappedResult);
    });
  };

  React.useEffect(() => {
    fetchLecturesList();
  }, []);

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFormSubmit}
      requiredMark
    >
      <Form.Item label="Lecture" name="lecture_id">
        <Select
          options={lectures}
          getPopupContainer={getPopupContainer}
          placeholder="Select lecture"
        />
      </Form.Item>

      <Form.Item label="Title" name="title">
        <Input placeholder="Enter quiz name" required />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea
          className="!h-[100px]"
          placeholder="Enter quiz description"
          required
        />
      </Form.Item>

      <Form.Item label="Status" name="is_posted">
        <Select
          options={submissionStatusOptions}
          getPopupContainer={getPopupContainer}
        />
      </Form.Item>

      <Form.Item label="Open for submission?" name="is_submission_open">
        <Select options={statusOptions} getPopupContainer={getPopupContainer} />
      </Form.Item>

      <Form.Item label="Questions">
        <Button className="text-xs mb-3" onClick={addQuestion}>
          ADD
        </Button>

        <div className="bg-slate-100 rounded-md p-3">
          <div className="grid grid-cols-2 gap-4">
            {questions.length ? (
              questions.map((question, idx) => (
                <Card
                  className="bg-slate-50 border border-gray-200 relative"
                  key={`quiz-question-${idx}`}
                >
                  <div className="flex flex-row gap-x-3 absolute top-2 right-2">
                    <Button type="link" className="p-0" title="Edit">
                      <IoPencilSharp size={18} />
                    </Button>
                    <Button
                      type="link"
                      className="p-0"
                      title="Delete"
                      onClick={() => removeQuestion(idx)}
                    >
                      <IoTrashOutline color="red" size={18} />
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 font-medium">Question</p>

                  <div className="flex flex-col gap-y-2 mt-3">
                    <Input.TextArea
                      className="!h-[85px]"
                      onChange={(e) =>
                        handleQuestionInput("title", e.target.value, idx)
                      }
                      placeholder="Enter question"
                    />
                    <Input
                      className="!h-[35px]"
                      onChange={(e) =>
                        handleQuestionInput("title", e.target.value, idx)
                      }
                      placeholder="Enter answer"
                    />
                  </div>
                </Card>
              ))
            ) : (
              <small className="text-red-700">No questions added</small>
            )}
          </div>
        </div>
      </Form.Item>

      <Button htmlType="submit" type="primary" size="large" className="text-sm">
        {props.type === "add" ? "Upload Quiz" : "Update Quiz"}
      </Button>
    </Form>
  );
};
