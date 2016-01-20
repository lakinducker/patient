/**
 * Created by Lakin on 12/26/2014.
 */
(function () {
    "use strict";

    angular
        .module("patientManagement")
        .controller("PatientDetailCtrl",
                    ["patient",
                     "patientService",
                     PatientDetailCtrl]);

    function PatientDetailCtrl(patient, patientService) {
        var vm = this;

        vm.patient = patient;

        vm.title = "Patient Detail: " + vm.patient.patientId + " " + vm.patient.patientInitials;

    }
}());
