## Mobiquity F1 App

This app was developed to attend the [Mobiquity Front-end Assignment 2018](https://github.com/zicoNextt/mobiquity-f1/blob/master/Assignment2018.pdf). It doesn't intend to be used to any commercial purpose.

It shows the F1 world champions from 2005 until 2015 and the race's winner for each year, highlighting the race's winner when the winner has been the world champion in the same season.

See app running [here](https://ziconextt.github.io/mobiquity-f1).

## Development proccess

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) with typescript and tslint through the command:

```shell
create-react-app mobiquity-f1 --scripts-version=react-scripts-ts
```

### React/redux structure

It was used redux combined with react to save the app states. It has tree reducers:

- Season reducer
  - Saves the actual season
- Standing reducer
  - Saves the standing results, triggered on fetch standing success action
  - Set state to standing loading when standing result are being loaded
  - Set state to standing error when standing error action is triggered
- Winners reducer
  - Saves the season's winner results, triggered on fetch winners success action
  - Set state to winners loading when winners result are being loaded
  - Set state to winners error when winners error action is triggered
  - Swap state on how to show winners result (grid or list)

### Styles

The app styles was developed using sass and [Bootstrap 4](https://getbootstrap.com). To be able to use sass, it was necessary to run:

```shell
npm run eject
```

So the webpack config file could be edited to generate css from sass (by default, create-react-app only works with css)

#### Css structure
The app only loads one css file, that import others components styles. This approach were taken instead of every component load its own css because the app was very simple and small, with just a few components. This way it became faster and easier to import the bootstrap variables, once it was imported only by the main css file instead of being loaded on every css component file.

```
src
├── styles
│   └── App.scss /* import all the css components, including bootstrap */
│   └── _variables.scss /* import boostrap sass variables and replace its value when necessary */
│   └── _bootstrap.scss /* import bootstrap package with new variables values */
│   └── _driverGridItem.scss /* styles for grid item */
│   └── _driverList.scss /* styles for driver's list */
│   └── _header.scss /* styles for header */
│   └── _loading.scss /* styles for loading animation */
│   └── _seasonPage.scss /* styles for season page */
│   └── _seasonsList.scss /* styles for welcome page (list of seasons) */
```

#### Fonts
The default bootstrap font variable was replaced to font 'Roboto' on _variables.scss<br>
The font file is loaded using google.fonts:

```html
<link href="//fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
```

## Installation and run

To run the project, you need to have npm or yarn instaled.

#### `npm install` or `yarn install`

Install the project dependencies.

#### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


