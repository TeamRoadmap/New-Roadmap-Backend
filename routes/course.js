const { Router } = require('express');
const courseController = require('../controllers/course');
const { isAuthorized } = require('../middlewares/auth');

const router = Router();


router.get('/', isAuthorized, courseController.fetchCourses);

router.post('/', isAuthorized, courseController.createCourse);

router.patch('/:id', isAuthorized, courseController.updateCourse);

router.delete('/:id', isAuthorized, courseController.deleteCourse);

router.get('/:id/enrollment', courseController.fetchEnrollments);

router.post('/:id/enrollment', isAuthorized, courseController.enrollInCourse);



module.exports = router;