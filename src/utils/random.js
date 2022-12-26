export function randomNumber (max, min = 0) {
	min = Math.ceil(min)
	max = Math.floor(max)
	const number =  Math.floor(Math.random() * (max - min + 1)) + min
	return number
}

export function randomColor (){
	const color = `#${Math.floor( Math.random() * 16777215 ).toString(16)}`
	return color
} 
