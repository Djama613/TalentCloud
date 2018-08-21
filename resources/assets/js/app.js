// =============================================================================

    // Utilities JavaScript (jQuery)

// =============================================================================

(function($) {

    // Add isValid()

        $.fn.isValid = function(){
            return this[0].checkValidity()
        }

    $(document).ready(function() {

        // Accordion Handlers ==================================================

            function accordionTrigger(trigger) {
                if ($(trigger).parent(".accordion").hasClass("active")) {
                    $(trigger).attr("aria-expanded", "false");
                    $(trigger).parent(".accordion").removeClass("active");
                    $(trigger).parent(".accordion").find(".accordion-content").attr("aria-hidden", "true");
                }
                else {
                    $(trigger).attr("aria-expanded", "true");
                    $(trigger).parent(".accordion").addClass("active");
                    $(trigger).parent(".accordion").find(".accordion-content").attr("aria-hidden", "false");
                }
            }

            $(document).on("click", ".accordion-trigger", function(e){

                accordionTrigger(this);

            });

            $(document).on("keyup", ".accordion-trigger", function(e){

                if(e.which == 13) {
                    accordionTrigger(this);
                }

            });

        // Form Handlers =======================================================

            // Required Fields

                function requiredFields() {
                    $("input:required, textarea:required").each(function(e) {
                        $(this).parent().addClass("required");
                        $(this).parent().find("label").append("<span class='form__required'><i class='fa fa-asterisk' aria-label='Asterisk'></i></span>");
                    });
                }

                requiredFields();

            // Label Handers ===================================================

                function labelHandlers() {

                    $("[class*='form__input-wrapper'] input, [class*='form__input-wrapper'] textarea").focusin(function(e) {
                        $(this).parent().addClass("active");
                    });

                    $("[class*='form__input-wrapper'] input, [class*='form__input-wrapper'] textarea").focusout(function(e) {

                        // Check for existing value.

                            if ($(this).val() == "") {
                                $(this).parent().removeClass("active");
                            }

                        // Check Validity

                            if ($(this).isValid() == true) {

                                if ($(this).val() == "" || $(this).attr("type") == "password") {
                                    $(this).parent().removeClass("valid");
                                    $(this).parent().removeClass("invalid");
                                }
                                else {
                                    $(this).parent().addClass("valid");
                                    $(this).parent().removeClass("invalid");
                                }

                            }
                            else {

                                if ($(this).attr("type") == "password") {
                                    return false;
                                }
                                else {
                                    $(this).parent().addClass("invalid");
                                    $(this).parent().removeClass("valid");
                                }

                            }

                    });

                }

                labelHandlers();

        // Experience Handlers =================================================

            // Degrees

                function addDegree(trigger) {

                    // Get Wrapper
                    var wrapper = $(".application-post__experience-wrapper");

                    // Get Template
                    var template = $(".application-post__accordion--degree.template").clone();

                    // Get New ID
                    var newID = parseInt(wrapper.find("[class*='application-post__accordion--']").last().attr("data-experience-id")) + 1;

                    // Remove Template Class
                    template.removeClass("template");

                    // Assign the New ID
                    template.attr("data-experience-id", newID);

                    // Edit Form IDs

                        // Degree Type
                        template.find("[data-form-id*='experience-degree']").find("label").attr("for", "degree" + newID);
                        template.find("[data-form-id*='experience-degree']").find("select").attr("id", "degree" + newID);

                        // Area of Study
                        template.find("[data-form-id*='experience-aos']").find("label").attr("for", "areaOfStudy" + newID);
                        template.find("[data-form-id*='experience-aos']").find("input").attr("id", "areaOfStudy" + newID);

                        // Institution
                        template.find("[data-form-id*='experience-institution']").find("label").attr("for", "institution" + newID);
                        template.find("[data-form-id*='experience-institution']").find("input").attr("id", "institution" + newID);

                        // Start Date
                        template.find("[data-form-id*='experience-start-date']").find("label").attr("for", "startDate" + newID);
                        template.find("[data-form-id*='experience-start-date']").find("input").attr("id", "startDate" + newID);

                        // End Date
                        template.find("[data-form-id*='experience-end-date']").find("label").attr("for", "endDate" + newID);
                        template.find("[data-form-id*='experience-end-date']").find("input").attr("id", "endDate" + newID);

                    // Append Clone to the Wrapper
                    wrapper.append(template);

                    requiredFields();
                    labelHandlers();

                }

                $("#addDegreeButton").on("click", function(e) {

                    e.preventDefault();

                    addDegree(this);

                });

                $("#addDegreeButton").on("keyup", function(e) {

                    if(e.which == 13) {
                        e.preventDefault();
                        addDegree(this);
                    }

                });

            // Courses

                function addCourse(trigger) {

                    // Get Wrapper
                    var wrapper = $(".application-post__experience-wrapper");

                    // Get Template
                    var template = $(".application-post__accordion--course.template").clone();

                    // Get New ID
                    var newID = parseInt(wrapper.find("[class*='application-post__accordion--']").last().attr("data-experience-id")) + 1;

                    // Remove Template Class
                    template.removeClass("template");

                    // Assign the New ID
                    template.attr("data-experience-id", newID);

                    // Edit Form IDs

                        // Course Name
                        template.find("[data-form-id*='experience-course-name']").find("label").attr("for", "courseName" + newID);
                        template.find("[data-form-id*='experience-course-name']").find("input").attr("id", "courseName" + newID);

                        // Institution
                        template.find("[data-form-id*='experience-institution']").find("label").attr("for", "institution" + newID);
                        template.find("[data-form-id*='experience-institution']").find("input").attr("id", "institution" + newID);

                        // Start Date
                        template.find("[data-form-id*='experience-start-date']").find("label").attr("for", "startDate" + newID);
                        template.find("[data-form-id*='experience-start-date']").find("input").attr("id", "startDate" + newID);

                        // End Date
                        template.find("[data-form-id*='experience-end-date']").find("label").attr("for", "endDate" + newID);
                        template.find("[data-form-id*='experience-end-date']").find("input").attr("id", "endDate" + newID);

                    // Append Clone to the Wrapper
                    wrapper.append(template);

                    requiredFields();
                    labelHandlers();

                }

                $("#addCourseButton").on("click", function(e) {

                    e.preventDefault();

                    addCourse(this);

                });

                $("#addCourseButton").on("keyup", function(e) {

                    if(e.which == 13) {
                        e.preventDefault();
                        addCourse(this);
                    }

                });

            // Work

                function addWork(trigger) {

                    // Get Wrapper
                    var wrapper = $(".application-post__experience-wrapper");

                    // Get Template
                    var template = $(".application-post__accordion--work.template").clone();

                    // Get New ID
                    var newID = parseInt(wrapper.find("[class*='application-post__accordion--']").last().attr("data-experience-id")) + 1;

                    // Remove Template Class
                    template.removeClass("template");

                    // Assign the New ID
                    template.attr("data-experience-id", newID);

                    // Edit Form IDs

                        // Role
                        template.find("[data-form-id*='experience-course-name']").find("label").attr("for", "role" + newID);
                        template.find("[data-form-id*='experience-course-name']").find("input").attr("id", "role" + newID);

                        // Group / Company
                        template.find("[data-form-id*='experience-institution']").find("label").attr("for", "group" + newID);
                        template.find("[data-form-id*='experience-institution']").find("input").attr("id", "group" + newID);

                        // Description
                        template.find("[data-form-id*='experience-description']").find("label").attr("for", "description" + newID);
                        template.find("[data-form-id*='experience-description']").find("input").attr("id", "description" + newID);

                        // Start Date
                        template.find("[data-form-id*='experience-start-date']").find("label").attr("for", "startDate" + newID);
                        template.find("[data-form-id*='experience-start-date']").find("input").attr("id", "startDate" + newID);

                        // End Date
                        template.find("[data-form-id*='experience-end-date']").find("label").attr("for", "endDate" + newID);
                        template.find("[data-form-id*='experience-end-date']").find("input").attr("id", "endDate" + newID);

                    // Append Clone to the Wrapper
                    wrapper.append(template);

                    requiredFields();
                    labelHandlers();

                }

                $("#addWorkButton").on("click", function(e) {

                    e.preventDefault();

                    addWork(this);

                });

                $("#addWorkButton").on("keyup", function(e) {

                    if(e.which == 13) {
                        e.preventDefault();
                        addWork(this);
                    }

                });

        // Create Job Handlers =================================================

            // Tasks

                function addTask(trigger) {

                    // Get Wrapper
                    var wrapper = $(".manager-jobs__create-task-wrapper");

                    // Get Template
                    var template = $(".manager-jobs__create-task.template").clone();

                    console.log(wrapper.find(".manager-jobs__create-task"));

                    // Get New ID
                    if (wrapper.find(".manager-jobs__create-task").length == 0) {
                        var newID = parseInt(template.attr("data-task-id")) + 1;
                    }
                    else {
                        var newID = parseInt(wrapper.find("[class*='manager-jobs__create-task']").last().attr("data-task-id")) + 1;
                    }

                    // Remove Template Class
                    template.removeClass("template");

                    // Assign the New ID
                    template.attr("data-task-id", newID);

                    // Edit Form IDs

                        // Task (English)
                        template.find("[data-form-id*='task-english']").find("label").attr("for", "taskEN" + newID);
                        template.find("[data-form-id*='task-english']").find("input").attr("id", "taskEN" + newID);

                        // Task (French)
                        template.find("[data-form-id*='task-french']").find("label").attr("for", "taskFR" + newID);
                        template.find("[data-form-id*='task-french']").find("input").attr("id", "taskFR" + newID);

                    // Append Clone to the Wrapper
                    wrapper.append(template);

                    requiredFields();
                    labelHandlers();
                    deleteTaskTrigger();

                }

                $("#addTaskButton").on("click", function(e) {

                    e.preventDefault();

                    addTask(this);

                });

                $("#addTaskButton").on("keyup", function(e) {

                    if(e.which == 13) {
                        e.preventDefault();
                        addTask(this);
                    }

                });

                // Task Deletion

                function deleteTask(trigger) {

                    $(trigger).parents(".manager-jobs__create-task").remove();

                }

                function deleteTaskTrigger() {

                    $(".manager-jobs__delete-task-button").on("click", function(e) {

                        e.preventDefault();

                        deleteTask(this);

                    });

                    $(".manager-jobs__delete-task-button").on("keyup", function(e) {

                        if(e.which == 13) {
                            e.preventDefault();
                            deleteTask(this);
                        }

                    });

                }

                deleteTaskTrigger();

            // Skills

            // Questions

                function addQuestion(trigger) {

                    // Get Wrapper
                    var wrapper = $(".manager-jobs__create-question-wrapper");

                    // Get Template
                    var template = $(".manager-jobs__create-question.template").clone();

                    console.log(wrapper.find(".manager-jobs__create-question"));

                    // Get New ID
                    if (wrapper.find(".manager-jobs__create-question").length == 0) {
                        var newID = parseInt(template.attr("data-question-id")) + 1;
                    }
                    else {
                        var newID = parseInt(wrapper.find("[class*='manager-jobs__create-question']").last().attr("data-question-id")) + 1;
                    }

                    // Remove Template Class
                    template.removeClass("template");

                    // Assign the New ID
                    template.attr("data-question-id", newID);

                    // Edit Form IDs

                        // Queestion (English)
                        template.find("[data-form-id*='question-english']").find("label").attr("for", "questionEN" + newID);
                        template.find("[data-form-id*='question-english']").find("input").attr("id", "questionEN" + newID);

                        // Queestion (French)
                        template.find("[data-form-id*='question-french']").find("label").attr("for", "questionFR" + newID);
                        template.find("[data-form-id*='question-french']").find("input").attr("id", "questionFR" + newID);

                    // Append Clone to the Wrapper
                    wrapper.append(template);

                    requiredFields();
                    labelHandlers();
                    deleteQuestionTrigger();

                }

                $("#addQuestionButton").on("click", function(e) {

                    e.preventDefault();

                    addQuestion(this);

                });

                $("#addQuestionButton").on("keyup", function(e) {

                    if(e.which == 13) {
                        e.preventDefault();
                        addQuestion(this);
                    }

                });

                // Task Deletion

                function deleteQuestion(trigger) {

                    $(trigger).parents(".manager-jobs__create-question").remove();

                }

                function deleteQuestionTrigger() {

                    $(".manager-jobs__delete-question-button").on("click", function(e) {

                        e.preventDefault();

                        deleteQuestion(this);

                    });

                    $(".manager-jobs__delete-question-button").on("keyup", function(e) {

                        if(e.which == 13) {
                            e.preventDefault();
                            deleteQuestion(this);
                        }

                    });

                }

                deleteQuestionTrigger();

    });

})(jQuery);