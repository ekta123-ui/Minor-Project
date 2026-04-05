const { spawn } = require("child_process");
const path = require("path");
const { loadTeachersFromDB, loadCampusFromDB } = require("../models/chatModel");

async function colaSystem(query) {

    return new Promise((resolve, reject) => {

        const pythonFile = path.join(__dirname, "../model/model_api_py");

        const python = spawn("python", [pythonFile, query]);

        let predictedPlace = "";

        python.stdout.on("data", (data) => {
            predictedPlace += data.toString();
        });

        python.on("close", async () => {

            try {

                const campus = await loadCampusFromDB();
                const teachers = await loadTeachersFromDB();

                const place = predictedPlace.trim().toLowerCase();

                // FIXED HERE
                const location = campus.find(c =>
                    c.office_name.toLowerCase().includes(place)
                );

                const faculty = teachers.find(t =>
                    t.coordinatorship?.toLowerCase().includes(place)
                );

                let response = "";

                if (location) {
                    response += `📍 ${location.office_name}\n`;
                    response += `Block ${location.block}, Floor ${location.floor}, Room ${location.room_no}\n`;
                }

                if (faculty) {
                    response += `👨‍🏫 ${faculty.teacher_name}\n`;
                    response += `${faculty.designation}`;
                }

                if (!response) {
                    response = "Please visit Block A Reception for help.";
                }

                resolve(response);

            } catch (err) {
                resolve("Assistant unavailable right now.");
            }

        });

    });

}

module.exports = { colaSystem };