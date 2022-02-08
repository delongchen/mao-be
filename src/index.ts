import {app} from "./app";

async function start() {
  await app.start(11451)
}

start().then(() => {
  //console.log('then')
})
