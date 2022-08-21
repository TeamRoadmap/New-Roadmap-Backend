const { Router } = require('express');
const courseController = require('../controllers/course');
const { isAuthorized } = require('../middlewares/auth');

const router = Router();


router.get('/', isAuthorized, courseController.fetchAllCourses);

router.post('/', isAuthorized, courseController.createCourse);

router.patch('/:id', isAuthorized, courseController.updateCourse);

router.delete('/:id', isAuthorized, courseController.deleteCourse);

router.get('/:id/enrollment', courseController.fetchEnrollments);

router.post('/:id/enrollment', isAuthorized, courseController.enrollInCourse);

router.get("/:id/vote", courseController.fetchVotes);

router.post('/:id/vote', isAuthorized, courseController.voteCourse);

router.patch('/:id/vote', isAuthorized, courseController.updateVote);


module.exports = router;