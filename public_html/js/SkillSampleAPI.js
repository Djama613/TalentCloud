var SkillSampleAPI = {};

SkillSampleAPI.wrapperClass = "applicant-evidence__skill-attribute--sample";

SkillSampleAPI.SkillSample = function (criteria_id) {
    this.criteria_id = criteria_id;
    this.name = null;
    this.type = null;
    this.date_created = null;
    this.http_link = null;
    this.story = null;

    this.isComplete = function () {
        //!= instead of !== is on purpose; want to check that none are empty strings or null
        return (this.criteria_id &&
                this.name &&
                this.type &&
                this.date_created &&
                this.http_link &&
                this.story);
    };
    
    /**
     * Return true if this object is ready to be saved to server
     * @return {Boolean}
     */
    this.isValid = function () {
        return this.criteria_id != false;
    };
    
    this.isEmpty = function() {
        return (this.name == null &&
                this.type == null &&
                this.date_created == null &&
                this.http_link == null &&
                this.story == null);
    };
    
    this.nullifyEmptyFields = function() {
        this.name = this.name ? this.name : null;
        this.type = this.type ? this.type : null;
        this.date_created = this.date_created ? this.date_created : null;
        this.http_link = this.http_link ? this.http_link : null;
        this.story = this.story ? this.story : null;
    };
};

    SkillSampleAPI.parseApplicationSkillSampleResponse = function(responseJson) {
        var samples = [];
        for (var i=0; i<responseJson.length; i++) {
            var applicationItem = responseJson[i];
            var item = applicationItem.work_sample;

            var criteria_id = applicationItem.criteria_id;
            var name = item.work_sample_name;
            var type = item.file_type;
            var date_created = item.work_sample_date_created;
            var http_link = item.work_sample_url;
            var story = item.work_sample_story;

            var sample = new SkillSampleAPI.SkillSample(criteria_id);
            sample.name = name;
            sample.type = type;
            sample.date_created = date_created;
            sample.http_link = http_link;
            sample.story = story;
            
            samples.push(sample);
        }
        return samples;
    };

        SkillSampleAPI.loadSavedSkillSamplesForJobApplication = function (jobApplicationId) {
            DataAPI.getSkillSamplesForApplication(jobApplicationId, function (request) {
                //Check that request returned a valid response
                if (request.status === 200 && request.response) {
                    var samples = SkillSampleAPI.parseApplicationSkillSampleResponse(JSON.parse(request.response));
                    SkillSampleAPI.populateApplicationUiSkillSamples(samples);
                }
            });
        };

        SkillSampleAPI.populateApplicationUiSkillSamples = function (samples) {
            for (var i=0; i<samples.length; i++) {
                var sample = samples[i];

                //find appropriate Evidence Panel
                var panel = document.querySelector('.applicant-evidence__skill[data-criteria-id="' + sample.criteria_id + '"]');
                //if panel exists, set saved values
                if (panel) {
                    var name = panel.querySelector('input[name=\"sample_name\"]');
                    if (name) {
                        name.value = sample.name;
                    }
                    var type = panel.querySelector('select[name=\"sample_type\"]');
                    if (type) {
                        type.value = sample.type;
                    }
                    var date_created = panel.querySelector('input[name=\"sample_date_created\"]');
                    if (date_created) {
                        date_created.value = sample.date_created;
                    }
                    var http_link = panel.querySelector('input[name=\"sample_http_link\"]');
                    if (http_link) {
                        http_link.value = sample.http_link;
                    }
                    var story = panel.querySelector('textarea[name=\"sample_story\"]');
                    if (story) {
                        story.value = sample.story;
                    }

                    //Run status change handler, because declartion may now be complete
                    SkillSampleAPI.onStatusChange(sample.criteria_id);
                    
                    //if new sample is not empty, make sure it appears in ui
                    //And show status as currently saved
                    if (!sample.isEmpty()) {
                        var showButton = panel.querySelector(".applicant-evidence__optional-button--sample");
                        EvidenceAPI.addWorkSample(showButton);
                        
                        EvidenceAPI.setUiSaved(sample.criteria_id, SkillSampleAPI, true);
                    }
                }
            }
        };

        SkillSampleAPI.populateApplicationPreviewUiSkillSamples = function (samples) {
            for (var i=0; i<samples.length; i++) {
                var sample = samples[i];

                //find appropriate Evidence Panel
                var panel = document.querySelector('.applicant-evidence-preview__accordion-wrapper[data-criteria-id="' + sample.criteria_id + '"]');
                //if panel exists, set saved values
                if (panel) {
                    var name = panel.querySelector('.applicant-evidence-preview__evidence-name');
                    if (name) {
                        name.innerHTML = sample.name;
                    }
                    /*
                    var type = panel.querySelector('select[name=\"sample_type\"]');
                    if (type) {
                    type.innerHTML = ref.type;
                }
                */
                var date_created = panel.querySelector('.applicant-evidence-preview__evidence-date');
                if (date_created) {
                    date_created.innerHTML = sample.date_created;
                }
                var http_link = panel.querySelector('.applicant-evidence-preview__evidence-link');
                if (http_link) {
                    http_link.href = sample.http_link;
                }
                var story = panel.querySelector('.applicant-evidence-preview__evidence-story');
                if (story) {
                    story.innerHTML = sample.story;
                }

                //Hide null-response, and show data
                var refContent = panel.querySelector('.applicant-evidence-preview__evidence-content');
                refContent.classList.remove("hidden");
                var nullResponse = panel.querySelector('.applicant-evidence-preview__evidence-null');
                nullResponse.classList.add("hidden");
            }
        }
    };



    /**
    * Saves all completed samples for criteria of given type,
    * while Deleteing all incomplete samples of the given type.
    *
    * If criteriaType is undefined, it saves/deletes ALL completed skill declarations.
    *
    * Call onSuccess if all SkillSamples are saved/deleted successfully
    * Call onFailure if some/all requests returned with unexpected status
    *
    * @param {string} criteriaType
    * @param {function} onSuccess
    * @return {undefined}
    */
    SkillSampleAPI.saveSkillSamples = function (criteriaType, onSuccess, onFailure) {
        if (criteriaType) {
            var evidencePanels = document.querySelectorAll(".applicant-evidence__skill[data-criteria-type=\"" + criteriaType + "\"]:not(.template)");
        } else if (criteriaType === undefined) {
            var evidencePanels = document.querySelectorAll(".applicant-evidence__skill:not(.template)");
        } else {
            Utilities.debug ? console.log("Cannot save Skill Samples with given type.") : null;
            return;
        }

        var submittedRequests = 0; //to keep track of number of HTTP calls in progress
        var requestsSuccessful = true;

        var applicationId = document.getElementById("jobApplicationJobApplicationId").value;

        if (!applicationId) {
            Utilities.debug ? console.log("Cannot save Skill Samples without an Application Id") : null;
            return;
        }

        for (var i=0; i<evidencePanels.length; i++) {
            var panel = evidencePanels[i];
            var sample = SkillSampleAPI.getSkillSampleFromEvidencePanel(panel);

            //Only save if this sample is complete
            if (sample.isValid()) {
                submittedRequests = submittedRequests + 1;
                DataAPI.saveSkillSample(sample, sample.criteria_id, applicationId, function (response) {
                    if (response.status !== 200) {
                        requestsSuccessful = false;
                    }
                    submittedRequests = submittedRequests - 1;
                    if (submittedRequests === 0) {
                        if (onSuccess && requestsSuccessful) {
                            //Only call onSuccess if all requests have been successful
                            onSuccess();
                        } else if (onFailure && !requestsSuccessful) {
                            onFailure();
                        }
                    }
                });
            } else {
                //If sample is not valid (ie not complete), do nothing
            }
        }

        if (onSuccess && submittedRequests === 0) {
            //If no requests were made, call onSuccess
            onSuccess();
        }
    };

    /**
    * @param {string} criteriaId
    * @param {function} onSuccess
    * @return {undefined}
    */
    SkillSampleAPI.saveSingleSkillSample = function (criteriaId, onSuccess, onFailure) {

        var panel = document.querySelector(".applicant-evidence__skill[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");

        var applicationId = document.getElementById("jobApplicationJobApplicationId").value;

        if (!applicationId) {
            Utilities.debug ? console.log("Cannot save Skill Samples without an Application Id") : null;
            return;
        }
        var sample = SkillSampleAPI.getSkillSampleFromEvidencePanel(panel);

        //Only save if this sample is complete
        if (sample.isValid()) {
            DataAPI.saveSkillSample(sample, sample.criteria_id, applicationId, function (response) {
                if (response.status === 200) {
                    if (onSuccess)
                    onSuccess();
                } else {
                    if (onFailure) {
                        window.alert(response.response.message);
                        onFailure();
                    }
                }

            });
        } else {
            window.alert("Skill sample invalid, cannot save");
            //If sample is not valid (ie not complete), do nothing
        }
    };
    
    SkillSampleAPI.deleteSkillSample = function(criteriaId) {
        var panel = document.querySelector(".applicant-evidence__skill[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");
        panel.querySelector('input[name=\"sample_name\"]').value = "";
        panel.querySelector('select[name=\"sample_type\"]').value = "";
        panel.querySelector('input[name=\"sample_date_created\"]').value = "";
        panel.querySelector('input[name=\"sample_http_link\"]').value = "";
        panel.querySelector('textarea[name=\"sample_story\"]').value = "";
        
        var applicationId = document.getElementById("jobApplicationJobApplicationId").value;
        
        if (applicationId) {
            DataAPI.deleteSkillSample(criteriaId, applicationId, function(request) {
                //TODO: deal with delete response?
            });
        }
        
        SkillSampleAPI.onStatusChange(criteriaId);
    };

    SkillSampleAPI.getSkillSampleFromEvidencePanel = function (panel) {
        var criteria_id = panel.getAttribute("data-criteria-id");
        var sample = new SkillSampleAPI.SkillSample(criteria_id);

        var name = panel.querySelector('input[name=\"sample_name\"]');
        if (name) {
            sample.name = name.value;
        }
        var type = panel.querySelector('select[name=\"sample_type\"]');
        if (type) {
            sample.type = type.value;
        }
        var date_created = panel.querySelector('input[name=\"sample_date_created\"]');
        if (date_created) {
            sample.date_created = date_created.value;
        }
        var http_link = panel.querySelector('input[name=\"sample_http_link\"]');
        if (http_link) {
            sample.http_link = http_link.value;
        }
        var story = panel.querySelector('textarea[name=\"sample_story\"]');
        if (story) {
            sample.story = story.value;
        }
        
        sample.nullifyEmptyFields();
        return sample;
    };

    SkillSampleAPI.onStatusChange = function (criteriaId) {
        //If status changes, this can no longer be in a saved state
        EvidenceAPI.setUiSaved(criteriaId, SkillSampleAPI, false);

        var panel = document.querySelector(".applicant-evidence__skill[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");

        var sample = SkillSampleAPI.getSkillSampleFromEvidencePanel(panel);

        //Use validity to determine Completeness status
        EvidenceAPI.setUiComplete(criteriaId, SkillSampleAPI, sample.isComplete());
        
        EvidenceAPI.onStatusUpdate();
    };