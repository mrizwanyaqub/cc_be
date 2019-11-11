import "reflect-metadata";
import App from "./app";
process.on("uncaughtException", (err) => {
    console.error(`
    --------------------
    Unhandled Exception:
    ${err.message}
    --------------------
    `);
});

const app: App = new App();
app.start();
module.exports = app;
