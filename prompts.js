module.exports = [{
  name: 'generate',
  type: 'list',
  message: 'What do you want to generate?',
  choices: [
    {
      name: 'Initial framework and generate examples',
      value: 'whole'
    },
    {
      name: 'Initial framework only',
      value: 'init'
    }
  ],
  default: 'init'
}]
