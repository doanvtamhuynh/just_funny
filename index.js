import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

const markCommit = async (date) => {
    const data = { date: date.toISOString() };
    await jsonfile.writeFile(path, data);
    await git.add([path]);
    await git.commit(date.toISOString(), { "--date": date.toISOString() });
};

const pattern2022 = [
    "0011000011001111110011000000110000001111111100011000",
    "0011000011001111110011000000110000001111111100011000",
    "0011000011001100000011000000110000001100001100011000",
    "0011111111001111110011000000110000001100001100011000",
    "0011000011001100000011000000110000001100001100000000",
    "0011000011001111110011111100111111001111111100011000",
    "0011000011001111110011111100111111001111111100011000"
];

const makeCommits = async () => {
    let currentDate = moment("2022-01-02");
    const endDate = moment("2022-12-31");

    const rowCount = pattern2022.length;
    const colCount = pattern2022[0].length;

    for (let col = 0; col < colCount; col++) { // Duyệt theo cột trước
        for (let row = 0; row < rowCount; row++) { // Duyệt theo hàng sau
            if (pattern2022[row][col] === "1") {
                for (let i = 0; i < 60; i++) {
                    const commitDate = currentDate.clone()
                        .hour(Math.floor(Math.random() * 4) + 12) // Từ 12h đến 15h
                        .minute(Math.floor(Math.random() * 60))
                        .second(Math.floor(Math.random() * 60));
                    console.log(`Creating commit: ${commitDate.toISOString()}`);
                    await markCommit(commitDate);
                }
            }
            currentDate.add(1, "day");
        }
    }
    console.log("Pushing all commits...");
};

makeCommits();
