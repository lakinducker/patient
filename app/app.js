/**
 * Created by Lakin on 12/20/2014.
 */
(function () {
    "use strict";
    var app = angular.module("patientManagement",
        ["common.services",
            "ui.router",
            "ui.mask",
            "ui.bootstrap",
            "angularCharts",
            "patientResourceMock"]);



    app.config(["$stateProvider",
            "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state("home", {
                        url: "/home",
                        templateUrl: "app/welcomeView.html"
                    })
                    // Patients
                    .state("patientList", {
                        url: "/",
                        templateUrl: "app/patients/patientListView.html",
                        controller: "PatientListCtrl as vm"
                    })
                    .state("patientEdit", {
                        abstract: true,
                        url: "/patients/edit/:patientId",
                        templateUrl: "app/patients/patientEditView.html",
                        controller: "PatientEditCtrl as vm",
                        resolve: {
                            patientResource: "patientResource",

                            patient: function (patientResource, $stateParams) {
                                var patientId = $stateParams.patientId;
                                return patientResource.get({ patientId: patientId }).$promise;
                            }
                        }
                    })
                    .state("patientEdit.info", {
                        url: "/info",
                        templateUrl: "app/patients/patientEditInfoView.html"
                    })
                    .state("patientEdit.pre", {
                        url: "/pre",
                        templateUrl: "app/patients/patientEditPreView.html"
                    })
                    .state("patientEdit.treatment", {
                        url: "/treatment",
                        templateUrl: "app/patients/patientEditTreatmentView.html"
                    })
                    .state("patientEdit.6month", {
                        url: "/6month",
                        templateUrl: "app/patients/patientEdit6MonthView.html"
                    })
                    .state("patientEdit.12month", {
                        url: "/12month",
                        templateUrl: "app/patients/patientEdit12MonthView.html"
                    })
                    .state("patientDetail", {
                        url: "/patients/:patientId",
                        templateUrl: "app/patients/patientDetailView.html",
                        controller: "PatientDetailCtrl as vm",
                        resolve: {
                            patientResource: "patientResource",

                            patient: function (patientResource, $stateParams) {
                                var patientId = $stateParams.patientId;
                                return patientResource.get({ patientId: patientId }).$promise;
                            }
                        }
                    })
                    .state("outcomeAnalytics", {
                        url: "/outcomeAnalytics",
                        templateUrl:"app/outcomes/outcomeAnalyticsView.html",
                        controller: "OutcomeAnalyticsCtrl",
                        resolve: {
                            patientResource: "patientResource",

                            patients: function (patientResource) {
                                return patientResource.query(function(response) {
                                        // no code needed for success
                                    },
                                    function(response) {
                                        if (response.status == 404) {
                                            alert("Error accessing resource: " +
                                                response.config.method + " " +response.config.url);
                                        } else {
                                            alert(response.statusText);
                                        }
                                    }).$promise;

                            }
                        }
                    })
            }]
    );
}());
