import { Router } from "express";
import session from "express-session";
import util from "util";
const exec = util.promisify(require('child_process').exec);

const router = Router();
export default router;

router.post("/memMgmt", async (req, res) => {
    const {stdout,stderr} = await exec('python scripts/memMgmt.py');
    console.log(stdout);
    console.log(stderr);
    
	res.json({
		success: true,
		message: stdout
	});
});

router.post("/fileMgmt", async (req, res) => {
    const {stdout,stderr} = await exec('python scripts/fileMgmt.py');
    console.log(stdout);
    console.log(stderr);
    
	res.json({
		success: true,
		message: stdout
	});
    
});

router.post("/processMgmt", async (req, res) => {
    const {stdout,stderr} = await exec('python scripts/processMgmt.py');
    console.log(stdout);
    console.log(stderr);
    
	res.json({
		success: true,
		message: stdout
	});
});

router.post("/networkMgmt", async (req, res) => {
    const {stdout,stderr} = await exec('python scripts/networkMgmt.py');
    console.log(stdout);
    console.log(stderr);
    
	res.json({
		success: true,
		message: stdout
	});
});

router.post("/ioMgmt", async (req, res) => {
    const {stdout,stderr} = await exec('python scripts/ioMgmt.py');
    console.log(stdout);
    console.log(stderr);
    
	res.json({
		success: true,
		message: stdout
	});
});

