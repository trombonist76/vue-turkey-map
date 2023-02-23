import { toRaw } from "vue"

export function isInArrayById (array, id) {
    const isInArray = array.some(item => item.id === id)
    return isInArray
}

function cityEmitFields (city) {
    const copiedCity = structuredClone(toRaw(city))
    delete copiedCity.path
    return copiedCity
}

export function prepareToEmit (cityData) {
    if( Array.isArray(cityData) ){
        const emitArray = cityData.map(city => cityEmitFields(city))
        return emitArray
    }
    //else
    const emitObj = cityEmitFields(cityData)
    return emitObj
}