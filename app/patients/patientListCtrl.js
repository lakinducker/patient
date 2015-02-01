/**
 * Created by Lakin on 12/20/2014.
 */
(function () {
    "use strict";
    angular
        .module("patientManagement")
        .controller("PatientListCtrl",
                    ["patientResource",
                        PatientListCtrl]);

    function PatientListCtrl(patientResource) {
        var vm = this;

        patientResource.query(function(data) {
            vm.patients = data;
        });

    }
}());
