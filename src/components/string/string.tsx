import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { stateCircle, swap } from "./utils";
import styles from './string.module.css'
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [arrReverse, setArrReverse] = useState<Array<string>>([])
  const [step, setStep] = useState<number>(0)

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value.trim()
    setInput(string)
  }

  const reverseString = async (string: string): Promise<string[]> => {
    const arr = string.split('')
    let end = arr.length

    setStep(0)
    setInProgress(true)
    setArrReverse([...arr])
    await delay(SHORT_DELAY_IN_MS)

    for (let i = 0; i < Math.floor(end / 2); i++) {
      swap(arr, i, end - 1)
      setStep(i => i + 1)
      setArrReverse([...arr])
      await delay(500)
    }

    setStep(i => i + 1)
    setInProgress(false)

    return arr
  }

  const handleClick = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    reverseString(input)
    setInput('')
  }

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.layout} onSubmit={handleClick} data-cy='form'>
        <Input
          data-cy='input'
          isLimitText={true}
          maxLength={11}
          value={input}
          onChange={handleChange}
          disabled={inProgress}
        />
        <Button
          data-cy='submit'
          text='Развернуть'
          type='submit'
          disabled={!input}
          isLoader={inProgress}
        />
      </form>
      <div className={styles.list}>
        {arrReverse.map((letter: string, index: number) => {
          return (
            <Circle
              key={index}
              letter={letter}
              index={index + 1}
              state={stateCircle(step, index, arrReverse)}
            />
          )
        })}
      </div>
    </SolutionLayout>
  );
};
