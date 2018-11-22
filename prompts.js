module.exports = [{
  name: 'generate',
  type: 'list',
  message: 'What do you want to generate?',
  choices: [{
      name: 'Initial framework',
      value: 'init'
    },
    {
      name: 'Initial framework and generate examples',
      value: 'whole'
    }
  ],
  default: 'init',
}]