/**
 * Created by Lakin on 12/21/2014.
 */
(function () {
    "use strict";

    var app = angular
                .module("patientResourceMock",
                        ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var patients = [
            {
                "patientId": 1002,
                "patientInitials": "GRD",
                "randomization": "A",
                "surgeryDate": "2013-02-15T00:00:00-01:00",
                "diagnosis": 1,
                "nurick": 3,
                "L1L2": false,
                "L2L3": false,
                "L3L4": true,
                "L4L5": true,
                "L5S1": false,
                "or_time": 55,
                "odi_00": 84,
                "odi_06": 45,
                "odi_12": 21,
                "vas_back_00": 92,
                "vas_back_06": 35,
                "vas_back_12": 35,
                "vas_leg_00": 79,
                "vas_leg_06": 33,
                "vas_leg_12": 22
            },
            {
                "patientId": 1005,
                "patientInitials": "BWS",
                "randomization": "B",
                "surgeryDate": "2013-04-11T00:00:00-01:00",
                "diagnosis": 2,
                "nurick": 1,
                "L1L2": true,
                "L2L3": true,
                "L3L4": true,
                "L4L5": false,
                "L5S1": false,
                "or_time": 67,
                "odi_00": 84,
                "odi_06": 45,
                "odi_12": 54,
                "vas_back_00": 92,
                "vas_back_06": 35,
                "vas_back_12": 35,
                "vas_leg_00": 79,
                "vas_leg_06": 33,
                "vas_leg_12": 22
            },
            {
                "patientId": 1008,
                "patientInitials": "FBM",
                "randomization": "B",
                "surgeryDate": "2013-09-05T00:00:00-01:00",
                "diagnosis": 4,
                "nurick": 4,
                "L1L2": false,
                "L2L3": true,
                "L3L4": false,
                "L4L5": false,
                "L5S1": false,
                "or_time": 57,
                "odi_00": 84,
                "odi_06": 45,
                "odi_12": 36,
                "vas_back_00": 92,
                "vas_back_06": 35,
                "vas_back_12": 35,
                "vas_leg_00": 79,
                "vas_leg_06": 33,
                "vas_leg_12": 22
            },
            {
                "patientId": 1009,
                "patientInitials": "BWB",
                "randomization": "A",
                "surgeryDate": "2013-10-25T00:00:00-01:00",
                "diagnosis": 3,
                "nurick": 2,
                "L1L2": false,
                "L2L3": false,
                "L3L4": false,
                "L4L5": true,
                "L5S1": true,
                "or_time": 84,
                "odi_00": 84,
                "odi_06": 45,
                "odi_12": 31,
                "vas_back_00": 92,
                "vas_back_06": 35,
                "vas_back_12": 35,
                "vas_leg_00": 79,
                "vas_leg_06": 33,
                "vas_leg_12": 22
            },
            {
                "patientId": 1010,
                "patientInitials": "ANF",
                "randomization": "B",
                "surgeryDate": "2013-12-14T00:00:00-01:00",
                "diagnosis": 1,
                "nurick": 3,
                "L1L2": false,
                "L2L3": false,
                "L3L4": true,
                "L4L5": true,
                "L5S1": false,
                "or_time": 99,
                "odi_00": 84,
                "odi_06": 45,
                "odi_12": 18,
                "vas_back_00": 92,
                "vas_back_06": 35,
                "vas_back_12": 35,
                "vas_leg_00": 79,
                "vas_leg_06": 33,
                "vas_leg_12": 22
            }
        ];

        var patientUrl = "/api/patients"

        $httpBackend.whenGET(patientUrl).respond(patients);

        var editingRegex = new RegExp(patientUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var patient = {"patientId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < patients.length; i++) {
                    if (patients[i].patientId == id) {
                        patient = patients[i];
                        break;
                    }
                };
            }
            return [200, patient, {}];
        });

        $httpBackend.whenPOST(patientUrl).respond(function (method, url, data) {
            var patient = angular.fromJson(data);

            if (!patient.patientId) {
                // new patient Id
                patient.patientId = patients[patients.length - 1].patientId + 1;
                patients.push(patient);
            }
            else {
                // Updated patient
                for (var i = 0; i < patients.length; i++) {
                    if (patients[i].patientId == patient.patientId) {
                        patients[i] = patient;
                        break;
                    }
                };
            }
            return [200, patient, {}];
        });

        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();


    })
}());
