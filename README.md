# Phaser 3 template (ES5)

Very basic template project for game development with Phaser 3.

## Feature

- dev server with live-reload
- build
- simple `SHOW_ALL` style stretch mode
- webpack
- clean structure
- automatically find available port (start from 4000)

## How to run

- Development: `npm run start`
- Build: `npm run build`

## Folders

- assets: raw assets, you can put images and texture packer files here, export atlas to `media` folder
- media: image, atlas, sound and whatever you need to ship with the final game
- src: source code locates here, `main.js` is the entry


########################################################

## The Game

Uses a smartphone as a controller for the game, linking to the computer and allowing players to interact through their on-phone browser. The aim is to knock other people off the central platform using 360 degree movement, and a 'dash' ability (using the phone to controll your character). 

Each person is assigned a colour when they join, which correllates to the colour displayed as the background of the browser on the mobile device.

Max number of players (current) = 4

