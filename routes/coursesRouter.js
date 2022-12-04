const express = require("express");

const courseRouter = express.Router();

const courseList = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// GET all the courses in the list
courseRouter.get("/api/courses", (req, res) => {
  return res.status(200).json({ list: courseList });
});

// GET a single courses from the list
courseRouter.get("/api/courses/:id", (req, res) => {
  const course = courseList.find(
    (course) => course.id === parseInt(req.params.id)
  );

  // if it can't find the course in the list
  if (!course) {
    return res.status(200).json({ Message: "Course does not exist!" });
  }

  // return the course if found
  return res.status(200).json({ course: course });
});

// POST course to the list
courseRouter.post("/api/courses", (req, res) => {
  const resultVal = validate({ name: req.body.name });

  if (resultVal) {
    const newCourse = { id: courseList.length + 1, ...resultVal.value };

    courseList.push(newCourse);

    return res.status(200).json({ message: "A new course has been added" });
  }

  //   const newCourse = { id: courseList.length + 1, ...req.body };

  //   courseList.push(newCourse);

  //   res.status(200).json({ message: "A new course has been added" });
});

// DELETE a course from the list
courseRouter.delete("/api/courses/:id", (req, res) => {
  // find the index of the course in  the list
  const courseIndex = courseList.findIndex((course) => {
    return course.id === parseInt(req.params.id);
  });

  // console.log("index", courseIndex);
  // if course doesn't exist, tell client tit doesn't
  if (courseIndex < 1) {
    return res.status(200).json({ message: "Can't find course in the list" });
  }

  // Delete and inform client deleted
  courseList.splice(courseIndex, 1);

  return res.status(200).json({ message: "Course deleted successfully!" });
});

// Helper Function
// INPUT: an object paramter that contain property to validate
// OUTPUT: return outcome of the validation
function validate(inputObj) {
  const value = schema.validate(inputObj);
  return value;
}

module.exports = courseRouter;
