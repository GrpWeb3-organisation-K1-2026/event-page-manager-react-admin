// src/App.tsx
import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";

import { EventList } from "./resources/events/EventList";
import { EventCreate } from "./resources/events/EventCreate";
import { EventEdit } from "./resources/events/EventEdit";

import { RoomList } from "./resources/rooms/RoomList";
import { RoomCreate } from "./resources/rooms/RoomCreate";
import { RoomEdit } from "./resources/rooms/RoomEdit";

import { QuestionList } from "./resources/questions/QuestionList";

import EventIcon from "@mui/icons-material/Event";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export const App = () => (
  <Admin
    layout={Layout}

    title="EventSync Admin"
  >
    <Resource
      name="events"
      icon={EventIcon}
      list={EventList}
      create={EventCreate}
      edit={EventEdit}
      options={{ label: "Events" }}
    />
    <Resource
      name="rooms"
      icon={MeetingRoomIcon}
      list={RoomList}
      create={RoomCreate}
      edit={RoomEdit}
      options={{ label: "Rooms" }}
    />
    <Resource
      name="questions"
      icon={QuestionAnswerIcon}
      list={QuestionList}
      options={{ label: "Questions" }}
    />
  </Admin>
);