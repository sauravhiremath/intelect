import { Router } from "express";
import session from "express-session";
import util from "util";
var path = require("path");
const axios = require("axios");
const multer = require("multer");
// const dialogflow = require("dialogflow").v2beta1;
const fs = require("fs");
const getYoutubeSubtitles = require("@joegesualdo/get-youtube-subtitles-node");
const exec = util.promisify(require("child_process").exec);
var storage = multer.diskStorage({
	destination: "uploads/",
	filename: function(req, file, cb) {
		//req.body is empty...
		//How could I get the new_file_name property sent from client here?
		cb(null, file.originalname + ".pdf");
	}
});
var upload = multer({ storage: storage });

// Imports the Google Cloud client library
const language = require("@google-cloud/language");

// Creates a client
const client = new language.LanguageServiceClient();

// Imports the Google Cloud client library
const { Assistant, AssistantLanguage } = require("nodejs-assistant");

// Your credentials
const credentials = JSON.parse(
	fs.readFileSync(
		"client_secret_111559290713-ul71nii1d9gddutpe91u2qijrorg7nsd.apps.googleusercontent.com.json"
	)
);

// console.log(credentials)

const router = Router();
export default router;

router.get("/transcript", async (req, res) => {
	// console.log("working");
	const id = req.query.transcript_id;
    const transcript = await get_transcript_py(id);
    res.json({
        success: true,
        message: transcript
    })
});

router.get("/test", (req, res) => {
	res.send("Hello");
});

router.get("/topics", async (req, res) => {
    // const fileName = req.query.fileName;
	const { stdout, stderr } = await exec("python scripts/topics.py");
	console.log(stdout);
	console.log(stderr);

	res.json({
		success: true,
		message: stdout
	});
});

router.post("/upload", upload.single("portion"), async (req, res) => {
	const fileName = req.body.fileName;
	if (req.file) {
		const { stdout, stderr } = await exec("python3 scripts/topics.py", fileName);
		console.log(stdout);
		console.log(stderr);

		res.json({
			success: true,
			message: stdout
		});
	} else {
		res.json({
			success: false,
			message: "File not uploaded properly"
		});
	}
});

router.get("/topics", async (req, res) => {
	const fileName = req.query.fileName;
	const { stdout, stderr } = await exec("python3 scripts/topics.py");
	console.log(stdout);
	console.log(stderr);

	res.json({
		success: true,
		message: stdout
	});
});

router.get("/gassist", async (req, res) => {
	console.log("G Assist starts");

	const userQuery = req.query.userQuery;
	console.log(userQuery);

	// Creates a client
	const assistant = new Assistant(
		/* required credentials */ {
			type: "authorized_user",
			client_id: credentials.web.client_id,
			client_secret: credentials.web.client_secret
		}
		/* additional, optional options */
	);

	// Sends a text query to the assistant
	assistant
		.query(userQuery)
		.then(response => {
			// response contains all the fields returned by the assistant, such as the text and audio
			res.json({
				success: true,
				message: response.text
			});
			console.log(`Response: ${response.text}`);
			// response.audio is a Buffer containing the audio response by the assistant
		})
		.catch(err => {
			console.error("ERROR: ", err);
		});
});

router.get("/mainTopics", async (req, res) => {
	const transcript =
		"all have similar properties. And the reason why they all\nhave similar properties is, in most cases, they have the same number of valence electrons. Remember, valence electrons\nare the reactive electrons, the ones that might\ninteract with other things. And because elements with\nsimilar valence electrons will have similar reactivities,\nthey will form similar ions. Similar ions. And they will have similar roles. Similar roles in ionic compounds. Ionic compounds. Now, for the sake of this\nvideo, I'm gonna focus most on the extremes of the periodic table, the groups at the left and the right, because those are the closest\nto having a full outer shell, either by losing electrons\nor by gaining electrons. So just to remind ourselves, what does it mean to have\na full, full outer shell? Well, in general, people\nwill refer to the octet rule. For our second, third, fourth,\nfifth, and on and on shells, you're full when you have eight electrons. Eight electrons. The major exception to the\noctet rule is the first shell, where it is full with two electrons";
	// var bodyFormData = new FormData();
	// bodyFormData.set("document", transcript);

	// axios({
	// 	method: "post",
	// 	url: "https://language.googleapis.com/v1beta2/documents:classifyText",
	// 	data: bodyFormData,
	// 	config: { headers: { "Content-Type": "multipart/form-data" } }
	// })
	//     .then(function(response) {
	//         //handle success
	//         console.log(response);
	//     })
	//     .catch(function(response) {
	//         //handle error
	//         console.log(response);
	//     });
	console.log(123);
	const document = {
		content: transcript,
		type: "PLAIN_TEXT"
	};

	// Classifies text in the document
	const [classification] = await client.classifyText({ document });
	console.log("Categories:");
	classification.categories.forEach(category => {
		console.log(
			`Name: ${category.name}, Confidence: ${category.confidence}`
		);
	});
});

async function get_transcript_py(id) {
	const { stdout, stderr } = await exec("python3 scripts/transcript.py " + id);
	return stdout;
}
