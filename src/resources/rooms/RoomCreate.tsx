import { Create, SimpleForm, TextInput, required } from "react-admin";

export const RoomCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" label="Room name" validate={required()} fullWidth />
    </SimpleForm>
  </Create>
);