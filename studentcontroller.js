import { Student } from "../model/Student.js";

export class StudentController {

    constructor(view) {
        this.view = view;
        this.students = [];
        this.latestJSON = "";

        this.registerEvents();
    }

    registerEvents() {

        this.view.form.addEventListener(
            "submit",
            event => this.handleRegistration(event)
        );

        document.getElementById("downloadJSON")
            .addEventListener(
                "click",
                () => this.downloadJSON()
            );
    }

    validate(data) {

        let valid = true;

        this.view.clearErrors();

        const studentIDRegex = /^STU\d{3}$/;
        const nameRegex = /^[A-Za-zÀ-ÿ' -]{2,50}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{7}$/;

        if (!studentIDRegex.test(data.studentID)) {
            this.view.showError(
                "studentIDError",
                "Use format STU001."
            );
            valid = false;
        }

        if (!nameRegex.test(data.name)) {
            this.view.showError(
                "nameError",
                "Enter a valid student name."
            );
            valid = false;
        }

        if (!emailRegex.test(data.email)) {
            this.view.showError(
                "emailError",
                "Enter a valid email address."
            );
            valid = false;
        }

        if (!phoneRegex.test(data.phone)) {
            this.view.showError(
                "phoneError",
                "Phone must contain exactly 7 digits."
            );
            valid = false;
        }

        if (data.courses.length === 0) {
            this.view.showError(
                "courseError",
                "Select at least one course."
            );
            valid = false;
        }

        return valid;
    }

    handleRegistration(event) {

        event.preventDefault();

        const data = this.view.getFormData();

        if (!this.validate(data)) {
            this.view.showMessage(
                "Please correct the errors."
            );
            return;
        }

        const student = new Student(data);

        console.log("Student Class Instance:");
        console.log(student);

        // SERIALIZATION: JavaScript object -> JSON text
        const json = JSON.stringify(student, null, 2);

        this.latestJSON = json;

        console.log("Serialized JSON:");
        console.log(json);

        this.view.showJSON(json);

        this.sendToServer(json);

        this.view.showMessage(
            "Student registered successfully."
        );

        this.view.resetForm();
    }

    sendToServer(jsonData) {

        console.log("Sending JSON to server...");
        console.log(jsonData);

        this.receiveFromServer(jsonData);
    }

    receiveFromServer(jsonData) {

        try {

            // DESERIALIZATION: JSON text -> JavaScript data
            const parsedData = JSON.parse(jsonData);

            console.log("Parsed JavaScript Object:");
            console.log(parsedData);

            const student = new Student({
                studentID: parsedData.studentID,
                name: parsedData.name,
                email: parsedData.email,
                phone: parsedData.phone,
                island: parsedData.address.island,
                province: parsedData.address.province,
                programme: parsedData.programme,
                courses: parsedData.courses
            });

            this.students.push(student);

            this.view.displayStudents(
                this.students
            );

        } catch (error) {

            console.error(error);

            this.view.showMessage(
                "Invalid JSON received."
            );
        }
    }

    downloadJSON() {

        if (this.students.length === 0) {
            this.view.showMessage(
                "Register a student before downloading JSON."
            );
            return;
        }

        const jsonData = JSON.stringify(
            this.students,
            null,
            2
        );

        const blob = new Blob(
            [jsonData],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "students.json";

        link.click();

        URL.revokeObjectURL(url);
    }
}
