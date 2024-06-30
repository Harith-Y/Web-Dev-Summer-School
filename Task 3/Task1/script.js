document
  .getElementById("courseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const numCourses = document.getElementById("numCourses").value;
    generateCourseInputs(numCourses);
  });

function generateCourseInputs(numCourses) {
  const courseInputs = document.getElementById("courseInputs");
  courseInputs.innerHTML = "";
  for (let i = 0; i < numCourses; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
            <label for="courseCode${i}">Course Code:</label>
            <input type="text" id="courseCode${i}" required>
            <label for="grade${i}">Grade:</label>
            <input type="text" id="grade${i}" required>
        `;
    courseInputs.appendChild(div);
  }
  document.getElementById("calculateButton").style.display = "block";
}

document
  .getElementById("calculateButton")
  .addEventListener("click", function () {
    const numCourses = document.getElementById("numCourses").value;
    let totalCredits = 0;
    let totalWeightedCredits = 0;

    for (let i = 0; i < numCourses; i++) {
      const courseCode = document
        .getElementById(`courseCode${i}`)
        .value.toUpperCase();
      const grade = document.getElementById(`grade${i}`).value.toUpperCase();
      const courseDetail = course_details.courseDetails.find(
        (course) => course.code === courseCode
      );

      if (courseDetail) {
        const gradeWeight = grades_details[grade];
        const credits = parseInt(courseDetail.credits);

        if (gradeWeight !== undefined && !isNaN(credits)) {
          totalCredits += credits;
          totalWeightedCredits += credits * gradeWeight;
        }
      }
    }

    const cgpa = totalWeightedCredits / totalCredits;
    document.getElementById(
      "cgpaResult"
    ).innerText = `Your CGPA is: ${cgpa.toFixed(2)}`;
  });
