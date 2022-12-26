import { randomColor } from "./random"

export function byRegion(city, region){
	const result = city.region === region
	return result
}

export function byPopulation(city, population, over = true){
	if( over ){
		const result = city.population > population
		return result
	}

	const result = city.population < population
	return result
}

export function byPlateNumber(city, plateNumber){
	const result = city.plateNumber === plateNumber
	return result
}

export function groupBy( data, getValue ){
	const groupedData = data.reduce((prev, curr) => {
		const value = getValue(curr)
		const isInPrev = prev.includes(value)
		if (isInPrev) return prev
		prev.push(value)
		return prev
	}, [])

	return groupedData
}