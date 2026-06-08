import {
  List, Datagrid, TextField, DateField, NumberField,
  ReferenceField, EditButton, DeleteButton, SelectInput,
  ReferenceInput, FilterButton, TopToolbar, CreateButton,
} from "react-admin";

const filters = [
  <ReferenceInput source="eventId" reference="events" label="Event">
    <SelectInput optionText="title" />
  </ReferenceInput>,
  <ReferenceInput source="roomId" reference="rooms" label="Room">
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

export const SessionList = () => (
  <List
    filters={filters}
    actions={<TopToolbar><FilterButton /><CreateButton /></TopToolbar>}
    sort={{ field: "startDate", order: "ASC" }}
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Title" />
      <ReferenceField source="eventId" reference="events" label="Event">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="roomId" reference="rooms" label="Room">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="startDate" label="Start date" showTime />
      <DateField source="endDate" label="End date" showTime />
      <NumberField source="capacity" label="Capacity" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);