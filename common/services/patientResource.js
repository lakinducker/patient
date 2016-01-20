/**
 * Created by Lakin on 12/21/2014.
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("patientResource",
                ["$resource",
                 patientResource]);

    function patientResource($resource) {
        return $resource("/api/patients/:patientId")
    }

}());
