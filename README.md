# Solar Map Project
Rim Vilgalys
vilgalys@gmail.com

## Features
* Exposes a map with a searchable address
* User can draw Polygon
* User can customize Nominal Power of their chosen panel
* App will calculate total Nominal Power based on area available
  
## Stack
* Next.js (SSR & Framework)
* TailwindCSS (CSS & Default Styles)
* Google Maps (Maps)
  
## Setup & Install
Follow these commands to run the project locally. This will require a working install of Node & npm. Project was tested on Node 12.

`> git clone <this>`

`> cd solarmap`

`> npm install`

`> npm run dev`

Provide a GOOGLE_API_KEY in a `.env` file in the root directory. This api key will need to be enabled for ... and whitelisted for localhost.

## Assumptions and Limitations

* Average Solar Panel Size is 65" L x 39" W (https://news.energysage.com/average-solar-panel-size-weight/)
* It is assumed that drawn polygons will fit solar panels -- area is calculated but a packing algorithm is not used to find the ideal arrangement of panels.