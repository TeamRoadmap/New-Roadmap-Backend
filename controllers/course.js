const courseServices = require("../services/course");
let funcs = {};

funcs.createCourse = async (req, res) => {
  const { title, description, icon, image } = req.body;
    try {
        const user = req.user;

        if (!user) {
          return res.status(400).json({ success: false, message: "User not found" });
        }
        
        const course = await courseServices.createCourse({
           title, description, icon, image, creator_id: user.id
        });
        
        return res.status(200).json({
            success: true,
            message: "Course created successfully.",
            data: course,
          });
    } catch (error) {
        console.log(error)
        return res
          .status(400)
          .json({ success: false, message: "Course creation unsuccessful" });
    }
}


funcs.fetchCourses = async (req, res) => {
  const { id = '' } =  req.query;
  
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    
    const courses = await courseServices.fetchCourses({ id: user.id, course_id: id });
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully.",
      data: courses,
    });
  } catch (error) {
    console.log(error)
      return res
        .status(400)
        .json({ success: false, message: "Fetching course unsuccessful" });
  }
}

funcs.updateCourse = async (req, res) => {
  const { id = '' } = req.params;
  const { title, description, icon, image } = req.body;

  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    
    const course = await courseServices.updateCourse({ id, title, description, icon, image, creator_id: user.id });

    return res.status(200).json({
      success: true,
      message: "Courses updated successfully.",
      data: course,
    });
  } catch (error) {
    console.log(error)
      return res
        .status(400)
        .json({ success: false, message: "Updating course unsuccessful" });
  }
} 

funcs.deleteCourse = async (req, res) => {
  const { id = '' } = req.params;
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const course = await courseServices.deleteCourse({ id, creator_id: user.id });
    return res.status(200).json({
      success: true,
      message: "Courses deleted successfully.",
      data: course,
    });
  } catch (error) {
    console.log(error)
      return res
        .status(400)
        .json({ success: false, message: "Delete course unsuccessful" });
  }
}

funcs.enrollInCourse = async (req, res) => {
  const { id = '' } = req.params;
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const course = await courseServices.getCourse({ course_id: id });
    console.log(course);

    const enrollment = await courseServices.enrollInCourse({ course_id: course.id, user_id: user.id });

    return res.status(200).json({
      success: true,
      message: "User enrolled successfully.",
      data: enrollment,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ success: false, message: "Enrolling user unsuccessful" }); 
  }
}

funcs.fetchEnrollments = async (req, res) => {
  const { id = '' } = req.params;
  try {

    const course = await courseServices.getCourse({ course_id: id });

    const enrollments = await courseServices.fetchEnrollments({ course_id: course.id });

    return res.status(200).json({
      success: true,
      message: "Fetching enrollment successfully.",
      data: enrollments,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ success: false, message: "Fetching enrollment unsuccessful" }); 
  }
}

module.exports = funcs;