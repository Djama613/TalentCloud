/**
 * Utilities contains common constants and functions for data conversion.
 *
 */
var Utilities = {};

Utilities.debug = false;

/*
 * Fix for IE9 bit able to handle console.log
 */
if (!window.console) {
    var console = {};
}
if (!console.log) {
    console.log = function () {};
}

/**
 *
 * @param {type} datestr
 * @returns {String}
 */
Utilities.formatDate = function (datestr) {
    var date = new Date(datestr);
    var year = date.getFullYear(),
            month = date.getMonth() + 1, // months are zero indexed
            day = date.getDate(),
            dayOfWeek = date.getDay(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds(),
            hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
            minuteFormatted = minute < 10 ? "0" + minute : minute,
            morning = hour < 12 ? "AM" : "PM";

    return year + "/" + month + "/" + day + " " + hourFormatted + ":" + minuteFormatted + " " + morning;//12/01/2014 04:30 PM
};

Utilities.formatDateTimeLocal = function (date) {
    var ten = function (i) {
            return (i < 10 ? '0' : '') + i;
        };
    var
        YYYY = date.getFullYear(),
        MM = ten(date.getMonth() + 1),
        DD = ten(date.getDate()),
        HH = ten(date.getHours()),
        II = ten(date.getMinutes()),
        SS = ten(date.getSeconds())
        ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
             HH + ':' + II + ':' + SS;
};

/**
 *
 * @param {type} days
 * @returns {String}
 */
Utilities.convertDaysToYears = function (days) {
    var years = Math.round(days / 365);
    var retStr = years + " Year";
    if (years > 1) {
        retStr += "s";
    }
    retStr += " (" + days + " Days)";
    return  retStr;
};

/**
 * Compares dates formatted as 2018-04-22 12:00:00 (24 hour time format) and returns the difference in hours if difference is less than 24 hours, returns days if less than 32 days and months if greater than or equal to 32 days
 * @param {type} dateObj
 * @returns {String}
 */
Utilities.timeRemaining = function(dateObj){
    //console.log(dateObj);
    var timeRemaining = "";
    var now = new Date();
    var formattedDate = new Date(now.getFullYear()  + "-" + (now.getMonth()+1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());

    var date1 = new Date(dateObj);
    var date2 = formattedDate;
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if(date2 < date1){
        if(diffDays <= 1 ){
            timeRemaining = diffDays + " " + siteContent.jobUnitsToCloseHours;
        }else if(diffDays > 1 && diffDays < 32){
            timeRemaining = diffDays + " " + siteContent.jobUnitsToCloseDays;
        }else{
            timeRemaining = Math.round(diffDays/30) + " " + siteContent.jobUnitsToCloseMonths;
        }
    }else{
        timeRemaining = 0;
    }

    return timeRemaining;
};

/**
 *
 * @param {type} htmlStr
 * @returns {ActiveXObject|xmlData.responseXML|xmlDoc}
 */
Utilities.stringToHTMLObject = function (htmlStr) {
    //console.log(htmlStr);
    var htmlObj = null;
    if (window.DOMParser) {
        var domParser = new DOMParser();
        htmlObj = domParser.parseFromString(htmlStr, "text/xml").firstChild;
    } else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(htmlStr);
        htmlObj = xmlDoc;
    }
    return htmlObj;
};

/**
 *
 * @param {type} htmlObj
 * @returns {unresolved}
 */
Utilities.htmlObjToString = function (htmlObj) {
    var htmlStr = null;
    if (window.XMLSerializer) {
        var xmlSerializer = new XMLSerializer();
        htmlStr = xmlSerializer.serializeToString(htmlObj);
    }
    return htmlStr;
};

/**
 *
 * @param {type} htmlString
 * @returns {unresolved}
 */
Utilities.escapeHTMLString = function (htmlString) {
    return escape(htmlString);
};

/**
 *
 * @param {type} str
 * @returns {unresolved}
 */
Utilities.decodeHtmlEntity = function (str) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
};



/**
 *
 * @param {type} name
 * @returns {String}
 */
Utilities.getValueByParameterName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

/**
 *
 * @param {type} str
 * @param {type} delimiter
 * @returns {unresolved}
 */
Utilities.delimitedStringSort = function (str, delimiter) {
    var values = str.split(delimiter);
    var sortedValues, sortedValuesStr;
    sortedValues = values.sort(function (a, b) {
        return Utilities.sortAlphaNum(a, b);
    });
    sortedValuesStr = sortedValues.join(delimiter);
    return sortedValuesStr;
};

/**
 *
 * @param {type} a
 * @param {type} b
 * @returns {Number}
 */
Utilities.sortAlphaNum = function (a, b) {
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if (aA === bA) {
        var aN = parseInt(a.replace(reN, ""), 10);
        var bN = parseInt(b.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
};

Utilities.setCookie = function(name, value, exdate, path) {
    var escapedValue = escape(value);
    var expDate = new Date(exdate).toUTCString();
    var cookieStr = name + "=" + escapedValue + "; expires=" + expDate + "; path=" + path;
    Utilities.debug?console.log("cookieString=" + cookieStr):null;
    document.cookie = cookieStr;
};

Utilities.getCookieByName = function(name){
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

Utilities.addDays = function(date,days) {
    date.setDate(date.getDate() + days);
    return date;
};

Utilities.clearFormFields = function(formId){
   var formToClear = document.getElementById(formId);

    var inputElementTypesToClear = ["text","email","password","datetime-local"];
    var elementsToClear = ["textarea","select","range"];

    var elements = formToClear.getElementsByTagName("input");
    for (var i=0; i < elements.length; i++){

        if (inputElementTypesToClear.includes(elements[i].type)){
            elements[i].value = "";
        }

        if (elementsToClear.includes(elements[i].tagName)){
            elements[i].value = "";
        }

    }
};

Utilities.serialize = function(obj, prefix) {
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        Utilities.serialize(v, k) :
        k + "=" + v);
    }
  }
  return str.join("&");
};

Utilities.replaceElementText = function(element, newText) {
    while( element.firstChild )
        element.removeChild( element.firstChild );
    element.appendChild( document.createTextNode(newText) );
};

Utilities.clearSelectOptions = function(selectElement)
{
    var i;
    for(i = selectElement.options.length - 1 ; i >= 0 ; i--)
    {
        selectElement.remove(i);
    }
    var blankSelect = document.createElement("option");
    blankSelect.value="";
    blankSelect.innerHTML = "--";
    blankSelect.setAttribute("selected","selected");
    selectElement.appendChild(blankSelect);
};

// Modal Height Calculation ===================================================
function modalSize() {
    // Gets the viewport height.
    var viewportHeight = window.innerHeight;
    // Gets an array of all modals on the page.
    var dialogueModal = document.querySelectorAll(".dialogue-modal");
    // Loops through all the modals.
    for (let i of dialogueModal) {
        // Gets the individual modal's content's height.
        var modalHeight = i.offsetHeight;
        // Compares the content's height to the height of the viewport. If the modal is taller than the viewport, it is assigned a class forcing it to be scrollable.
        if(modalHeight > viewportHeight) {
            i.classList.remove("dialogue-modal--viewport");
            i.classList.add("dialogue-modal--overflow");
        }
        else {
            i.classList.remove("dialogue-modal--overflow");
            i.classList.add("dialogue-modal--viewport");
        }

    }

}

// Reruns the function each time the viewport changes size.
window.onresize = modalSize;

// Applicant Evidence UI =======================================================
window.onload = function(e) {

    function evidenceUI() {

        // Set the landscape tablet media query.
        var w = window.matchMedia("(min-width: 64em)")

        // Check to see if the screen is larger than a landscape tablet (this indicates that the desktop tab menu will be showing).
        if (w.matches) {
            
            // Set variables for the desktop menu items and the associated evidence panes.
            var desktopEvidenceTrigger = document.querySelectorAll(".applicant-evidence__desktop-menu-item");
            var evidencePane = document.querySelectorAll(".applicant-evidence__accordion-wrapper");

            // Enter the loop of desktop tab menu items.
            for (let i of desktopEvidenceTrigger) {

                // Check for a click on each tab.
                i.addEventListener('click', function(e) {

                    // Prevent the default action.
                    e.preventDefault();

                    // Enter the loop for desktop tab menu items and remove the active class from all of them.
                    for (let x of desktopEvidenceTrigger) {
                        x.classList.remove("active");
                        x.setAttribute("aria-selected", "false");
                    }

                    // Enter the loop for evidence panes and remove the active class from all of them.
                    for (let x of evidencePane) {
                        x.classList.remove("active");
                    }

                    // Add the active class to the tab that has been clicked.
                    this.classList.add("active");
                    this.setAttribute("aria-selected", "true");

                    // Set a variable for that tab's data attribute.
                    var triggerData = this.getAttribute("data-evidence-trigger");

                    // Enter the loop for evidence panes and find the pane with the matching data attribute value, and then give it the active class.
                    for (let x of evidencePane) {
                        if (x.getAttribute("data-evidence-target") == triggerData) {
                            x.classList.add("active");
                            x.querySelector(".applicant-evidence__first-target").focus();
                        }
                    }

                });

                // Checks for a key press.
                i.addEventListener("keyup", function(e) {

                    // Cancels the default action.
                    e.preventDefault();

                    // Checks to see if the key pressed was Enter (13).
                    if (e.keyCode == 13) {

                        // Triggers a click, thus activating the click event listener.
                        this.click();

                    }

                });

            }

            // The following code handles the tab order of sending a user back to the tab list when they reach the top of the tab's pane.

            // Set a variable for the first element in the evidence panes based on a class.
            var evidenceStartFocus = document.querySelectorAll(".applicant-evidence__first-target");
            
            // Enter the loop of elements.
            for (let i of evidenceStartFocus) {

                // Listen for a keydown.
                i.addEventListener("keydown", function(e) {

                    // Check to see if the Shift key is being pressed in tandom with the Tab key (9).
                    if (e.shiftKey && e.keyCode == 9) {

                        // Prevent the default action.
                        e.preventDefault();
                        
                        // Set a variable that gets the element's parent's data attribute.
                        var triggerData = this.closest(".applicant-evidence__accordion-wrapper").getAttribute("data-evidence-target");

                        // Set a variable that gets all desktop tab items.
                        var desktopEvidenceTrigger = document.querySelectorAll(".applicant-evidence__desktop-menu-item");
                        
                        // Enter the loop for desktop tab items.
                        for (let i of desktopEvidenceTrigger) {

                            // Check if the trigger's data attribute is the same as the pane, and if so, give the trigger focus.
                            if (i.getAttribute("data-evidence-trigger") == triggerData) {
                                i.focus();
                            }

                        }

                    }

                });

            }

            // The following code sends the user to the next tab in the event that they reach the end of the collapsed version of the pane.

            var evidenceEarlyEndFocus = document.querySelectorAll(".applicant-evidence__early-last-target");

            for (let i of evidenceEarlyEndFocus) {

                // Listen for a keydown.
                i.addEventListener("keydown", function(e) {

                    if (this.closest(".form__wrapper").nextElementSibling.classList.contains("active")) {
                        // Continue on your way.
                    }
                    else {
                        
                        if (!e.shiftKey && e.keyCode == 9) {

                            var triggerData = this.closest(".applicant-evidence__accordion-wrapper").getAttribute("data-evidence-target");

                            var desktopEvidenceTrigger = document.querySelectorAll(".applicant-evidence__desktop-menu-item");
                            
                            for (let i of desktopEvidenceTrigger) {

                                if (i.getAttribute("data-evidence-trigger") == triggerData) {
                                    
                                    if (i.nextElementSibling) {
                                        e.preventDefault();
                                        i.nextElementSibling.focus();
                                    }

                                }

                            }

                        }

                    }

                });

            }

            // The following code sends the user to the next tab in the event that they reach the end of the expanded version of the pane.

            var evidenceEndFocus = document.querySelectorAll(".applicant-evidence__last-target");

            for (let i of evidenceEndFocus) {

                // Listen for a keydown.
                i.addEventListener("keydown", function(e) {

                    if (!e.shiftKey && e.keyCode == 9) {

                        var triggerData = this.closest(".applicant-evidence__accordion-wrapper").getAttribute("data-evidence-target");

                        var desktopEvidenceTrigger = document.querySelectorAll(".applicant-evidence__desktop-menu-item");
                        
                        for (let i of desktopEvidenceTrigger) {

                            if (i.getAttribute("data-evidence-trigger") == triggerData) {

                                if (i.nextElementSibling) {
                                    e.preventDefault();
                                    i.nextElementSibling.focus();
                                }

                            }

                        }

                    }

                });

            }

        }
        else {

            // The following code handles the mobile accordion execution of the tab interface.
            
            // Set a variable for all accordion triggers.
            var evidenceAccordionTrigger = document.querySelectorAll(".applicant-evidence__accordion-trigger");

            // Enter the loop of triggers.
            for (let i of evidenceAccordionTrigger) {

                // Listen for a click.
                i.addEventListener('click', function(e) {

                    // Check to see if the trigger is active.
                    if (this.classList.contains("active")) {

                        // If it is active, close all accordions.
                        for (let x of evidenceAccordionTrigger) {
                            x.classList.remove("active")
                            x.nextElementSibling.classList.remove("active");
                            x.setAttribute("aria-expanded", "false");
                        }

                    } else {

                        // Close all accordions.
                        for (let x of evidenceAccordionTrigger) {
                            x.classList.remove("active")
                            x.nextElementSibling.classList.remove("active");
                            x.setAttribute("aria-expanded", "false");
                        }

                        // Open this accordion.
                        this.classList.add("active");
                        this.nextElementSibling.classList.add("active");
                        x.setAttribute("aria-expanded", "true");

                    }

                });

            }

        }

    }

    evidenceUI();

    // Reruns the function each time the viewport changes size.
    window.onresize = evidenceUI;

}