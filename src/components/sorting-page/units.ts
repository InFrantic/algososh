import { Dispatch, SetStateAction } from 'react'
import { ElementStates } from '../../types/element-states'

export function randomArr() {
	const min = 0
	const max = 100
	const minLen = 3
	const maxLen = 17
	let res = []
	for (let i = minLen; i < maxLen; i++) {
		res.push({ item: randomInteger(min, max), state: ElementStates.Default })
	}
	return res
}

function randomInteger(min: number, max: number) {
	let rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand)
	return rand
}
export type TInProgress = {
	ascending: boolean
	descending: boolean
}

export type TNewArr = {
	item: number
	state: ElementStates
}
const swap = <T>(strArr: T[], i: number, j: number): void => {
	[strArr[i], strArr[j]] = [strArr[j], strArr[i]]
}
const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

const delaySort = async (
	arr: TNewArr[],
	setArr: Dispatch<SetStateAction<TNewArr[]>>,
	wait: number,
) => {
	setArr([...arr])
	await delay(wait)
}

export const bubbleSort = async (
	isAscending: boolean,
	arr: TNewArr[],
	setArr: Dispatch<SetStateAction<TNewArr[]>>,
	wait: number,
) => {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let z = 0; z < arr.length - 1 - i; z++) {
			arr[z].state = ElementStates.Changing
			arr[z + 1].state = ElementStates.Changing
			await delaySort(arr, setArr, wait)
			if (isAscending) {
				if (arr[z].item > arr[z + 1].item) {
					swap(arr, z, z + 1)
					await delaySort(arr, setArr, wait)
				}
			} else {
				if (arr[z].item < arr[z + 1].item) {
					swap(arr, z, z + 1)
					await delaySort(arr, setArr, wait)
				}
			}
			arr[z].state = ElementStates.Default
			arr[z + 1].state = ElementStates.Default
		}
		arr[arr.length - i - 1].state = ElementStates.Modified
		await delaySort(arr, setArr, wait)
	}
	if (arr.length) arr[0].state = ElementStates.Modified
	await delaySort(arr, setArr, wait)
}

export const selectionSort = async (
	isAscending: boolean,
	arr: TNewArr[],
	setArr: Dispatch<SetStateAction<TNewArr[]>>,
	wait: number,
) => {
	for (let i = 0; i < arr.length; i++) {
		let maxInd = i
		arr[maxInd].state = ElementStates.Changing
		setArr([...arr])
		for (let z = i + 1; z < arr.length; z++) {
			arr[z].state = ElementStates.Changing
			await delaySort(arr, setArr, wait)
			if (isAscending) {
				if (arr[maxInd].item > arr[z].item) maxInd = z
			} else {
				if (arr[maxInd].item < arr[z].item) maxInd = z
			}
			arr[z].state = ElementStates.Default
			await delaySort(arr, setArr, wait)
		}
		swap(arr, i, maxInd)
		arr[maxInd].state = ElementStates.Default
		arr[i].state = ElementStates.Modified
		await delaySort(arr, setArr, wait)
	}
}