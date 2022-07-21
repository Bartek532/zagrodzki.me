import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";

import { Input } from "components/common/input/Input";
import CrossIcon from "public/svg/cross.svg";
import PlusIcon from "public/svg/plus.svg";

import styles from "./quizDialog.module.scss";

type QuizDialogProps = {
  readonly correctAnswers: (string | number)[];
  readonly scoreMessages: { score: number; message: string }[];
};

type Answer = {
  readonly id: number;
  readonly text: string;
  readonly status: "unchecked" | "correct" | "incorrect";
};

const AnswerItem = ({ answer, onDeleteAnswer }: { answer: Answer; onDeleteAnswer: any }) => {
  return (
    <li>
      <button className={clsx(styles.answer, styles[answer.status])} onClick={onDeleteAnswer}>
        {answer.status === "unchecked" ? (
          <div className={styles.close}>
            <CrossIcon />
          </div>
        ) : null}
        <span className={styles.text}>{answer.text}</span>
      </button>
    </li>
  );
};

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

  const isNotInAnswers = (inputType: string) => {
    return inputType.trim() && !answers.find((answer) => answer.text === inputType);
  };

  const handleFormSubmit = ({ inputType }: { [key: string]: string }) => {
    const givenAnswer = {
      id: answers.length + 1,
      text: inputType.trim(),
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
    if (answers.length === 0) {
      setIsAnswersChecked(false);
    }
  }, [answers]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          type="text"
          placeholder="Type your answer here..."
          isError={!!errors.inputType}
          {...register("inputType", {
            required: true,
            validate: isNotInAnswers,
          })}
          disabled={answers.length >= correctAnswers.length || isAnswersChecked}
        >
          <span className="sr-only">input type</span>
        </Input>
        <button className={styles.btn} disabled={answers.length >= correctAnswers.length || isAnswersChecked}>
          Add <PlusIcon />
        </button>
      </form>
      <div className={styles.answersWrapper}>
        {answers.length === 0 ? (
          <div className={styles.placeholder}>Your answers will appear here.</div>
        ) : (
          <ul className={styles.answers}>
            {answers.map((answer) => (
              <AnswerItem key={answer.id} answer={answer} onDeleteAnswer={() => handleDeleteAnswer(answer.id)} />
            ))}
          </ul>
        )}
        <div className={clsx(styles.result, { [styles.active]: isResultMessageShown })}>
          <strong>Your result is {score.toFixed(0)}%</strong>
          <div className={styles.message}>
            {scoreMessages.find((scoreMessage) => scoreMessage.score <= score)?.message}
          </div>
        </div>
        {isAnswersChecked ? (
          <button
            className={styles.resultBtn}
            onClick={() => (isResultMessageShown ? setIsResultMessageShown(false) : setIsResultMessageShown(true))}
          >
            {isResultMessageShown ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
      <div className={styles.info}>
        <div className={styles.buttons}>
          <button
            className={clsx(styles.button, styles.check)}
            onClick={handleCheckAnswers}
            disabled={answers.length === 0 || isAnswersChecked}
          >
            Check
          </button>
          <button
            className={clsx(styles.button, styles.reset)}
            onClick={handleResetAnswers}
            disabled={answers.length === 0}
          >
            Reset
          </button>
        </div>
        <div className={styles.counter}>
          {answers.length}/{correctAnswers.length}
        </div>
      </div>
    </>
  );
});

QuizDialog.displayName = "QuizDialog";
