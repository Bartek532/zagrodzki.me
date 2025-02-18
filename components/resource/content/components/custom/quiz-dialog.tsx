"use client";

import clsx from "clsx";
import { Plus, X } from "lucide-react";
import { memo, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { Input } from "components/ui/input";
import { onPromise } from "utils/functions";

interface QuizDialogProps {
  readonly correctAnswers: (string | number)[];
  readonly scoreMessages: { score: number; message: string }[];
}

interface Answer {
  readonly id: number;
  readonly text: string;
  readonly status: "unchecked" | "correct" | "incorrect";
}

const AnswerItem = ({ answer, onDeleteAnswer }: { answer: Answer; onDeleteAnswer: () => void }) => (
  <li>
    <button
      className={clsx(
        "text-sm py-1.5 px-3.5 rounded-full border-0 relative group transition-colors duration-100",
        answer.status === "unchecked" && "bg-background cursor-pointer",
        answer.status === "correct" && "bg-success text-success-foreground cursor-default",
        answer.status === "incorrect" &&
          "bg-destructive text-destructive-foreground cursor-default",
      )}
      onClick={onDeleteAnswer}
    >
      {answer.status === "unchecked" && (
        <div className="inset-0 absolute z-10 flex items-center justify-center opacity-0 transition-opacity duration-100 group-hover:opacity-100">
          <X className="size-4" />
        </div>
      )}
      <span
        className={cn({
          "transition-opacity duration-100 group-hover:opacity-0": answer.status === "unchecked",
        })}
      >
        {answer.text}
      </span>
    </button>
  </li>
);

export const QuizDialog = memo<QuizDialogProps>(({ correctAnswers, scoreMessages }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isAnswersChecked, setIsAnswersChecked] = useState(false);
  const [isResultMessageShown, setIsResultMessageShown] = useState(false);
  const [score, setScore] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const isNotInAnswers = (inputType: string) =>
    inputType.trim() && !answers.find((answer) => answer.text === inputType);

  const handleFormSubmit = ({ inputType }: Record<string, string>) => {
    const givenAnswer = {
      id: answers.length + 1,
      text: inputType?.trim() ?? "",
      status: "unchecked" as const,
    };

    setAnswers((answers) => [...answers, givenAnswer]);
    reset();
  };

  const handleDeleteAnswer = (id: number) => {
    const answer = answers.find((answer) => answer.id === id);
    if (answer?.status === "unchecked") {
      setAnswers((answers) => answers.filter((answer) => answer.id !== id));
    }
  };

  const handleCheckAnswers = () => {
    setAnswers((answers) =>
      answers.map((answer) => ({
        ...answer,
        status: correctAnswers.includes(answer.text.toLowerCase().trim()) ? "correct" : "incorrect",
      })),
    );
    setIsAnswersChecked(true);
    reset();

    const totalCorrectAnswersCount = correctAnswers.length;
    const correctProvidedAnswersCount = answers.filter((answer) =>
      correctAnswers.includes(answer.text.toLowerCase()),
    ).length;

    setScore((correctProvidedAnswersCount / totalCorrectAnswersCount) * 100);

    setTimeout(() => {
      setIsResultMessageShown(true);
    }, 500);
  };

  const handleResetAnswers = () => {
    setAnswers([]);
    setIsResultMessageShown(false);
  };

  useEffect(() => {
    if (!answers.length) {
      setIsAnswersChecked(false);
    }
  }, [answers]);

  return (
    <>
      <form
        className="w-full flex items-center gap-2 justify-center relative mt-6 sm:mt-8 lg:mt-10"
        onSubmit={onPromise(handleSubmit(handleFormSubmit))}
      >
        <Input
          type="text"
          placeholder="Type your answer here..."
          className={clsx(errors.inputType && "border-destructive focus-visible:ring-destructive")}
          {...register("inputType", {
            required: true,
            validate: isNotInAnswers,
          })}
          disabled={answers.length >= correctAnswers.length || isAnswersChecked}
          aria-label="input type"
        />
        <button
          className="border-0 cursor-pointer transition-colors duration-200 hover:bg-sky/90 text-sm self-stretch text-white px-5 rounded-lg bg-sky  flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={answers.length >= correctAnswers.length || isAnswersChecked}
        >
          Add <Plus className="size-4" />
        </button>
      </form>
      <div
        className={cn(
          "w-full flex justify-center border border-input bg-card min-h-[200px] py-3 px-4 text-sm rounded-lg mt-4 relative",
          answers.length === 0 ? "items-center" : "items-start",
        )}
      >
        {answers.length === 0 ? (
          <div className="flex items-center justify-center">Your answers will appear here.</div>
        ) : (
          <ul className="w-full h-full flex flex-wrap items-start justify-start list-none p-0 m-0 gap-1.5 relative z-30">
            {answers.map((answer) => (
              <AnswerItem
                key={answer.id}
                answer={answer}
                onDeleteAnswer={() => handleDeleteAnswer(answer.id)}
              />
            ))}
          </ul>
        )}
        <div
          className={clsx(
            "w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-[2px] text-[16px] rounded-[15px] backdrop-blur-md opacity-0 transition-opacity duration-150 text-center p-[30px] z-20",
            isResultMessageShown && "opacity-100 z-40",
          )}
        >
          <strong>Your result is {score.toFixed(0)}%</strong>
          <div>{scoreMessages.find((scoreMessage) => scoreMessage.score <= score)?.message}</div>
        </div>
        {isAnswersChecked ? (
          <button
            className="absolute right-[10px] bottom-[7px] border-0 bg-transparent text-gray-400 underline cursor-pointer z-50 hover:no-underline"
            onClick={() =>
              isResultMessageShown ? setIsResultMessageShown(false) : setIsResultMessageShown(true)
            }
          >
            {isResultMessageShown ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
      <div className="w-full flex items-start justify-between mt-4 px-1">
        <div className="flex items-center gap-2.5">
          <Button
            className={clsx(
              "border-0 cursor-pointer text-sm py-2 px-5 rounded-full",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "bg-success text-success-foreground hover:bg-success/90",
            )}
            onClick={handleCheckAnswers}
            disabled={!answers.length || isAnswersChecked}
          >
            Check
          </Button>
          <Button
            className={clsx(
              "border-0 cursor-pointer text-sm py-2 px-5 rounded-full",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            )}
            onClick={handleResetAnswers}
            disabled={!answers.length}
          >
            Reset
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {answers.length}/{correctAnswers.length}
        </div>
      </div>
    </>
  );
});

QuizDialog.displayName = "QuizDialog";
