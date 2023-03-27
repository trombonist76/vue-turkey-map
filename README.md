
# Vue Turkey Map

## 📚 Introduction

This repo contains SVG Turkey Map created with Vue.js. You can customize the map, you can interact with it.

## ⚒️ Used Technologies

- Vue.js
- Sass
- Vite

## Getting Started

For using the project follow the steps below 

### Prequisities

- npm
- vite

### Installation
You can clone the project with the following URL.

```bash 
git clone https://github.com/trombonist76/vue-turkey-map
```

```bash 
npm install
```


## Props

| Prop | Type | Default | Description |
| - | - | - | - |
| viewbox | Object | `{top: 0, left: 80, width: 1050, height: 585 }`| Map viewbox. |
| hoverable | Boolean | true | City hover state. |
| opacity | Number | 1 | Hover state '0' to '1'. |
| tooltipContent | Function | `city => city.name` | Tooltip content when city hovered. |
| tooltipOffset | Object | `{top: -26, left: 16}` | Tooltip location by given pixels. |
| clickToSelect | Boolean | true | Select city when it clicked. |
| toggleUnselect | Boolean | true | Unselect city when it clicked after select. |
| isSelectedCity | Function | `city => false` | Select cities by given function, return 'true' if it's selected. |
| defaultColor | String | `#fff` | Default city color, not hovered or not selected. |
| hoverHexColor | String | `#aaa` | City color when it hovered. |
| selectedColor | String | `#7a7a7a` | City color when it selected. |
| selectCities | Function | - | When you want to use custom select condition or define different selected city color each city, you can use the prop. If you want to select city/cities you can change the 'isSelected' or 'color' property of city in given array. After that return the changed array. |

## Emits

| Emit | Description |
| - | - |
| Hover | Hovered city object. | 
| Select | First argument; selected city, second argument; all selected cities. | 