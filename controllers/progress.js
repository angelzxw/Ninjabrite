const express = require('express');
const router = express.Router();

router.get('/', progress);
router.get('/report1', getReport1);
router.get('/report2', getReport2);
router.get('/report3', getReport3);
router.get('/report4', getReport4);

function progress(req, res) {
    res.render('progress', { title: 'Sprint Reports' });
}
function getReport1(req, res) {
    res.render('SprintReportNov2', { title: 'Sprint Report I' });
}
function getReport2(req, res) {
    res.render('SprintReportNov9', { title: 'Sprint Report II' });
}
function getReport3(req, res) {
    res.render('SprintReportNov16', { title: 'Sprint Report III' });
}
function getReport4(req, res) {
    res.render('SprintReportNov30', { title: 'Sprint Report IV' });
}
module.exports = router;
