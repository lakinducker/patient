/**
 * Created by Deb on 9/2/2014.
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("patientService",
                 patientService);

    function patientService(){
        function calculateImprovementPercent(preScore, postScore) {
            var improvement = 0;
            if (preScore && postScore) {
                improvement = (100 * (preScore - postScore)) / preScore;
            }
            improvement = Math.round(improvement);
            return improvement;
        }
        function calculateImprovementAmount(preScore, postScore) {
            var improvement = 0;
            if (preScore && postScore) {
                improvement = preScore - postScore;
            }
            return improvement;
        }
        function calculateOutcomeFromPercent(postScore, percent) {
            var preScore = postScore;
            if (postScore && percent) {
                preScore = postScore + (postScore * percent / 100);
                preScore = (Math.round(preScore * 100)) / 100;
            }
            return preScore;
        }
        function calculateOutcomeFromAmount(postScore, amount) {
            var preScore = postScore;
            if (postScore && amount) {
                preScore = postScore + amount;
                preScore = (Math.round(preScore * 100)) / 100;
            }
            return preScore;
        }

        return {
            calculateImprovementPercent: calculateImprovementPercent,
            calculateImprovementAmount: calculateImprovementAmount,
            calculateOutcomeFromMarkupPercent: calculateOutcomeFromPercent,
            calculateOutcomeFromMarkupAmount: calculateOutcomeFromAmount
        }

    }


}());
