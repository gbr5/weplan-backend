import FormField from '@modules/forms/infra/typeorm/entities/FormField';

export function sortFormFields(fields: FormField[]): FormField[] {
  const sortedFields = fields.sort((a: FormField, b: FormField) => {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  });
  return sortedFields;
}
