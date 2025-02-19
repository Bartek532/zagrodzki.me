"use client";

import { Plus, X } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { onPromise } from "@/utils/functions";

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
      className={cn(
        "group relative rounded-full border-0 px-3.5 py-1.5 text-sm transition-colors duration-100",
        answer.status === "unchecked" && "bg-background cursor-pointer",
        answer.status === "correct" && "bg-success text-success-foreground cursor-default",
        answer.status === "incorrect" &&
          "bg-destructive text-destructive-foreground cursor-default",
      )}
      onClick={onDeleteAnswer}
    >
      {answer.status === "unchecked" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-100 group-hover:opacity-100">
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

export const QuizDialog = ({ correctAnswers, scoreMessages }: QuizDialogProps) => {
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
        className="relative mt-6 flex w-full items-center justify-center gap-2 sm:mt-8 lg:mt-10"
        onSubmit={onPromise(handleSubmit(handleFormSubmit))}
      >
        <Input
          type="text"
          placeholder="Type your answer here..."
          className={cn(errors.inputType && "border-destructive focus-visible:ring-destructive")}
          {...register("inputType", {
            required: true,
            validate: isNotInAnswers,
          })}
          disabled={answers.length >= correctAnswers.length || isAnswersChecked}
          aria-label="input type"
        />
        <button
          className="bg-sky hover:bg-sky/90 flex cursor-pointer items-center gap-2 self-stretch rounded-lg border-0 px-5 text-sm text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={answers.length >= correctAnswers.length || isAnswersChecked}
        >
          Add <Plus className="size-4" />
        </button>
      </form>
      <div
        className={cn(
          "border-input bg-card relative mt-4 flex min-h-[200px] w-full justify-center rounded-lg border px-4 py-3 text-sm",
          answers.length === 0 ? "items-center" : "items-start",
        )}
      >
        {answers.length === 0 ? (
          <div className="flex items-center justify-center">Your answers will appear here.</div>
        ) : (
          <ul className="relative z-30 m-0 flex h-full w-full list-none flex-wrap items-start justify-start gap-1.5 p-0">
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
          className={cn(
            "absolute top-1/2 left-1/2 z-20 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[2px] rounded-[15px] p-[30px] text-center text-[16px] opacity-0 backdrop-blur-md transition-opacity duration-150",
            isResultMessageShown && "z-40 opacity-100",
          )}
        >
          <strong>Your result is {score.toFixed(0)}%</strong>
          <div>{scoreMessages.find((scoreMessage) => scoreMessage.score <= score)?.message}</div>
        </div>
        {isAnswersChecked ? (
          <button
            className="absolute right-[10px] bottom-[7px] z-50 cursor-pointer border-0 bg-transparent text-gray-400 underline hover:no-underline"
            onClick={() =>
              isResultMessageShown ? setIsResultMessageShown(false) : setIsResultMessageShown(true)
            }
          >
            {isResultMessageShown ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
      <div className="mt-4 flex w-full items-start justify-between px-1">
        <div className="flex items-center gap-2.5">
          <Button
            className={cn(
              "cursor-pointer rounded-full border-0 px-5 py-2 text-sm",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "bg-success text-success-foreground hover:bg-success/90",
            )}
            onClick={handleCheckAnswers}
            disabled={!answers.length || isAnswersChecked}
          >
            Check
          </Button>
          <Button
            className={cn(
              "cursor-pointer rounded-full border-0 px-5 py-2 text-sm",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            )}
            onClick={handleResetAnswers}
            disabled={!answers.length}
          >
            Reset
          </Button>
        </div>
        <div className="text-muted-foreground text-sm">
          {answers.length}/{correctAnswers.length}
        </div>
      </div>
    </>
  );
};
