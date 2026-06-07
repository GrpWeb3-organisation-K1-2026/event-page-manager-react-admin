import { List, Datagrid, TextField, EditButton, DeleteButton } from "react-admin";

export const RoomList = () => (
  <List sort={{ field: "name", order: "ASC" }}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);