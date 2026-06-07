import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const RoomEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput source="name" label="Room name" validate={required()} fullWidth />
    </SimpleForm>
  </Edit>
);