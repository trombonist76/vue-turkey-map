import { randomColor } from "./random"

export function byRegion(city, region){
	if (Array.isArray(region)) {
		const result = region.includes(city.region)
		return result 
	}
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

const populationLimits = [
	{
		limit: 5e4,
		color: "aqua",
	},
	{
		limit: 1e5,
		color: "red"
	},
	{
		limit: 3e5,
		color: "blue"
	},
	{
		limit: 5e5,
		color: "orange"
	},
	{
		limit: 7e5,
		color: "rebeccapurple"
	},
	{
		limit: 9e5,
		color: "lime"
	},
	{
		limit: 12e5,
		color: "tomato"
	},
	{
		limit: 15e5,
		color: "violet"
	},
	{
		limit: 2e6,
		color: "maroon"
	},
]

export function createPopulationHeatmap(data){
	const sorted = populationLimits.sort((a, b) => b.limit - a.limit)
	const heatmap = data.map((city) => {
		const limit = sorted.find(population => population.limit < city.population)
		const result = {
			...city,
			isSelected: true,
			color: limit.color
		}
		return result
	})

	return heatmap
}