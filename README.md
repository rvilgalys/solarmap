# Solar Map Project
Rim Vilgalys
vilgalys@gmail.com

[See a live version here](https://solarmap-vilgalys.vercel.app/)
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

Provide a NEXT_PUBLIC_GOOGLE_API_KEY in an `.env.local` file in the root directory. This api key will need to be enabled for ... and whitelisted for localhost.

`> npm run dev`


## Assumptions and Limitations

* Average Solar Panel Size is 65" L x 39" W or 164 cm x 99 cm (https://news.energysage.com/average-solar-panel-size-weight/)
* It is assumed that drawn polygons will fit solar panels -- area is calculated but a packing algorithm is not used to find the ideal arrangement of panels.
* Wattage for Panels can Range from 50 Wp to 500 Wp (https://news.energysage.com/what-is-the-power-output-of-a-solar-panel/)

## Packages and dependencies

* @react-google-maps/api: Google Map bindings and thin wrapper for React. Chosen because it allows a lot of access to the default Google Map API.
* @tailwindcss/forms: Visual resets to default form elements.
* geolib: Used for area calculation from LatLng inputs.
* react-range: Used for the range slider on panel Nominal Power.
* postcss, autoprefixer: Dependencies of Tailwind.