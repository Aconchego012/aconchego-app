import Server from "./server";

const app = new Server(6434);
app.listen();

// const person = {
//   name: "John",
//   age: 30,
// };

// Publisher.publish(AVAILABLE_CHANNELS.PERSON_CREATED, JSON.stringify(person));
