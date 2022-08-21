const courseServices = require("../services/course");
let funcs = {};

funcs.createCourse = async (req, res) => {
  const { title, description, types, icon, image } = req.body;

  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const course = await courseServices.createCourse({
      title,
      description,
      types,
      icon,
      image,
      creator_id: user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Course created successfully.",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Course creation unsuccessful" });
  }
};

funcs.fetchAllCourses = async (req, res) => {
  const { type } = req.query;
  
  try {
    const courses = await courseServices.fetchCourses({type});
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully.",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Fetching course unsuccessful" });
  }
};


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

funcs.voteCourse = async (req, res) => {
  const { id = '' } = req.params;
  const { vote = false } = req.body;
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const course = await courseServices.getCourse({ course_id: id });

    const voteObj = await courseServices.voteCourse({ course_id: course.id, user_id: user.id, vote });

    return res.status(200).json({
      success: true,
      message: "Voted course successfully.",
      data: voteObj,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ success: false, message: "Voting unsuccessful" }); 
  }
}

funcs.fetchVotes = async (req, res) => {
  const { id = '' } = req.params;
  try {

    const course = await courseServices.getCourse({ course_id: id });

    const votes = await courseServices.fetchVotes({ course_id: course.id });

    return res.status(200).json({
      success: true,
      message: "Vote fetching successfully.",
      data: votes,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ success: false, message: "Vote fetching unsuccessful" }); 
  }
}

funcs.updateVote = async (req, res) => {
  const { id = '' } = req.params;
  const { vote = false } = req.body;
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const course = await courseServices.getCourse({ course_id: id });

    const voteObj = await courseServices.updateVote({ course_id: course.id, user_id: user.id, vote });

    return res.status(200).json({
      success: true,
      message: "Vote update successfully.",
      data: voteObj,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ success: false, message: "Vote update unsuccessful" }); 
  }
}

module.exports = funcs;