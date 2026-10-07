export class Student {

    #studentID;
    #name;
    #email;
    #phone;

    constructor({
        studentID,
        name,
        email,
        phone,
        island,
        province,
        programme,
        courses
    }) {

        this.#studentID = studentID;
        this.#name = name;
        this.#email = email;
        this.#phone = phone;

        this.address = {
            island: island,
            province: province
        };

        this.programme = programme;
        this.courses = courses;
    }

    get studentID() {
        return this.#studentID;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get phone() {
        return this.#phone;
    }

    displayProfile() {
        return `${this.#studentID} - ${this.#name}`;
    }

    toJSON() {
        return {
            studentID: this.#studentID,
            name: this.#name,
            email: this.#email,
            phone: this.#phone,
            programme: this.programme,
            address: this.address,
            courses: this.courses
        };
    }
}
