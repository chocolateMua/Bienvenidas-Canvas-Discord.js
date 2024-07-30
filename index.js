const { Client } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
  intents: 53608447,
});

fs.readdirSync("Events")
  .filter((filename) => filename.endsWith(".js"))
  .forEach((filename) => {
    try {
      const listener = require(`./Events/${filename}`);
      const eventName = path.basename(filename, ".js");

      client.on(eventName, listener);
    } catch (error) {
      console.log(`Error al cargar el evento`, error);
    }
  });

client.login(process.env.TOKEN);
