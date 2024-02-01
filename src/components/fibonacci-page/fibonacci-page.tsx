import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './fibonacci.module.css'
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {

  const [input, setInput] = useState<string | number>('')
	const [inProgress, setInProgress] = useState<boolean>(false)
  const [arr, setArr] = useState<Array<number>>()

  const getFibNumbers = (count: number) => {
    const fibNumbers = [1, 1]
    for (let i = 2; i <= count; i++) {
      fibNumbers.push(fibNumbers[i - 2] + fibNumbers[i - 1])
    }
    return fibNumbers
  }

	const fibonacci = async (input: number) => {
    setInProgress(true)
    const array = getFibNumbers(input)
    for (let i = 0; i <= array.length; i++) {
      await delay(SHORT_DELAY_IN_MS)
      setArr(array.slice(0, i+1))
    }
    setInProgress(false)
  }
  
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const handleClick = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		fibonacci(Number(input))
		setInput('')
	}
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.layout} onSubmit={handleClick} data-cy='form'>
        <Input
          type='number'
          min={0}
          max={19}
          isLimitText={true}
          value={input}
          onChange={handleChange}
          data-cy='input'
        />
        <Button
          data-cy='submit'
          text='Рассчитать'
          type='submit'
          disabled={!input || input > 19 || input < 1}
          isLoader={inProgress}
        ></Button>
      </form>
      <div className={styles.list}>
        {arr &&
          arr.map((value: number, index: number) => {
            return <Circle key={index} letter={`${value}`} index={index} />
          })}
      </div>
    </SolutionLayout>
  );
};
