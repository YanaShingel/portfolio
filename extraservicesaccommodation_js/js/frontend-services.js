var adminAppService = angular.module('frontendServices', []);
adminAppService.service('UserService', [ '$http', '$q', function($http, $q) {
	return {
		logout : function() {
			$http({
				method : 'POST',
				url : '/logout'
			}).then(function(response) {
				if (response.status == 200) {
					window.location.reload();
				} else {
					console.log("Logout failed!");
				}
			});
		}
	};
} ]);
adminAppService
		.service(
				'ExtraServicesAccomodationService',
				[
						'$http',
						'$q',
						'$rootScope',
						function($http, $q, $rootScope) {
							return {
								loadData : function(searchData) {
									var deferred = $q.defer();
									$http
											.post(
													'/extraServicesAccommodation',
													searchData)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of bankamountfees');
														}
													});

									return deferred.promise;
								},
								changeData : function(params) {
									console.log(params);
									var deferred = $q.defer();
									$http
											.post(
													'/extraServicesAccommodation/changeData',
													params)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
														} else {
															deferred
																	.reject('Error retrieving list');
														}
													});
									return deferred.promise;
								},
								saveData : function(basicForm, settingForm) {
									console.log(basicForm, settingForm);
									var deferred = $q.defer();

									$http(
											{
												method : 'PUT',
												url : '/extraServicesAccommodation/saveData',
												data : {
													'basicForm' : basicForm,
													'settingForm' : settingForm,
												}
											})
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
														} else {
															deferred
																	.reject('Error retrieving list');
														}
													});
									return deferred.promise;
								},
								deleteData : function(id) {
									var deferred = $q.defer();

									$http(
											{
												method : 'DELETE',
												url : '/extraServicesAccommodation/delete',
												params : {
													Id : id
												}
											})
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
														} else {
															deferred
																	.reject('Error retrieving list');
														}
													});
									return deferred.promise;
								},
								// changeData2 : function(params) {
								// console.log(params);
								// var deferred = $q.defer();
								// $http
								// .post('/extraServicesAccommodation/changeData2',
								// params)
								// .then(
								// function(response) {
								// if (response.status == 200) {
								// deferred
								// .resolve(response.data);
								// } else {
								// deferred
								// .reject('Error retrieving list');
								// }
								// });
								// return deferred.promise;
								// },
								suggestCurrency : function(query) {
									var deferred = $q.defer();
									$http
											.get('/suggest/currency/', query)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of bankamountfees');
														}
													});

									return deferred.promise;
								},
								suggestData : function(query) {
									var deferred = $q.defer();
									$http
											.get('/suggest/basicRoom/', query)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of bankamountfees');
														}
													});

									return deferred.promise;
								},
								suggestProvider : function(query) {
									var deferred = $q.defer();
									$http
											.get('/suggest/providers/', query)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of bankamountfees');
														}
													});

									return deferred.promise;
								},
							}

						} ]);
adminAppService
		.service(
				'tags',
				function($http, $q) {
					var urls = {
						'COUNTRY' : '/entityPicker/findCountries/',
						'CURRENCY' : '/entityPicker/findCurrencies/',
						'SERVICE_TYPE_COMBINATION' : '/entityPicker/findServiceTypeCombinations/',
						'CITIES_WITH_COUNTRIES' : '/entityPicker/findCitiesWithCountriesFromMapping/',
						'COUNTRIES' : '/entityPicker/findCountriesFromMapping/',
						'COMPANIES' : '/entityPicker/findCompaniesByName/',
						'SERVICES' : '/entityPicker/findServicesByName/',
						'COUNTRY_BY_NAME' : '/entityPicker/findCountriesByName/',
						'CURRENCY_BY_NAME' : '/entityPicker/findCurrenciesByName/',
						'COUNTRIES_WITH_CITIES' : '/entityPicker/findCountryWithCitiesFromMapping/'
					}
					this.load = function(query, type) {
						var url = urls[type];
						var deferred = $q.defer();
						var reqGetSuggestedWords = $http({
							url : url,
							params : {
								'query' : query
							}
						});
						reqGetSuggestedWords.success(function(data) {
							deferred.resolve(data);
						});
						return deferred.promise;
					};
					this.loadCitiesWithCountry = function(countryName, cityName) {
						var deferred = $q.defer();
						var reqGetSuggestedWords = $http({
							url : '/entityPicker/findCitiesWithCountryFromMapping/',
							params : {
								'countryName' : countryName,
								'cityName' : cityName
							}
						});
						reqGetSuggestedWords.success(function(data) {
							deferred.resolve(data);
						});
						return deferred.promise;
					};
				});
adminAppService.service('SuggestService', [ '$http', '$q', function($http, $q) {
	return {
		suggest : function (type){
    		var deferred = $q.defer();
    		var urls = {
    				'LOGINROLE' : '/suggest/loadLoginAndRoles/',
    				'SERVICETYPE' : '/suggest/serviceType/',
    				'PROVIDER' : '/suggest/provider/',
    				'CURRENCY' : '/suggest/currency/',
    				'PAYMENTSYSTEM' : '/suggest/PaymentsSystem/',
    				'COMPANYTYPE' : '/suggest/companyType/',
    			}
    		var url = urls[type];
			$http.get(url).then(function(response) {
				if (response.status == 200) {
					deferred.resolve(response.data);
				} else {
					deferred.reject('Error retrieving list of test data');
				}
			});
			return deferred.promise;
		},
	};
}]);
adminAppService.filter('yesNo', function() {
	return function(input) {
		return input ? 'yes' : 'no';
	}
})