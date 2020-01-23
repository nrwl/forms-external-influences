module.exports = {
  name: 'hero-forms',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/hero-forms',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
