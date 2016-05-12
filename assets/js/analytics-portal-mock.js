// Home Page

$(document).ready(function() {

  function addConstraint(type, valueType, value, unit) {
    $("select.constraints").append($("<option>" + type + " " + valueType + " " + value + " " + unit + "</option>"));
  }

  function addConstraintString(string, index) {
    if(index == 0){
      var $editBox = $(".edit-constraints .ideal-edit.edit-box");
    } else if (index == 1) {
      var $editBox = $(".edit-constraints .nominal-edit.edit-box");
    } else if (index == 2) {
      var $editBox = $(".edit-constraints .warning-edit.edit-box");
    } else if (index == 3) {
      var $editBox = $(".edit-constraints .critical-edit.edit-box");
    }

    if (string.indexOf('less than') > -1) {
      $editBox.find("select.constraint-value option[value='less than']").prop('selected', true);
      var value = string.match(/\d+/);
      $editBox.find("input.constraint-value").val(value);
      $editBox.find("select.time option[value='" + string.split(" ").pop() + "']").prop('selected', true);
    } else if (string.indexOf('more than') > -1) { 
      $editBox.find("select.constraint-value option[value='more than']").prop('selected', true);
      var value = string.match(/\d+/);
      $editBox.find("input.constraint-value").val(value);
      $editBox.find("select.time option[value='" + string.split(" ").pop() + "']").prop('selected', true);
    } else if (string.indexOf('equals') > -1) {
      $editBox.find("select.constraint-value option[value='equal']").prop('selected', true);
      var value = string.match(/\d+/);
      $editBox.find("input.constraint-value").val(value);
      $editBox.find("select.time option[value='" + string.split(" ").pop() + "']").prop('selected', true);
    }

  }

  function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) == variable) {
              return decodeURIComponent(pair[1]);
          }
      }
      //console.log('Query variable %s not found', variable);
  }

  $(".reset").click(function() {
    Cookies.remove("objects");
    window.location.reload();
  });

  var eumList = [
    "www.appdynamics.com/versioncheck/proversioncheck.html",
    "www.appdynamics.com/company/careers",
    "www.appdynamics.co.uk/company/careers",
    "www.appdynamics.com",
    "www.appdynamics.com/resources",
    "www.appdynamics.com/product/infrastructure-visibility",
    "www.appdynamics.com/gartner-magic-quadrant-2015-application-performance-monitoring",
    "www.appdynamics.com/community/exchange",
    "www.appdynamics.com/solutions/appdynamics-java-monitoring",
    "www.appdynamics.com/learningbytes",
    "www.appdynamics.com/support",
    "www.appdynamics.com/pricing/us",
    "portal.appdynamics.com/account/signup",
    "www.appdynamics.com/enablement/university",
    "www.appdynamics.com/upgrade-lite-to-pro",
    "www.appdynamics.co.uk",
    "www.appdynamics.com/lp/ebook-top-10-java-performance-problems",
    "portal.appdynamics.com/account/initialize",
    "www.appdynamics.com/company/leadership",
    "www.appdynamics.com/community",
    "www.appdynamics.com/php/joomla",
    "www.appdynamics.com/php",
    "portal.appdynamics.com/account/subscriptions",
    "www.appdynamics.com/solutions",
    "www.appdynamics.com/company",
    "www.appdynamics.com/company/investors",
    "www.appdynamics.com/why-appdynamics",
    "www.appdynamics.com/product/how-it-works",
    "www.appdynamics.com/enablement",
    "www.appdynamics.com/product/application-performance-management",
    "www.appdynamics.com/solutions/unified-monitoring",
    "www.appdynamics.com/gartner-critical-capabilities-for-apm",
    "www.appdynamics.com/pricing/faq",
    "www.appdynamics.de/karriere/produktmanagement",
    "www.appdynamics.com/customers/case-study",
    "www.appdynamics.de/firma/karriere",
    "www.appdynamics.de",
    "www.appdynamics.com/product/application-analytics",
    "www.appdynamics.com/product/database-visibility",
    "www.appdynamics.com/community/user-groups",
  ];

  var portalBtList = [
    "/sso/getuserprofile",
    "/",
    "/analytics/infer",
    "/sso/userprofile",
    "/api/getBlacklistedDomains",
    "/sso/authenticate",
    "/reports/customer_report",
    "/reports/saaslogin",
    "/partners/azurestore",
    "/accounts/getuserdetails",
    "/sso/samlservice",
    "/analytics/marketo",
    "/account/signup",
    "/sso/login",
    "/account/subscriptions",
    "/api/rest",
    "/sso/forgotpassword",
    "/index",
    "/admin/jsi18n",
    "/accounts/activate",
    "/account/user",
    "/account",
    "/reports/usage",
    "/api/createSelfserviceUser",
    "/browse/zone",
    "/sso/community",
    "/browse/eulaacceptzones",
    "/browse/getlatestdata",
    "/api/getlicenseinfo",
    "/favicon.ico",
    "/accounts/user",
    "/accounts/company",
    "/onpremise/public",
    "/saas/public",
    "/api/v3",
    "/selfservice/agentdownload",
    "/accounts/partner",
    "/sso/social",
    "/sso/terms",
    "/sso/logout",
    "/account/initialize",
    "/reports/controllersummary",
    "/reports/controllersummary_report",
    "/account/selfservice",
    "/accounts/login",
    "/sso/university",
    "/account/license",
    "/accounts/get_company_type",
    "/accounts/add_company_autocomplete",
    "All Other Traffic - alpasso",
    "/https:/login.appdynamics.com",
    "/browserconfig.xml",
    "/api/v1",
    "/status/get_saas_data",
    "/login"
  ];

  var apertureBtList = [

  ];

  var logList = [
    "alpasso-log",
    "uwsgi-log",
    "alum-log",
    "uwsg-log",
    "download-log",
    "nginx-access-log"
  ]

  var checkForMatch = function(that, value, deleteboolean, possibleParent){
    var $stage = $(".edit-box[id='" + $(that).parents(".archived-edits").attr("id") + "']");
    if(possibleParent) {
      $stage = possibleParent;
    }
    var $highlight = $(that).parents(".archived-edits");
    var $highlightBefore = $(that).parents(".archived-edits").prev().find(".highlight-line");
    var $highlightAfter = $(that).parents(".archived-edits").next().find(".highlight-line");
    var $stageBefore = $($stage.prevAll(".edit-box")[0]);
    var $stageAfter = $($stage.nextAll(".edit-box")[0]);
    if(!deleteboolean){
      if($highlightBefore.length || $highlightAfter.length){
        var hit = false;

        if($highlightBefore.find(".field-contents .field-box[id='" + value + "']").length) {
          $stage.addClass("matched-above-" + value);
          $stageBefore.addClass("matched-below-" + value);
          hit = true;
        }

        if($highlightAfter.find(".field-contents .field-box[id='" + value + "']").length) {
          $stage.addClass("matched-below-" + value);
          $stageAfter.addClass("matched-above-" + value);
          hit = true;
        }

        if(!hit) {
          $stageAfter.removeClass("matched-above-" + value);
          $stageBefore.removeClass("matched-below-" + value);
          $stage.removeClass("matched-below-" + value);
          $stage.removeClass("matched-above-" + value);
        }
      }
    } else {
      $stageAfter.removeClass("matched-above-" + value);
      $stageBefore.removeClass("matched-below-" + value);
      $stage.removeClass("matched-below-" + value);
      $stage.removeClass("matched-above-" + value);
    }
  };

  var checkForStepFinish = function() {
    if($(".edit-box").length === $("div[class*=' matched-']").length) {
      $(".correlate-forward").removeClass("hidden");
    } else {
      $(".correlate-forward").addClass("hidden");
    }
  };

  var expandedButton = function(that){
    $(".data-collector").hide();
    $(".archived-edits.top").removeClass("top");
    $(that).parents(".archived-edits").addClass("top");
    var $currentDataCollector = $(that).parents(".archived-edits").find(".data-collector")
    $currentDataCollector.show();
    $currentDataCollector.css("left", ($(that).parents(".archived-edits").find(".highlight-line").width() + 20) + "px");

    $(".data-collectors option").click(function(){
      $(".preview-area .preview-box div").hide();
      $(this).parents(".data-collector").find(".preview-area .preview-box div[id='" + $(this).attr("id") + "']").show();
    });
  };

  var dataCollectorSelect = function(that){
    var dcvalue = $(that).parents(".data-collector").find(".data-collectors").val();
    $(that).parents(".data-collector").hide();
    var $stageEditor = $(that).parents(".archived-edits");
    $stageEditor.find(".add-field-button").show();
    $stageEditor.find(".highlight-line").off();
    $stageEditor.find(".highlight-line .contents").hide();
    $stageEditor.find(".highlight-line.expanded").addClass("has-fields").removeClass("expanded");
    $stageEditor.find(".field-contents").show().append("<div class='field-box' id='" + dcvalue + "'>" + dcvalue + " <span class='delete'>Delete</span></div>");
    
    checkForMatch(this, dcvalue);

    $stageEditor.find(".field-box[id='" + dcvalue + "'] .delete").click(function(){
      $possibleParent = $(".edit-box[id='" + $(this).parents(".archived-edits").attr("id") + "']");
      var boxId = $(this).parents(".field-box").attr("id");
      var $fieldContents = $(this).parents(".field-contents");
      var $highlightLine = $(this).parents(".highlight-line");
      $(this).parents(".field-box").remove();
      if(!$fieldContents.find(".field-box").length){
        $highlightLine.removeClass("has-fields");
        $highlightLine.addClass("expanded");
        $highlightLine.find(".contents").show();
        $highlightLine.find(".field-contents").hide();
        $highlightLine.find(".field-contents .field-box").remove();
        $highlightLine.find(".add-field-button").hide();
        $highlightLine.click(function(){
          expandedButton(this);
        });
      };
      checkForMatch(this, boxId, true, $possibleParent);
    });

    checkForStepFinish();
  };

  // Front Scorecard page
  //////////////////////

  // check for objects and render

  function renderScorecardObjects(object) {
    if(object.type === "scorecard") {
      var $clonedCard = $(".scorecard-container.cloner.hidden").clone();
      $clonedCard.find(".scorecard-title").text(object.title);
      $clonedCard.removeClass("hidden")

      var constraints = object.constraints.split("|");
      $.each(constraints, function(i,e) {
        var constraintString = "";
        if (e.indexOf("less than") >= 0){
          constraintString = "<" + e.split("less than")[1];
        } else if (e.indexOf("more than") >= 0) {
          constraintString = ">" + e.split("more than")[1];
        } else if (e.indexOf("equal to") >= 0) {
          constraintString = "=" + e.split("equal to")[1];
        }
        
        var $clonedScore = $($clonedCard.find(".row.score")[0]).clone();
        $clonedScore.find(".name").text(constraintString);
        $clonedScore.removeClass("hidden");

        if(i%4 === 0) {
          $clonedScore.find(".bar-value").addClass("green");
          $clonedScore.find(".bar-value").addClass("mid");
        } else if (i%4 === 1) {
          $clonedScore.find(".bar-value").addClass("yellow");
          $clonedScore.find(".bar-value").addClass("high");
        } else if (i%4 === 2) {
          $clonedScore.find(".bar-value").addClass("orange");
          $clonedScore.find(".bar-value").addClass("low");
        } else if (i%4 === 3) {
          $clonedScore.find(".bar-value").addClass("red");
          $clonedScore.find(".bar-value").addClass("low");
        }

        $clonedCard.find(".scorecard-table").append($clonedScore);

      });
      
      $clonedCard.find(".scorecard").attr("data-json", '{ "bo": "' + object.bo + '", "title":"' + object.title + '", "constraints": "' + object.constraints + '"}')

      $(".main").append($clonedCard);

    }
  }

  var objects = Cookies.get("objects");

  if(objects){
    var jsonObjects = JSON.parse(objects);
    $.each(jsonObjects.objects, function(i,e) {
      renderScorecardObjects(e);
    });
  }

  $(".scorecard").click(function() {
    var title = encodeURIComponent($(this).find(".scorecard-title").text());
    var data = encodeURIComponent($(this).attr("data-json"));
    window.location.href = "/edit-scorecard?title=" + title + "&data=" + data;
  });

  $(".define-scorecard").click(function() {
    window.location.href="/new-scorecard";
  });

  // Edit Scorecard
  /////////////////

  var businessOutcomes = [
    "Signup Email to Install",
    "Self Service Ad to Login",
    "Cold Call to Purchase",
    "Marketo Campaign to Signup",
    "Signup to Install",
    "Install to First BT"
  ];

  $.each(businessOutcomes, function(i,e){
    $(".edit-scorecard select.business-outcomes").append($("<option value='" + e + "'>" + e + "</option>"));
  });

  if(Cookies.get("objects")){
    var currentObjects = JSON.parse(Cookies.get("objects"));

    $.each(currentObjects.objects, function(i,e){
      if(e.type === "Business Outcome") {
        $(".edit-scorecard select.business-outcomes").append($("<option value='" + e.name + "'>" + e.name + "</option>"));
      }
    });

    if(getQueryVariable('bo')){
      $(".edit-scorecard select option[value='" + decodeURIComponent(getQueryVariable('bo')) + "']").prop('selected', true);
    }

  }

  var uriParse = URI.parseQuery(window.location.search);

  if(uriParse.data){
    var urlData = JSON.parse(uriParse.data)
    var scorecardTitle = urlData.title;
    var constraints = urlData.constraints.split("|");
    $.each(constraints, function(i,e) {
      addConstraintString(e, i);
    });

    if(urlData.bo) {
      $("option[value='" + urlData.bo + "']").prop('selected', true);
    } else {
      if(uriParse.title){
        $("option[value='" + uriParse.title + "']").prop('selected', true);
      }
    }

    $(".naming").val(scorecardTitle);
  }

  if($(".business-outcomes option:selected").length){
    $(".disabled").removeClass("disabled");
  }

  $(".business-outcomes select").change(function() {
    $(".disabled").removeClass("disabled");
  });

  $(".fa-plus").click(function(){
    $(".edit-constraints").show();
  });

  $(".constraint-buttons .cancel").click(function() {
    $(".edit-constraints").hide();
  });

  $(".add-constraint").click(function(){
    var constraintType = $(".constraint-type").val();
    var constraintValueType = $("select.constraint-value").val();
    var constraintValue = $("input.constraint-value").val();
    var constraintUnit = $("select.time").val();
    if(!constraintValue)
      constraintValue = 0

    addConstraint(constraintType, constraintValueType, constraintValue, constraintUnit);
    $(".edit-constraints").hide();
  });

  $(".fa-minus").click(function(){
    $("select.constraints option:selected").remove();
  });

  $(".header-buttons .cancel").click(function() {
    window.location.href="/";
  });

  $(".header-buttons .save-scorecard").click(function(){
    if((window.location.pathname === "/new-scorecard") || (getQueryVariable('bo'))){
      var $constraints = $(".edit-constraints .edit-box");
      var constraintStr = "";
      $.each($constraints, function(i,e) {
        if(i === 0) {
          constraintStr = $(e).find("select.constraint-value").val() + " " + $(e).find("input.constraint-value").val() + " " + $(e).find("select.time").val();
        } else {
          constraintStr = constraintStr + "|" + $(e).find("select.constraint-value").val() + " " + $(e).find("input.constraint-value").val() + " " + $(e).find("select.time").val();
        }
      });

      var objectString = '{ "type" : "scorecard", "bo" : "' +  $("select.business-outcomes").val() + '", "title" : "' + $("input.naming").val() + '", "constraints" : "' + constraintStr + '" }';

      var currentObjectString = Cookies.get("objects");

      if(currentObjectString) {
        currentObjectString = currentObjectString.split("]}")[0];
        currentObjectString = currentObjectString + ", " + objectString;
        currentObjectString = currentObjectString + "]}";
      } else {
        currentObjectString = '{"objects":[' + objectString + ']}';
      }

      var newCookie = encodeURIComponent(currentObjectString);
      document.cookie = "objects=" + newCookie;
    }
    window.location.href="/";
  });

  $(".new-outcome").click(function(){
    document.cookie = "parent=" + window.location.pathname + window.location.search;
    window.location="/new-outcome?refer=scorecard";
  });

  // Edit Outcome Page
  //////////////////////

  $(".add-box").click(function(){
      var $editbox = $("<div class='edit-box'><input class='name' placeholder='Stage Name'></input></div>");
      $(this).before($editbox);
      $(".finish-workflow").show();
      $(".edit-box:last").addClass("last");
      $(".edit-box.last").removeClass("last");
  });

  $(".finish-workflow").click(function(){
    $(this).hide();
    $(".or").hide();
    $(".add-box").hide();
    $(".edit-box:first").addClass("last");
    var allEditBoxes = $(".edit-box");
    $.each(allEditBoxes, function(i, e) {
      $(e).attr("id", i);
    });
    $stage = $(".stage-edits-original").clone();
    $(".stage-edits-original").after($stage);
    $stage.removeClass("stage-edits-original").addClass("stage-edits");
    addSideEditListeners();
    $(".stage-edits").removeClass("hidden");
    $(".stage-edits").css("top", $(".edit-box.last").offset().top + "px");
    $(".stage-edits").css("left", ($(".edit-box.last").offset().left + $(".edit-box.last").width() + 50) + "px");
  });

  // side edits

  var appSelectListener = function(){
    $(".stage-edits .browser .select").click(function() {
      if(!$(".stage-edits .browser select.top").val()) {
        alert("Please select a " + $(".stage-edits .browser-dialog .title-label").text());
      } else {
        if($(".log-condition").is(":visible")) {
          $(".stage-edits .finished-info").append("<div class='title-label source'>Source: " + $(".stage-edits .browser select.top").val() + " Matching '" + $(".stage-edits .browser input.match-condition").val() + "'</div>");
        } else {
          $(".stage-edits .finished-info").append("<div class='title-label source'>Source: " + $(".stage-edits .browser select.top").val() + "</div>");
        }
        var currentdata = $(".stage-edits").attr("data-json");
        $(".stage-edits").attr("data-json", currentdata + ", 'id': '" + $('.stage-edits .source').text().split(": ")[1] + "'");
        $(".stage-edits .finished-info").append("<div class='edit'>Edit Stage</div>");
        $(".stage-edits .step[id='3']").addClass("hidden");
        if($(".stage-edits").hasClass("reediting")){
          reshiftOrEnd();
        } else {
          shiftStageEdit();
        }
      }
    });
  };

  var logSelectListener = function(){
    $(".stage-edits .browser select.top.log option").click(function() {
      var logType = $(this).val();
      if(logType === "All Logs"){
        $.each($(".bottom.logs option"), function(i,e){
          $(e).show();
        });
      } else {
        $.each($(".bottom.logs option"), function(i,e){
          $(e).hide();
          if($(e).attr("data-source") === logType){
            $(e).show();
          }
        });
      }
    });

    appSelectListener();

  };

  var addSideEditListeners = function() {

    $(".browser .back").click(function() {
      $(".log-condition").hide();
      if($(this).parents(".stage-edits").find(".finished-info .title-label.source-type").text().indexOf("Browser Request") < 0) {
        $(this).parents(".stage-edits").find(".finished-info .title-label.source-type").remove();
        $(".stage-edits").attr("data-json", "");
        $(".stage-edits").attr("data-json", "'origin' : '" + $(".stage-edits .origin").text().split(": ")[1] + "'");
        $(".stage-edits .step[id='3']").addClass("hidden");
        $(".stage-edits .step[id='2']").removeClass("hidden");
      } else {
        $(this).parents(".stage-edits").find(".finished-info .title-label.origin").remove();
        $(this).parents(".stage-edits").find(".finished-info .title-label.source-type").remove();
        $(".stage-edits").attr("data-json", "");
        $(".stage-edits .step[id='3']").addClass("hidden");
        $(".stage-edits .step[id='1']").show();
      }
    });

    $(".select-source .type").click(function(){
      $(".stage-edits .finished-info").append("<div class='title-label origin'>Origin: " + $(this).text() + "</div>");
      var currentdata = $(".stage-edits").attr("data-json");
      $(".stage-edits").attr("data-json", currentdata + "'origin': '" + $(this).text() + "'");
      $(".stage-edits .step[id='1']").hide();
      if($(this).hasClass("app")) {
        $(".stage-edits .step[id='2']").removeClass("hidden");
        $(".stage-edits .browser select.top.app").empty();
        $.each(portalBtList, function(i,e) {
          $(".stage-edits .browser select.top.app").append($("<option>" + e + "</option>"));
        });
      } else if($(this).hasClass("eum")){
        $(".stage-edits .finished-info").append("<div class='title-label source-type'>Source Type: Browser Request</div>");
        var currentdata = $(".stage-edits").attr("data-json");
        $(".stage-edits").attr("data-json", currentdata + "'origin': '" + $(this).text() + "', 'source': 'Browser Request'");
        $(".stage-edits .browser .title-label").text("Browser Requests:");
        $(".stage-edits .step[id='3']").removeClass("hidden");
        $(".stage-edits .browser select.top.app").empty();
        appSelectListener();
        $.each(eumList, function(i,e) {
          $(".stage-edits .browser select.top.app").append($("<option>" + e + "</option>"));
        });
      }
    });

    $(".origin-source .type").click(function(){
      if($(this).hasClass("back")) {
        $(".stage-edits").attr("data-json", "");
        $(".stage-edits .step[id='2']").addClass("hidden");
        $(".stage-edits .step[id='1']").show();
        $(".stage-edits .finished-info").empty();
      } else {
        $(".stage-edits .finished-info").append("<div class='title-label source-type'>Source Type: " + $(this).text() + "</div>");
        var currentdata = $(".stage-edits").attr("data-json");
        $(".stage-edits").attr("data-json", currentdata + ", 'source': '" + $(this).text() + "'");
        $(".stage-edits .step[id='2']").addClass("hidden");
        $(".stage-edits .browser .title-label").text($(this).text() + ":");
        $(".stage-edits .step[id='3']").removeClass("hidden");
        if($(this).text() === "Business Transactions") {
          $(".stage-edits .browser select.top").empty();
          $.each(portalBtList, function(i,e) {
            $(".stage-edits .browser select.top").append($("<option>" + e + "</option>"));
          });
          $(".stage-edits .browser select.top").removeClass("log");
          $(".stage-edits .browser select.top").removeClass("app");
          $(".stage-edits .browser select.top").addClass("app");
          $(".stage-edits .browser select.top").off();
          appSelectListener();
        } else if($(this).text() === "Logs") {
          $(".log-condition").show();
          $(".stage-edits .browser select.top").empty();
          $.each(logList, function(i,e) {
            $(".stage-edits .browser select.top").append($("<option>" + e + "</option>"));
          });
          $(".stage-edits .browser select.top").append($("<option>All Logs</option>").prop('selected', true)); 
          $(".stage-edits .browser select.top").removeClass("log");
          $(".stage-edits .browser select.top").removeClass("app");
          $(".stage-edits .browser select.top").addClass("log");
          $(".stage-edits .browser select.top").off();
          logSelectListener();
           $.getJSON("assets/json/logdata.json", function(data) {
              $(".stage-edits .browser select.bottom.logs").empty();
              $.each(data, function( i, e ) {
                $(".stage-edits .browser select.bottom.logs").prepend("<option data-source='" + e["Source Type"] + "'>" + e["Message"] + "</option>");
              });
            });
        }
      }

    });

    $(".stage-edits .search input").keyup(function(){
      if($(this).val()){
        $.each($(".stage-edits .browser select.top.app option"), function(i,e){
          if($(e).text().indexOf($(".stage-edits .search input").val()) < 0) {
            $(e).hide();
          } else {
            $(e).show();
          }
        });
      } else { 
        $.each($(".stage-edits .browser select.top.app option"), function(i,e){
            $(e).show();
        });
      }
    });

    $("input.match-condition").keyup(function(){
      if($(this).val()){
        $.each($(".preview .bottom.logs option"), function(i,e){
          if($(e).text().indexOf($(this).parents(".browser-dialog").find("input.match-condition").val()) < 0) {
            $(e).hide();
          } else {
            $(e).show();
          }
        });
      } else { 
        $.each($(".preview .bottom.logs option"), function(i,e){
            $(e).show();
        });
      }
    });

    $(".finished-info .edit").off();
    $(".finished-info .edit").click(function(){
      $(".stage-edits").remove();
      var id = $(this).parents(".archived-edits").attr("id");
      $(this).parents(".archived-edits").addClass("stage-edits").removeClass("archived-edits");
      $(".stage-edits").addClass("reediting");
      $(".stage-edits").attr("data-json", "");
      $(".stage-edits").css("top", $(".edit-box[id='" + id + "']").offset().top + "px");
      $(".stage-edits").css("left", ($(".edit-box[id='" + id + "']").offset().left + $(".edit-box[id='" + id + "']").width() + 50) + "px");
      $(".stage-edits").find(".finished-info").empty();
      $(".stage-edits").find(".step[id='1']").show();
      $(".stage-edits").find("*").off();
      addSideEditListeners();
    });

  }

  var shiftStageEdit = function() {
    var $nextEditBox = $($(".edit-box.last").nextAll(".edit-box")[0]);
    $(".edit-box.last").removeClass("last");
    if($nextEditBox.length > 0) {
      $nextEditBox.addClass("last");
      var $stageEditsClone = $(".stage-edits").clone();
      $stageEditsClone.attr("data-json", "");
      $(".stage-edits").addClass("archived-edits").removeClass("stage-edits");
      $(".archived-edits:last").after($stageEditsClone);
      $(".stage-edits").css("top", $(".edit-box.last").offset().top + "px");
      $(".stage-edits").css("left", ($(".edit-box.last").offset().left + $(".edit-box.last").width() + 50) + "px");
      $(".stage-edits .finished-info").empty();
      $(".stage-edits .step[id='1']").show();
    } else {
      $(".stage-edits").addClass("archived-edits").removeClass("stage-edits");
      $(".finish-adding-stage").show();
      $(".finish-adding-stage.backward").click(function(){
        $(".archived-edits").remove();
        $(".add-box").show();
        $(".finish-workflow").show();
        $(".finish-adding-stage").hide();
      });
      $(".finish-adding-stage.forward").click(function(){
        $(".finish-adding-stage.backward").hide();
        $(".highlight-line").addClass("expanded");
        $(".highlight-line .contents").fadeIn();
        $.each($(".highlight-line .contents .identifier"), function(i,e){
          var $source = $(e).parents(".archived-edits").find(".finished-info .source");
          $(e).text($source.text().split(": ")[1]);
        });

        $(".highlight-line.expanded, .add-field-button").click(function(){
          expandedButton(this);
        });

        $(".data-collector .cancel").click(function() {
          $(".data-collector").hide();
        });

        $(".data-collector .select").off();

        $(".data-collector .select").click(function(){
          dataCollectorSelect(this);
        });

        $(".finished-info .edit").hide();
        $(".finished-info").fadeOut();
        $(this).hide();
        $(".correlate-back").removeClass("hidden");
        // $(".correlate-forward").removeClass("hidden");
      });
    }
    var $allFinishedStages = $(".archived-edits");
    $.each($allFinishedStages, function(i,e) {
      $(e).attr("id", i);
      $(e).removeClass("reediting");
    });
    addSideEditListeners();
  };

  $(".correlate-forward").click(function(){
    var name = $(".business-outcome-name").val();
    var stages = [];
    $.each($(".edit-box"), function(i,e){
      stages.push($(e).find(".name").val());
    });
    var apps = [];
    var sources = [];
    var ids = [];
    $.each($(".finished-info"), function(i,e) {
      apps.push($(e).find(".origin").text().split(": ")[1]);
      sources.push($(e).find(".source-type").text().split(": ")[1]);
      ids.push($(e).find(".source").text().split(": ")[1]);
    });
    var fieldcontents = [];
    $.each($(".field-contents"), function(i,e){
      var fieldString = "";
      $.each($(e).find(".field-box"),function(i,e){
        fieldString = $(e).attr("id") + " ";
      });
      fieldcontents.push(fieldString);
    });
    var boJson = '{ "type" : "Business Outcome", "name": "' + name + '", ' + '"stages": {';
    var len = stages.length;
    $.each(stages, function(i,e){
      boJson += '"' + e + '": { "app" : "' + apps[i] + '", "source" : "' + sources[i] + '", "id" : "' + ids[i] + '", "fields" : "' + fieldcontents[i] + '"}';
      if (i !== len - 1) {
        boJson += ', ';
      }
    });
    boJson += '}}';

    var objectString = boJson;

    var currentObjectString = Cookies.get("objects");

   if(currentObjectString) {
      currentObjectString = currentObjectString.split("]}")[0];
      currentObjectString = currentObjectString + ", " + objectString;
      currentObjectString = currentObjectString + "]}";
    } else {
      currentObjectString = '{"objects":[' + objectString + ']}';
    }

    Cookies.remove("objects");

    var newCookie = encodeURIComponent(currentObjectString);
    document.cookie = "objects=" + newCookie;

    if(getQueryVariable('refer') === 'scorecard') {
      window.location.href="/edit-scorecard?bo=" + encodeURIComponent($(".business-outcome-name").val());
    }

  });

  var reshiftOrEnd = function() {
    if($(".edit-box.last").length > 0) {
      var $nextEditBox = $(".edit-box.last");
      $(".stage-edits.reediting").removeClass("reediting");
      var $stageEditsClone = $(".stage-edits").clone();
      $stageEditsClone.attr("data-json", "");
      $(".stage-edits").addClass("archived-edits").removeClass("stage-edits");
      $(".archived-edits:last").after($stageEditsClone);
      $(".stage-edits").css("top", $(".edit-box.last").offset().top + "px");
      $(".stage-edits").css("left", ($(".edit-box.last").offset().left + $(".edit-box.last").width() + 50) + "px");
      $(".stage-edits .finished-info").empty();
      $(".stage-edits .step[id='1']").show();
      addSideEditListeners();
    } else {
      $(".stage-edits.reediting").removeClass("reediting");
      $(".stage-edits").addClass("archived-edits").removeClass("stage-edits");
      addSideEditListeners();
    }
  }

  addSideEditListeners();

  $(".correlate-back").click(function(){
    $(".highlight-line").removeClass("expanded");
    $(".highlight-line").removeClass("has-fields");
    $(".highlight-line .contents").hide();
    $(".highlight-line .field-contents").hide();
    $(".highlight-line .field-contents .field-box").remove();
    $(".highlight-line .add-field-button").hide();
    $(".finished-info .edit").show();
    $(".finished-info").fadeIn();
    $(".correlate-back").addClass("hidden");
    $(".correlate-forward").addClass("hidden");
    $(".finish-adding-stage").show();
    $.each($(".edit-box"), function(i,e){
      $(e).attr("class", "edit-box");
    });
  });

  $(".data-collector .add-new").click(function(){
    var datacollector = prompt("Assume Normal Data Collector Flow. What is the name of the data collector you are creating?", "");
    if (datacollector != null) {
        $(".data-collectors .add-new").before("<option id='" + datacollector + "'>" + datacollector + "</option>")
    }
  });

  $.each($(".business-outcome-container .business-outcome-card"), function(i,e){
    var jsonObject = JSON.parse($(e).attr("data-json"));
    console.log(jsonObject);
    $(e).find(".title").text(jsonObject.bo);
    var $stageContainer = $(e).find(".stages");
    $.each(jsonObject.stages, function(i,e){
      $stageContainer.append("<div class='stage' data-name='" +  e.name + "'>" + e.name + "</div>");
    })
  });

  $(".business-outcome-container .edit-tag").click(function(){
    var objectString = $(this).parents(".business-outcome-card").attr("data-json");

    var currentObjectString = Cookies.get("objects");

    if(currentObjectString) {
      currentObjectString = currentObjectString.split("]}")[0];
      currentObjectString = currentObjectString + ", " + objectString;
      currentObjectString = currentObjectString + "]}";
    } else {
      currentObjectString = '{"objects":[' + objectString + ']}';
    }

    var newCookie = encodeURIComponent(currentObjectString);
    document.cookie = "objects=" + newCookie;

    var query = encodeURIComponent(objectString);

    window.location.href = "/edit-outcome?bo-edit=" + query;
  });

  if(window.location.href.indexOf("edit-outcome?bo-edit") > -1){
    var boObject = JSON.parse(getQueryVariable("bo-edit"));
    $(".business-outcome-name").val(boObject.bo);
    $.each(boObject.stages, function(i,e){
      $(".stages .section").append("<div class='edit-box' id='" + i + "'><input class='name' placeholder='Stage Name' value='" + e.name + "'></input></div>");
    });
    $(".add-box").hide();
    $.each($(".edit-box"), function(i,e) {
      $stage = $(".stage-edits-original").clone();
      $(".stage-edits-original").before($stage);
      $stage.removeClass("stage-edits-original").addClass("stage-edits");
      addSideEditListeners();
      $stage.removeClass("hidden");
      $stage.css("top", $(e).offset().top + "px");
      $stage.css("left", ($(e).offset().left + $(e).width() + 50) + "px");
      $stage.find(".step[id='1']").hide();
      $stage.addClass("archived-edits").removeClass("stage-edits").attr("id", i);
      $stage.find(".highlight-line").addClass("expanded");
      $stage.find(".add-field-button").show();
      $stage.find(".highlight-line").off();
      $stage.find(".highlight-line .contents").hide();
      $stage.find(".field-contents").show();
      $stage.find(".highlight-line.expanded").addClass("has-fields").removeClass("expanded");
    });
    $.each(boObject.stages, function(i,e){
      $originDiv = $('<div class="title-label origin">Origin: ' + e.origin + '</div>');
      $sourceTypeDiv = $('<div class="title-label source-type">Origin: ' + e.sourcetype + '</div>');
      $sourceDiv = $('<div class="title-label source">Origin: ' + e.source + '</div>');
      $($(".archived-edits .finished-info")[i]).append($originDiv);
      $($(".archived-edits .finished-info")[i]).append($sourceTypeDiv);
      $($(".archived-edits .finished-info")[i]).append($sourceDiv);
      $($(".archived-edits .finished-info")[i]).append('<div class="edit">Edit Stage</div>');
      $($(".archived-edits .finished-info")[i]).hide();
      var $fieldContents = $($(".archived-edits .field-contents")[i]);
      $.each(e.correlation, function(i,e){
        $fieldContents.append('<div class="field-box" id="' + e.name + '">' + e.name + ' <span class="delete">Delete</span></div>');
      });

      $(".add-field-button").click(function(){
        expandedButton(this);
      });

    });
    $(".field-box .delete").click(function(){
      $possibleParent = $(".edit-box[id='" + $(this).parents(".archived-edits").attr("id") + "']");
      var boxId = $(this).parents(".field-box").attr("id");
      var $fieldContents = $(this).parents(".field-contents");
      var $highlightLine = $(this).parents(".highlight-line");
      $(this).parents(".field-box").remove();
      if(!$fieldContents.find(".field-box").length){
        $highlightLine.removeClass("has-fields");
        $highlightLine.addClass("expanded");
        $highlightLine.find(".contents").show();
        $highlightLine.find(".field-contents").hide();
        $highlightLine.find(".field-contents .field-box").remove();
        $highlightLine.find(".add-field-button").hide();
        $highlightLine.click(function(){
          expandedButton(this);
        });
      };
      checkForMatch(this, boxId, true, $possibleParent);
    });

    $.each($(".field-box"), function(i,e){

      var nextId = parseInt($(e).parents(".archived-edits").attr("id")) + 1;
      var prevId = parseInt($(e).parents(".archived-edits").attr("id")) - 1;

      var $nextBox = $(".archived-edits[id='" + nextId + "']");
      var $prevBox = $(".archived-edits[id='" + prevId + "']");
      
      if($nextBox.find(".field-box[id='" + $(e).attr('id') + "']").length) {
        var $thisBox = $(".edit-box[id='" + $(e).parents(".archived-edits").attr('id') + "']");
        var classToAdd = "matched-below-" + $(e).attr('id');
        if($thisBox.length){
          if(!$thisBox.hasClass(classToAdd)){
            $thisBox.addClass(classToAdd);
          }
        }
      }

      if($prevBox.find(".field-box[id='" + $(e).attr('id') + "']").length) {
        var $thisBox = $(".edit-box[id='" + $(e).parents(".archived-edits").attr('id') + "']");
        var classToAdd = "matched-above-" + $(e).attr('id');
        if($thisBox.length){
          if(!$thisBox.hasClass(classToAdd)){
            $thisBox.addClass(classToAdd);
          }
        }
      }
    });

    $(".data-collector .select").off();

    $(".data-collector .select").click(function(){
      dataCollectorSelect(this);
    });

  }

});