import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  required,
  minValue,
} from "react-admin";
import { SpeakersSelectInput } from "../speakers/SpeakerSelectInput";

export const SessionEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput
        source="title"
        label="Title"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        validate={required()}
        fullWidth
      />
      <DateTimeInput
        source="startDate"
        label="Start date"
        validate={required()}
      />
      <DateTimeInput
        source="endDate"
        label="End date"
        validate={required()}
      />
      <NumberInput
        source="capacity"
        label="Capacity"
        validate={[required(), minValue(1)]}
      />
      <ReferenceInput source="eventId" reference="events" label="Event">
        <SelectInput optionText="title" validate={required()} fullWidth />
      </ReferenceInput>
      <ReferenceInput source="roomId" reference="rooms" label="Room">
        <SelectInput optionText="name" validate={required()} fullWidth />
      </ReferenceInput>
      <SpeakersSelectInput />
    </SimpleForm>
  </Edit>
);