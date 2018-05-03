<?php // BEGIN - View Job Poster Section ?>
<section class="pageContent hidden" id="viewJobPosterSection">
    <!-- <div class="pageBanner">
        <div id="jobPosterHeaderSection" class="container">
            <h2 class="section--title" id="viewJobPosterTitle">Browse Jobs</h2>
            <h3 id="jobPosterTitle">Job Title</h3>
            <p id="jobPosterLocation">
                <span id="jobPosterDepartment"></span>
            </p>
            <p id="jobPosterId"><span id="jobPosterIdLabel">Reference ID</span> #<span id="jobPosterIdValue"></span></p>
            <p><span id="jobPosterCity"></span>, <span id="jobPosterProvince"></span> (<span id="jobPosterRemoteWorkHeader">Remote work</span>)</p>
            <input id="jobPosterJobId" type="hidden"/>
        </div>
    </div> -->
    <div class="pageBody">
        <section id="jobPosterDatapointsSection">
            <div class="block-container">
                <ul class="jobPosterDatapoints">
                    <li>
                        <span id="jobPosterJobLevelLabel">Classification</span> <span id="jobPosterJobLevelValue"></span>
                    </li>
                    <li>
                        <span id="jobPosterSalaryRangeLabel">Compensation</span> <span id="jobPosterSalaryRangeValue"></span>
                    </li>
                    <li>
                        <span id="jobPosterClearanceLevelLabel">Security clearance level</span> <span id="jobPosterClearanceLevelValue"></span>
                    </li>
                    <li>
                        <span id="jobPosterLanguageLabel">Language</span> <span id="jobPosterLanguageValue"></span>
                    </li>
                    <li>
                        <span id="jobPosterTermLabel">Duration</span> <span id="jobPosterTermValue"></span>
                    </li>
                    <li>
                        <span id="jobPosterStartDateLabel">Target start date</span> <span id="jobPosterStartDateValue"></span>
                    </li>
                </ul>
            </div>
        </section>
        <section class='jobPosterSection'>
            <div class="block-container">
                <h4 id="jobPosterImpactLabel" class="jobPosterSectionTitle">Impact</h4>
                <p id="jobPosterImpact"></p>
            </div>
        </section>
        <section class='jobPosterSection'>
            <div class="block-container">
                <h4 id="jobPosterKeyTasksLabel" class="jobPosterSectionTitle">Key Tasks</h4>
                <ul id="jobPosterKeyTasks"></ul>
            </div>
        </section>
        <section class='jobPosterSection'>
            <div class="block-container">
                <h4 id="jobPosterCoreCompetenciesLabel" class="jobPosterSectionTitle">Essential Criteria</h4>
                <ul id="jobPosterCoreCompetencies"></ul>
            </div>
        </section>
        <section class='jobPosterSection'>
            <div class="block-container">
                <h4 id="jobPosterDevelopingCompetenciesLabel" class="jobPosterSectionTitle">Asset Criteria</h4>
                <ul id="jobPosterDevelopingCompetencies"></ul>
            </div>
        </section>
        <section class='jobPosterSection'>
            <div class='block-container'>
                <h4 id="jobPosterHiringManagerLabel" class="jobPosterSectionTitle">Hiring Manager</h4>
                <input type='hidden' id='jobPosterHiringManagerUserId'/>

                <div class="hiringManagerSummaryWrapper">
                    <div id='hiringManagerSummaryImageWrapper'>
                        <img id='jobPosterHiringManagerProfilePic' alt="Hiring Manager" src="images/user.png">
                        <p id='jobPosterHiringManagerName' class="hiringManagerSummaryName"></p>
                    </div>
                    <div id='hiringManagerSummaryContentWrapper' >
                        <div class="hiringManagerSummary"><span id='jobPosterHiringManagerTitle'></span> <span id="jobPosterHiringManagerPositionAtLabel">at</span> <span id='jobPosterHiringManagerDepartment'></span></div>
                        <p id='jobPosterHiringManagerAboutMe' class="truncate"></p>
                        <div id='hiringManagerSummaryButtonWrapper'>
                            <button id="jobPosterHiringManagerButton" class="btn btn-primary" onclick="ManagerProfileAPI.showManagerProfile(document.getElementById('jobPosterHiringManagerUserId').value);">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class='jobPosterSection'>
            <div class="block-container">
                <h4 id="jobPosterWorkEnvironmentLabel" class="jobPosterSectionTitle">Work Environment</h4>
                <div class="workEnvironmentAnswerWrapper">
                    <p><span id='jobPosterRemoteWork_label'>Remote location allowed</span>: <span class="workEnvironmentAnswer" id="jobPosterRemoteWork"></span></p>
                    <p><span id='jobPosterTelework_label'>Telework allowed</span>: <span class="workEnvironmentAnswer" id="jobPosterTelework"></span></p>
                    <p><span id='jobPosterFlexHours_label'>Flexible hours allowed</span>: <span class="workEnvironmentAnswer" id="jobPosterFlexHours"></span></p>
                </div>
                <div class="workEnvironmentSummaryWrapper">
                    <div id='workEnvironmentSummaryImagesWrapper'>

                        <?php // New Workplace Photo Layout ?>
                        <div class="flex-grid top job-poster__work-environment-photo-grid">


                            <div class="box med-1of2 lg-1of3 job-poster__work-environment-photo-grid-item">
                                <div class="box med-1of2 lg-1of3 job-poster__work-environment-photo" id="jobPosterWorkEnvironment_1" title="First image of workplace environment" style="background-image: url('images/default_workplace_photo.png');"></div>
                            </div>
                            <div class="box med-1of2 lg-1of3 job-poster__work-environment-photo-grid-item">
                                <div class="box med-1of2 lg-1of3 job-poster__work-environment-photo" id="jobPosterWorkEnvironment_2" title="Second image of workplace environment" style="background-image: url('images/default_workplace_photo.png');"></div>
                            </div>
                            <div class="box med-1of2 lg-1of3 job-poster__work-environment-photo-grid-item">
                                <div class="box med-1of2 lg-1of3 job-poster__work-environment-photo" id="jobPosterWorkEnvironment_3" title="Third image of workplace environment" style="background-image: url('images/default_workplace_photo.png');"></div>
                            </div>

                        </div>
                    </div>
                </div>
        </section>
        <section class="jobPosterSection">
            <div class="block-container">
                <h4 id="jobPosterTeamCultureLabel" class="jobPosterSectionTitle">Team Culture</h4>
                <div class="container">
                    <div class="container">
                        <p><span id='jobPosterTeamSize_label'>Team size:</span> <span class="blue-highlight-text" id="jobPosterTeamSize"></span></p>
                        <p><span id='jobPosterGcDirLink_label'>Meet the team in</span> <a id="jobPosterGcDirLink" href="#" target="_blank">GCdirectory</a></p>
                        <p><span id="jobPosterTeamNarrativeText_label">About the team:</span> <span id="jobPosterTeamNarrativeText"></span></p>
                        <p><span id="jobPosterOperatingContext_label">Our operating context:</span> <span id="jobPosterOperatingContext_text"></span></p>
                        <p><span id="jobPosterWhatWeValue_label">What we value:</span> <span id="jobPosterWhatWeValue_text"></span></p>
                        <p><span id="jobPosterHowWeWork_label">How we work:</span> <span id="jobPosterHowWeWork_text"></span></p>
                    </div>
                </div>
            </section>
            <section class="jobPosterSection">
                <div class="container">
                    <div class="accommodationRequest flex-grid middle">
                        <div class="box small-2of10 lg-1of10">
                            <i class="fas fa-hand-holding-heart fa-4x"></i>
                        </div>
                        <div class="box small-8of10 lg-9of10 accommodationRequestText">
                            <span id="accommodationTextStart">Please advise</span>
                            <span id="jobPosterHiringManagerNameAccommodation"></span>
                            <span id="accommodationRequestAt">at</span>
                            <a id="jobPosterHiringManagerEmail"></a>
                            <span id="accommodationTextEnd">of any accomodations you may require during the selection.</span>
                        </div>
                    </div>
                </div>
            </section>
            <div id="jobPosterButtonWrapper">
                <button id="jobPosterApplyButton" class="btn btn-primary" value="View" onclick="JobApplicationAPI.showCreateJobApplication(document.getElementById('jobPosterJobId').value)">
                    Apply Now
                </button>
            </div>
        </div>
    </section>
    <?php // END - View Job Poster Section ?>
