angular.module('items', [])
    .controller('MainCtrl', [
        //scope for post
        '$scope', '$http',
        function($scope, $http) {
            $scope.candidates = [];
            $scope.items = [];
            $scope.addItem = function() {
                var newitem = { name: $scope.candidateName, upvotes: 0, info: $scope.candidateInfo, url: $scope.candidatePicture };
                // $scope.candidateName = '';
                // $scope.candidateInfo = '';
                // $scope.candidatePicture = '';
                $http.post('/items', newitem).success(function(data) {
                    $scope.candidates.push(data);
                    $scope.items.push(data);
                });
            };
            
            $scope.voteItem = function(){
                $scope.selectedItems = [];
                angular.forEach($scope.items, function(item){
                    if (!!item.selected) $scope.selectedItems.push(item);
                    // unselect after the checkboxes
                    // item.selected = false;
                });
                //print the things I have voted
                console.log($scope.selectedItems);
                //make copy onto the server...
                angular.forEach($scope.selectedItems, function(selectedItem, item){
                    $http.put('/items/' + selectedItem._id + '/upvote')
                        .success(function(data){
                            console.log("upvote via checkbox worked");
                            item.upvotes += 1;
                        });
                });
                $scope.getAll();
                angular.copy($scope.selectedItems);
            };
            
            //scope for items
            $scope.incrementUpvotes = function(candidate) {
                $http.put('/items/' + candidate._id + '/upvote')
                    .success(function(data) {
                        console.log("upvote worked");
                        candidate.upvotes += 1;
                    });
                // candidate.upvotes += 1;
            };
            $scope.delete = function(candidate) {
                console.log(candidate._id);
                $http.delete('/items/' + candidate._id)
                    .success(function(data) {
                        console.log("delete worked");
                        $scope.getAll();
                    });
            };
            
            $scope.getAll = function() {
                return $http.get('/items').success(function(data) {
                    angular.copy(data, $scope.candidates);
                    angular.copy(data, $scope.items);
                });
            };
            $scope.getAll();
        }
    ]);
