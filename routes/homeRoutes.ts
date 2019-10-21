import { Router } from "express";
import session from "express-session";
import util from "util";
const axios = require("axios");
const dialogflow = require('dialogflow').v2beta1;
const getYoutubeSubtitles = require("@joegesualdo/get-youtube-subtitles-node");
const exec = util.promisify(require("child_process").exec);

const router = Router();
export default router;

router.get("/transcript", async (req, res) => {
	console.log("working");
	const id = req.query.transcript_id;
    const transcript = await get_transcript_py(id);
    res.json({
        success: true,
        message: transcript
    })
});

router.get("/test", (req, res) => {
	res.send("Hello");
})
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

router.get("/processMgmt", async (req, res) => {
	const { stdout, stderr } = await exec("python scripts/processMgmt.py");
	console.log(stdout);
	console.log(stderr);

	res.json({
		success: true,
		message: stdout
	});
});

router.get("/processMgmtBeta", async (req, res) => {
	const burstTime = req.body.burstTime;
	console.log(burstTime);
	const { stdout, stderr } = await exec(
		"python scripts/processMgmt.py",
		burstTime
	);
	console.log(stdout);
	console.log(stderr);

	res.json({
		success: true,
		message: stdout
	});
});

router.post("/networkMgmt", async (req, res) => {
	const { stdout, stderr } = await exec("python scripts/networkMgmt.py");
	console.log(stdout);
	console.log(stderr);

	res.json({
		success: true,
		message: stdout
	});
});

router.post("/ioMgmt", async (req, res) => {
	const { stdout, stderr } = await exec("python scripts/ioMgmt.py");
	console.log(stdout);
	console.log(stderr);

	res.json({
		success: true,
		message: stdout
	});
});

async function get_transcript_py(id){
	const {stdout,stderr} = await exec('python scripts/transcript.py '+ id);
	return stdout;
}