const forms = require('forms');
const fields = forms.fields;
const validators = forms.validators;

module.exports = forms.create({
  'username': fields.string({
    label: 'Username',
    required: true,
  }),
  'password': fields.password({
    label: 'Password',
    required: true,
  }),
  'confirm_password': fields.password({
    label: 'Confirm Password',
    required: true,
    validators: [
      validators.matchField('password'),
    ],
  }),
});