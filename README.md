# NewU Todo-Streak Task

A streak feature for a todo app that tracks daily or weekly completion and preserves streaks when settings change. Users can customize tracking type, change settings, and view a simple UI. User data is back-up on Cloud Firestore

## Prerequisites

- Ensure you _Node_ installed on your PC. You can download it from [here](https://nodejs.org/en/download/current)
- Ensure you have an IDE installed, such as [Visual Studio Code](https://code.visualstudio.com/download) or [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)

## Getting Started

- Clone this repository to your local machine using `https://github.com/unknownaloy/newu_task.git`
- Open the project in your preferred code editor.
- Run `npm install` to install the app's dependencies.
- Run `npm run dev` to build the app and view it in your browser.

## Project Configuration

Cloud Firestore is being used to persist todo data for a user in combination with localStorage, which holds a unique ID for a user. The firebaseConfig.ts file is already included in the project. If you prefer to use your own Firestore configuration, follow these instructions:

- Replace the content of `firebaseConfig.ts` with your own configuration obtained from Firebase.
- Refer to the screenshot below for an illustration of where to locate the directory: 👇🏽

<a href="https://drive.google.com/uc?export=view&id=1hs7CaPIZr56fTG3KnfrndBdAm8TSFfBd"><img alt="Instruction screenshot" src="https://drive.google.com/uc?export=view&id=1hs7CaPIZr56fTG3KnfrndBdAm8TSFfBd" style="width: 640px" title="Click to enlarge picture" />

## Features

- Add daily todos and select specific days.
- Add weekly todos and choose frequency per week.
- Add weekly todos and choose frequency per week.
- Edit/change todo types from daily to weekly or vice versa while maintaining the current streak.
- Keep track of the user's longest streak count for a todo.

## Further Improvements

- Implement feature to enable back-tracking habits from the past, with streak remaining unchanged.
- Implement better error handling throughout the app.
- Add unit tests to verify core functionalities.
- Implement UI to handle empty states or errors gracefully.
