// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  },
  quiz: {
    name: '<your-quiz-short-name>',
    title: '<you-quiz-title>',
    description: '<your-quiz-description>',
    imagePath: '<your-quiz-image-path>'
  },
  language: 'en',
  routing: {
    main: 'quiz',
    quiz: {
      start: 'start',
      end: 'end',
      list: {
        main: 'list',
        new: 'new',
        edit: 'edit'
      }
    },
    auth: {
      signin: 'signin',
      signup: 'signup',
      signout: 'signout'
    }
  }
};
