import { StudentView }
    from "./view/StudentView.js";

import { StudentController }
    from "./controller/StudentController.js";

const view = new StudentView();

const controller =
    new StudentController(view);
