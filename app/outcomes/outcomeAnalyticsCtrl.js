/**
 * Created by Deb on 9/4/2014.
 */
(function () {
    "use strict";

    angular
        .module("patientManagement")
        .controller("OutcomeAnalyticsCtrl",
                    ["$scope",
                     "$filter",
                     "patients",
                     "patientService",
                     OutcomeAnalyticsCtrl]);

    function OutcomeAnalyticsCtrl($scope,$filter, patients, patientService){
        $scope.title="Outcome Analytics";

        // Computed property
        for (var i = 0; i < patients.length; i++) {
            patients[i].improvementPercent =
                patientService.calculateImprovementPercent(patients[i].odi_00,
                                                        patients[i].odi_12);
            patients[i].improvementAmount =
                patientService.calculateImprovementAmount(patients[i].odi_00,
                                                        patients[i].odi_12);
        }
        var orderedPatientsAmount = $filter("orderBy")(patients, "improvementAmount");
        var filteredPatientsAmount = $filter("limitTo")(orderedPatientsAmount, 5);

        var chartDataAmount = [];
        for (var i = 0; i < filteredPatientsAmount.length; i++) {
            chartDataAmount.push({
                x: filteredPatientsAmount[i].patientId,
                y: [filteredPatientsAmount[i].odi_00,
                    filteredPatientsAmount[i].odi_12,
                    filteredPatientsAmount[i].improvementAmount]
            });
        }

        $scope.dataAmount = {
            series: ["Pre", "12m", "Improvement Amount"],
            data: chartDataAmount
        };

        $scope.configAmount = {
            title: "Patient Outcomes",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };

        var orderedPatientsPercent = $filter("orderBy")(patients, "improvementPercent");
        var filteredPatientsPercent = $filter("limitTo")(orderedPatientsPercent, 5);

        var chartDataPercent = [];
        for (var i = 0; i < filteredPatientsPercent.length; i++) {
            chartDataPercent.push({
                x: filteredPatientsPercent[i].patientId,
                y: [filteredPatientsPercent[i].improvementPercent]
            });
        }

        $scope.dataPercent = {
            series: ["Improvement %"],
            data: chartDataPercent
        };

        $scope.configPercent = {
            title: "Top % Improvement Patients",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };

    }
}());
