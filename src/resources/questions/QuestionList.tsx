import {
  List, Datagrid, TextField, NumberField, DateField,
  ReferenceField, DeleteButton, ReferenceInput,
  SelectInput, FilterButton, TopToolbar,
} from "react-admin";

const filters = [
  <ReferenceInput source="sessionId" reference="sessions" label="Session">
    <SelectInput optionText="title" />
  </ReferenceInput>,
];

export const QuestionList = () => (
  <List
    filters={filters}
    actions={<TopToolbar><FilterButton /></TopToolbar>}
    sort={{ field: "upvotes", order: "DESC" }}
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <ReferenceField source="sessionId" reference="sessions" label="Session">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="content" label="Question" />
      <TextField source="name" label="Asked by" emptyText="Anonymous" />
      <NumberField source="upvotes" label="Votes" />
      <DateField source="createdAt" label="Created at" showTime />
      <DeleteButton />
    </Datagrid>
  </List>
);