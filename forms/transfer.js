const forms = require('forms');
const fields = forms.fields;
const validators = forms.validators;

module.exports = forms.create({
  'recipient': fields.string({
    label: 'Recipient',
    required: true,
  }),
  'amount': fields.number({
    label: 'Amount',
    required: true,
  }),
});