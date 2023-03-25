const forms = require('forms');
const fields = forms.fields;

module.exports = forms.create({
  'username': fields.string({
    label: 'Username',
    required: true,
  }),
  'password': fields.password({
    label: 'Password',
    required: true,
  }),
});