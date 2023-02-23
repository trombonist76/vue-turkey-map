<script setup>
import data from "@/assets/data/cities.json"
import TurkeyMap from "@/components/TurkeyMap.vue";
import { onBeforeMount, ref } from "vue";
import { randomNumber, randomColor } from "@/utils/random" 
import { byPlateNumber, byPopulation, byRegion, groupBy, createPopulationHeatmap } from "@/utils/filters" 

const filters = [ 
	( city ) => byPlateNumber(city, plateNumberFilter.value), 
	( city ) => byRegion(city, regionFilter.value),
	( city ) => byPopulation(city, populationFilter.value)
]
const selectedColor = ref(null)
const regionFilter = ref(null)
const plateNumberFilter = ref(null)
const populationFilter = ref(null)
const activeFilter = ref(null)
let autoShufflerInterval = ref(undefined)

onBeforeMount(() => shuffleHandler())


const shuffleHandler = () => {
	const regions = groupBy(data, (city) => city.region)
	activeFilter.value = filters.at(randomNumber(filters.length - 1))
	regionFilter.value = regions.at(randomNumber(regions.length - 1))
	plateNumberFilter.value = randomNumber(81, 1)
	populationFilter.value = randomNumber(3e6, 1e5)
	selectedColor.value = randomColor()
}

const autoShuffler = () => {
	if(autoShufflerInterval.value) {
		clearInterval(autoShufflerInterval.value)
		autoShufflerInterval.value = undefined
		return
	}
	autoShufflerInterval.value = setInterval(() => shuffleHandler(), 500)
}

const selectedCityHandler = (city) => {
	return activeFilter.value(city)
}

const selectCityHandler = (city, cities) => {
	console.log('city :>> ', city);
	console.log('cities :>> ', cities);
}

//this iterates cities and changes city's 'isActive' and 'color' by condition
const selectCitiesHandler = (cities) => {	
	return createPopulationHeatmap(cities)
}
</script>

<template>
	<div class="buttons">
		<button class="buttons__button" @click="shuffleHandler">Shuffle</button>
		<button v-if="!autoShufflerInterval" class="buttons__button" @click="autoShuffler">Auto Shuffle</button>
		<button v-else class="buttons__button" @click="autoShuffler">Stop Auto Shuffle</button>
	</div>
	<TurkeyMap :isSelectedCity="selectedCityHandler" @select="selectCityHandler" :selectedColor="selectedColor"/>
	<TurkeyMap :selectCities="selectCitiesHandler" @select="selectCityHandler"/>
</template>

<style scoped lang="scss">
.buttons{
	display: flex;
	justify-content: center;
	gap: 16px;
	padding-top: 10px;

	&__button{
		padding: 1rem 1.3rem;
		font-size: 1rem;
		cursor: pointer;
		font-weight: bold;
		border-radius: 5px;
		background-color:#4338ca;
		color: white;
		transition: background-color 150ms ease-in-out;

		&:hover{
			background-color: #818cf8;
		}
	}
}
</style>


