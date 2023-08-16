import Server from "./server";

const app = new Server(5000);
app.listen();

// const person = {
//   name: "John",
//   age: 30,
// };

// Publisher.publish(AVAILABLE_CHANNELS.PERSON_CREATED, JSON.stringify(person));
