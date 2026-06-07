import { Edit, SimpleForm, TextInput, DateTimeInput, required } from "react-admin";

export const EventEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput source="title" label="Title" validate={required()} fullWidth />
      <TextInput source="description" label="Description" multiline rows={4} validate={required()} fullWidth />
      <TextInput source="place" label="Location" validate={required()} fullWidth />
      <DateTimeInput source="startDate" label="Start date" validate={required()} />
      <DateTimeInput source="endDate" label="End date" validate={required()} />
    </SimpleForm>
  </Edit>
);