import { List, Datagrid, TextField, ImageField, EditButton, DeleteButton, SearchInput } from "react-admin";

const filters = [<SearchInput source="q" alwaysOn />];

export const SpeakerList = () => (
  <List filters={filters} sort={{ field: "fullName", order: "ASC" }}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <ImageField
        source="photo"
        label="Photo"
        sx={{ "& img": { width: 48, height: 48, borderRadius: "50%", objectFit: "cover" } }}
      />
      <TextField source="fullName" label="Full name" />
      <TextField source="biography" label="Biography" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);