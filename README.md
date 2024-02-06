# NewU Todo-Streak Task

A streak feature for a todo app that tracks daily or weekly completion and preserves streaks when settings change. Users can customize tracking type, change settings, and view a simple UI. User data is back-up on Cloud Firestore

## Prerequisites

- Ensure you Node installed on your PC. You can download it from [here](https://nodejs.org/en/download/current)
- Ensure you have an IDE installed, such as [Visual Studio Code](https://code.visualstudio.com/download) or [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)

## Getting Started

- Clone this repository to your local machine using `https://github.com/unknownaloy/newu_task.git`
- Open the project in your preferred code editor.
- Run `npm install` to install the app's dependencies.
- Run `npm run dev` to build the app on your browser.

## Running Tests

- Open the project in your preferred code editor.
- Run `flutter test` to run all tests in the project

## Feature

- Feature to add a daily todo and pick customized dates
- Feature to add a weekly todo and pick frequency per week
- Feature to track streak of todo and reset streak when broken
- Feature to edit/change todo type from daily to weekly or vise-versa while maintaining current streak
- Feature to keep track on user's longest streak count for a todo

## Further Improvements

- Implement better error handling across the app
- Implement unit test to help ascertain core logics
- Implement mobile responsiveness for the app