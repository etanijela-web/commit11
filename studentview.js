export class StudentView {

    constructor() {
        this.form = document.getElementById("studentForm");
        this.message = document.getElementById("message");
        this.jsonOutput = document.getElementById("jsonOutput");
        this.studentList = document.getElementById("studentList");
    }

    getFormData() {

        const selectedCourses = [
            ...document.querySelectorAll(
                'input[name="course"]:checked'
            )
        ].map(course => course.value);

        return {
            studentID:
                document.getElementById("studentID").value.trim(),

            name:
                document.getElementById("studentName").value.trim(),

            email:
                document.getElementById("email").value.trim(),

            phone:
                document.getElementById("phone").value.trim(),

            island:
                document.getElementById("island").value.trim(),

            province:
                document.getElementById("province").value,

            programme:
                document.getElementById("programme").value,

            courses: selectedCourses
        };
    }

    showMessage(text) {
        this.message.textContent = text;
    }

    showJSON(json) {
        this.jsonOutput.textContent = json;
    }

    clearErrors() {
        document.querySelectorAll(".error")
            .forEach(element => {
                element.textContent = "";
            });
    }

    showError(elementID, message) {
        document.getElementById(elementID)
            .textContent = message;
    }

    resetForm() {
        this.form.reset();
    }

    displayStudents(students) {

        this.studentList.innerHTML = "";

        students.forEach(student => {

            const card = document.createElement("div");
            card.className = "student-card";

            card.innerHTML = `
                <h3>${student.name}</h3>
                <p><strong>ID:</strong> ${student.studentID}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Phone:</strong> ${student.phone}</p>
                <p><strong>Programme:</strong> ${student.programme}</p>
                <p><strong>Location:</strong>
                ${student.address.island},
                ${student.address.province}</p>
                <p><strong>Courses:</strong>
                ${student.courses.join(", ")}</p>
            `;

            this.studentList.appendChild(card);
        });
    }
}
