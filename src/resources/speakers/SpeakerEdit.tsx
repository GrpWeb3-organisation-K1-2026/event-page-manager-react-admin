import { Edit, SimpleForm, TextInput, required } from "react-admin";
import { LinksInput } from "./LinksInput";

export const SpeakerEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput source="fullName" label="Full name" validate={required()} fullWidth />
      <TextInput source="biography" label="Biography" multiline rows={4} validate={required()} fullWidth />
      <TextInput source="photo" label="Photo URL" fullWidth />
      <LinksInput />
    </SimpleForm>
  </Edit>
);