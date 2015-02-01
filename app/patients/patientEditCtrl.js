/**
 * Created by Lakin on 12/26/2014.
 */
(function () {
    "use strict";

    angular
        .module("patientManagement")
        .controller("PatientEditCtrl",
        ["patient",
            "$state",
            "patientService",
            PatientEditCtrl]);


    function PatientEditCtrl(patient, $state, patientService) {
        var vm = this;

        vm.patient = patient;

        if (vm.patient && vm.patient.patientId) {
            vm.title = "Edit: " + vm.patient.patientId + " " + vm.patient.patientInitials;
        }
        else {
            vm.title = "New Patient";
        }

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        };

        vm.submit = function (isValid) {
            if (isValid) {
                vm.patient.$save(function (data) {
                    toastr.success("Save Successful");
                })
            } else {
                alert("Please correct the validation errors first.");
            }
        };

        vm.cancel = function () {
            $state.go('patientList');
        };

    }
}());
