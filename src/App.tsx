import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";

import { EventList } from "./resources/events/EventList";
import { EventCreate } from "./resources/events/EventCreate";
import { EventEdit } from "./resources/events/EventEdit";

import { SessionList } from "./resources/sessions/SessionList";
import { SessionCreate } from "./resources/sessions/SessionCreate";
import { SessionEdit } from "./resources/sessions/SessionEdit";

import { SpeakerList } from "./resources/speakers/SpeakerList";
import { SpeakerCreate } from "./resources/speakers/SpeakerCreate";
import { SpeakerEdit } from "./resources/speakers/SpeakerEdit";

import { RoomList } from "./resources/rooms/RoomList";
import { RoomCreate } from "./resources/rooms/RoomCreate";
import { RoomEdit } from "./resources/rooms/RoomEdit";

import { QuestionList } from "./resources/questions/QuestionList";

import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
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
      name="sessions"
      icon={VideoLabelIcon}
      list={SessionList}
      create={SessionCreate}
      edit={SessionEdit}
      options={{ label: "Sessions" }}
    />
    <Resource
      name="speakers"
      icon={GroupIcon}
      list={SpeakerList}
      create={SpeakerCreate}
      edit={SpeakerEdit}
      options={{ label: "Speakers" }}
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