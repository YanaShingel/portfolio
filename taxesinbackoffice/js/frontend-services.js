var adminAppService = angular.module('frontendServices', []);

adminAppService.service('UserService', [ '$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
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

adminAppService.service('SuggestService', [ '$http', '$q', function($http, $q) {
	return {
		suggest : function(type) {
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
} ]);

adminAppService
		.service(
				'TaxesInBackOfficeService',
				[
						'$http',
						'$q',
						'$rootScope',
						function($http, $q, $rootScope) {
							return {
								loadData : function(searchData) {
									var deferred = $q.defer();
									$http
											.post('/taxesinbackoffice',
													searchData)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of taxesinbackoffice');
														}
													});

									return deferred.promise;
								},
								saveData : function(settingData) {
									var deferred = $q.defer();
									$http
											.post('/taxesinbackoffice/saveData/',
													settingData)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of taxesinbackoffice');
														}
													});

									return deferred.promise;
								},
								deleteData : function(id) {
									var deferred = $q.defer();

									$http(
											{
												method : 'DELETE',
												url : '/taxesinbackoffice/delete',
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
								suggestPartners : function(query) {
									var deferred = $q.defer();
									$http
											.get('/suggest/company/', query)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of taxesinbackoffice');
														}
													});

									return deferred.promise;
								},
								suggestTypeOfCompany : function(query) {
									var deferred = $q.defer();
									$http
											.get('/suggest/companytype/', query)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of taxesinbackoffice');
														}
													});

									return deferred.promise;
								},
								suggestTypeOfService : function(query) {
									var deferred = $q.defer();
									$http
											.get('/suggest/serviceType/', query)
											.then(
													function(response) {
														if (response.status == 200) {
															deferred
																	.resolve(response.data);
															// $rootScope.$broadcast('processing.finished');
														} else {
															deferred
																	.reject('Error retrieving list of taxesinbackoffice');
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