import {
  List, Datagrid, TextField, DateField, NumberField,
  EditButton, DeleteButton, SearchInput, FilterButton,
  TopToolbar, CreateButton,
} from "react-admin";

const filters = [<SearchInput source="q" alwaysOn />];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

export const EventList = () => (
  <List filters={filters} actions={<ListActions />} sort={{ field: "startDate", order: "ASC" }}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Title" />
      <TextField source="place" label="Location" />
      <DateField source="startDate" label="Start date" showTime />
      <DateField source="endDate" label="End date" showTime />
      <NumberField source="_count.sessions" label="Sessions" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);