var adminApp = angular.module('adminApp', [ 'ngRoute', 'frontendServices',
		'spring-security-csrf-token-interceptor', 'ngTagsInput' ]);

adminApp
		.controller(
				'TaxesInBackOfficeCtrl',
				[
						'$scope',
						'$window',
						'$document',
						'$location',
						'tags',
						'UserService',
						'TaxesInBackOfficeService',
						'SuggestService',
						'$timeout',
						'$rootScope',
						function($scope, $window, $document, $location, tags,
								UserService, TaxesInBackOfficeService,
								SuggestService, $timeout, $rootScope) {

							pageNumber = 1;

							$scope.vm = {

								disabledCountry : true,
								disabledCity : true,
								disabledPartner : true,
								disabledSalesPartner : true,
								disabledService : true,
								disabledTax : true,
								services : [],
								partners : [],
								salesPartners : [],
								cities : [],
								countries : [],
								showEditIcon : false,
								showCreateForm : false,
								closeForm : false,
								list : [],
								partners : [],
								totalPages : 0,
								services : [],

								searchData : {
									categories : [],
									countries : [],
									cities : [],
									partners : [],
									salesPartners : [],
									tax : null,
									currentPage : 1,
									limit : 20,
									amount : null,
								},

								picked : {
									cityFilter : [],
									countryFilter : [],
									partnerFilter : [],
									salesPartnerFilter : [],
									categoryFilter : [],
									taxFilter : null,
									amount : {
										active : false,
										closed : false,
									}
								},

								editData : {
									services : [],
									countries : [],
									cities : [],
									partners : [],
									salesPartners : [],
								},

								settingForm : {
									id : null,
									tax : null,
									city : {},
									country : {},
									partnerId : null,
									salesPartnerId : null,
									services : [],
									amount : "",
									status : "",

								}
							}

							$scope.suggest = {
								userLogin : "",
								userRole : [],
							}

							$scope.editSettings = function(id) {
								$scope.vm.showCreateForm = true;
								$scope.FormName = "Edit";
								$scope.vm.showEditIcon = true;
								$scope.vm.settingForm.id = id;
								var i = 0;
								var id;
								var v = 0;
								for (i = 0; i < $scope.vm.list.length; i++) {
									if ($scope.vm.list[i].id == $scope.vm.settingForm.id) {
										id = $scope.vm.settingForm.id;
										v = i;
										break;
									}
								}
								$scope.vm.list[v].id = id;
								if ($scope.vm.list[v].countryId != null) {
									$scope.vm.editData.countries = [ $scope.vm.list[v].countryName ];
									$scope.vm.settingForm.countryId = $scope.vm.list[v].countryId;
									$scope.vm.settingForm.countryName = $scope.vm.list[v].countryName;
								}
								if ($scope.vm.list[v].cityId != null) {
									$scope.vm.editData.cities = [ $scope.vm.list[v].cityName ];
									$scope.vm.settingForm.cityId = $scope.vm.list[v].cityId;
									$scope.vm.settingForm.cityName = $scope.vm.list[v].cityName;
								}
								if ($scope.vm.list[v].partner != null) {
									$scope.vm.editData.partners = [ $scope.vm.list[v].partner ];
									$scope.vm.settingForm.partnerId = $scope.vm.editData.partners[0].id;
								}
								if ($scope.vm.list[v].salesPartner != null) {
									$scope.vm.editData.salesPartners = [ $scope.vm.list[v].salesPartner ];
									$scope.vm.settingForm.salesPartnerId = $scope.vm.editData.salesPartners[0].id;
								}
								// if ($scope.vm.list[v].service != null) {
								// for (i = 0; i <
								// $scope.vm.list[v].service.length; i++) {
								// $scope.vm.editData.services
								// .push($scope.vm.list[v].service[i].service.fullName);
								// $scope.vm.settingForm.services
								// .push($scope.vm.list[v].service[i].service);
								// }
								// }
								if ($scope.vm.list[v].service.length > 0) {
									$scope.vm.editData.services = [];
									$scope.vm.list[v].service.forEach(function(
											row) {
										$scope.vm.editData.services.push({
											name : row.service.fullName,
											id : row.service.id
										});
										$scope.vm.settingForm.services
												.push(row.service);
									})
								}

								if ($scope.vm.list[v].tax != null)
									$scope.vm.settingForm.tax = $scope.vm.list[v].tax;
								if ($scope.vm.list[v].amount == 'TRUE') {
									$scope.vm.settingForm.amount = "TRUE";
								} else
									$scope.vm.settingForm.amount = "FALSE";

								if ($scope.vm.list[v].status == 'ACTIVE') {
									$scope.vm.settingForm.status = "ACTIVE";
								} else
									$scope.vm.settingForm.status = "CLOSED";
							}

							$scope.saveData = function() {
								if ($scope.validate().length == 0) {
									$scope.vm.showCreateForm = false;
									TaxesInBackOfficeService.saveData(
											$scope.vm.settingForm).then(
											function(data) {
												loadData();
												$scope.vm.editData = {
													services : [],
													countries : [],
													cities : [],
													partners : [],
													salesPartners : [],
												};
												$scope.vm.settingForm = {
													id : null,
													tax : null,
													city : {},
													country : {},
													partnerId : null,
													salesPartnerId : null,
													services : [],
													amount : "",
													status : "",
												}
											})
								} else {
									alert($scope.validate());
								}
							}

							$scope.createForm = function() {
								$scope.vm.showCreateForm = true;
								$scope.FormName = "Create";
								$scope.vm.showEditIcon = false;

								$scope.vm.disabledCountry = false;
								$scope.vm.disabledCity = false;
								$scope.vm.disabledPartner = false;
								$scope.vm.disabledSalesPartner = false;
								$scope.vm.disabledService = false;
								$scope.vm.disabledTax = false;
								$scope.vm.editData.cities = [];
								$scope.vm.editData.partners = [];
								$scope.vm.editData.salesPartners = [];
								$scope.vm.editData.services = [];
								$scope.vm.settingForm.tax = null;
								$scope.vm.settingForm.amount = "TRUE";
								$scope.vm.settingForm.status = "ACTIVE";
								$scope.vm.settingForm.id = null;
								$scope.vm.editData.countries = [];
							}

							$scope.closeForm = function() {
								$scope.vm.showCreateForm = false;
								$scope.vm.disabledCountry = true;
								$scope.vm.disabledCity = true;
								$scope.vm.disabledPartner = true;
								$scope.vm.disabledSalesPartner = true;
								$scope.vm.disabledService = true;
								$scope.vm.disabledTax = true;
								$scope.vm.editData = {
									services : [],
									countries : [],
									cities : [],
									partners : [],
									salesPartners : [],
								};
								$scope.vm.settingForm = {
									id : null,
									tax : null,
									city : {},
									country : {},
									partnerId : null,
									salesPartnerId : null,
									services : [],
									amount : "",
									status : "",
								}
							}

							$scope.logout = function() {
								UserService.logout();
							}

							// paginator
							$scope.next = function(index) {
								if ($scope.vm.searchData.currentPage < $scope.vm.totalPages) {
									$scope.vm.searchData.currentPage += 1;
									loadData();
								}
							};

							$scope.previous = function(index) {
								if ($scope.vm.searchData.currentPage > 1) {
									$scope.vm.searchData.currentPage -= 1;
									loadData();
								}
							};

							$scope.goToPage = function(pageNumber) {
								$scope.vm.searchData.currentPage = pageNumber;
								loadData();
							};

							$scope.pages = function() {
								$scope.tempPage = [];
								for (i = 1; i <= ($scope.vm.totalPages); i++) {
									$scope.tempPage.push(i);
								}
								return $scope.tempPage;
							};

							// add and Remove Tags
							$scope.addCountry = function(tag) {
								$scope.vm.searchData.countries.push(tag.id);

								loadData();
							}

							$scope.addCountryEdit = function(tag) {
								$scope.vm.editData.countries = [];
								$scope.vm.editData.countries.push(tag);
								$scope.vm.settingForm.countryId = tag.id;
								$scope.vm.settingForm.countryName = tag.name;
							}

							$scope.addCityEdit = function(tag) {
								$scope.vm.disabledCountry = false;
								$scope.vm.editData.cities = [];
								$scope.vm.editData.cities.push(tag);
								$scope.vm.settingForm.cityId = tag.id;
								$scope.vm.settingForm.cityName = tag.name;

								$scope.vm.editData.countries = [ {
									id : tag.countryId,
									name : tag.countryName
								} ]

								$scope.vm.settingForm.countryId = tag.countryId;
								$scope.vm.settingForm.countryName = tag.countryName;
							}

							$scope.addPartnerEdit = function(tag) {
								$scope.vm.editData.partners = [];
								$scope.vm.editData.partners.push(tag);
								$scope.vm.settingForm.partnerId = tag.id;
							}

							$scope.addSalesPartnerEdit = function(tag) {
								$scope.vm.editData.salesPartners = [];
								$scope.vm.editData.salesPartners.push(tag);
								$scope.vm.settingForm.salesPartnerId = tag.id;
							}

							$scope.addCity = function(tag) {

								$scope.vm.searchData.cities.push(tag.id);

								loadData();
							}

							$scope.addPartner = function(tag) {
								$scope.vm.searchData.partners.push(tag.id);
								loadData();
							}

							$scope.addCategory = function(tag) {
								$scope.vm.searchData.categories.push(tag.id);
								loadData();
							}

							$scope.addServiceEdit = function(tag) {
								if ($scope.vm.editData.services != undefined
										&& $scope.vm.editData.services != null) {
									$scope.vm.settingForm.services.push(tag);
								}
							}

							$scope.addSalesPartner = function(tag) {
								$scope.vm.searchData.salesPartners.push(tag.id);

								loadData();
							}
							$scope.removeCategory = function(tag) {
								for (var i = 0; i < $scope.vm.searchData.categories.length; i++) {
									if ($scope.vm.searchData.categories[i] == tag.id) {
										$scope.vm.searchData.categories.splice(
												i, 1);
									}
								}

								loadData();
							}

							$scope.removePartner = function(tag) {
								for (var i = 0; i < $scope.vm.searchData.partners.length; i++) {
									if ($scope.vm.searchData.partners[i] == tag.id) {
										$scope.vm.searchData.partners.splice(i,
												1);
									}
								}

								loadData();
							}

							$scope.removeCountry = function(tag) {
								for (var i = 0; i < $scope.vm.searchData.countries.length; i++) {
									if ($scope.vm.searchData.countries[i] == tag.id) {
										$scope.vm.searchData.countries.splice(
												i, 1);
									}
								}
								loadData();
							}

							$scope.removeSalesPartner = function(tag) {
								for (var i = 0; i < $scope.vm.searchData.salesPartners.length; i++) {
									if ($scope.vm.searchData.salesPartners[i] == tag.id) {
										$scope.vm.searchData.salesPartners
												.splice(i, 1);
									}
								}

								loadData();
							}

							$scope.removeCity = function(tag) {
								for (var i = 0; i < $scope.vm.searchData.cities.length; i++) {
									if ($scope.vm.searchData.cities[i] == tag.id) {
										$scope.vm.searchData.cities
												.splice(i, 1);
									}
								}

								loadData();
							}

							$scope.removeCountryEdit = function(tag) {
								$scope.vm.editData.countries = [];
								$scope.vm.settingForm.countryId = null;
								$scope.vm.settingForm.countryName = null;
								$scope.vm.editData.cities = [];
								$scope.vm.settingForm.cityId = null;
								$scope.vm.settingForm.cityName = null;
							}

							$scope.removeCityEdit = function(tag) {
								$scope.vm.editData.cities = [];
								$scope.vm.settingForm.cityId = null;
								$scope.vm.settingForm.cityName = null;
							}

							$scope.removePartnerEdit = function(tag) {
								$scope.vm.editData.partners = [];
								$scope.vm.settingForm.partnerId = null;
							}

							$scope.removeSalesPartnerEdit = function(tag) {
								$scope.vm.editData.salesPartners = [];
								$scope.vm.settingForm.salesPartnerId = null;
							}

							$scope.removeServiceEdit = function(tag) {
								if ($scope.vm.editData.services.length == 0) {
									$scope.vm.settingForm.services = [];
								}

								for (var i = 0; i < $scope.vm.settingForm.services.length; i++) {
									if ($scope.vm.settingForm.services[i].fullName == tag.name) {
										$scope.vm.settingForm.services.splice(
												i, 1);
									}
								}
							}

							// suggest

							$scope.suggestCitiesWithCountries2 = function(
									countryName, cityName) {
								if ($scope.vm.editData.countries.length == 0) {
									var countryName = "";
									$scope.vm.searchData.currentPage = 1;
									return tags.loadCitiesWithCountry(
											countryName, cityName,
											'CITIES_WITH_COUNTRIES');
								} else {
									var countryName = $scope.vm.editData.countries[0].name;
									return tags.loadCitiesWithCountry(
											countryName, cityName,
											'CITIES_WITH_COUNTRIES');
								}
							};

							$scope.suggestCitiesWithCountries = function(
									countryName, cityName) {
								var countryName = "";
								$scope.vm.searchData.currentPage = 1;
								return tags.loadCitiesWithCountry(countryName,
										cityName, 'CITIES_WITH_COUNTRIES');
							};

							$scope.suggestCountryNames = function(query) {
								$scope.vm.searchData.currentPage = 1;
								return tags.load(query, 'COUNTRIES');
							}

							$scope.suggestCountryNames2 = function(query) {
								$scope.vm.searchData.currentPage = 1;
								return tags.load(query, 'COUNTRIES');
							}

							$scope.suggestPartner = function(query) {
								$scope.vm.searchData.currentPage = 1;
								return tags.load(query, 'COMPANIES');
							}

							// function

							$scope.search = function() {
								$scope.vm.searchData.currentPage = 1;
								$scope.vm.searchData.tax = $scope.vm.picked.taxFilter == undefined ? ''
										: $scope.vm.picked.taxFilter;
								if ($scope.vm.picked.amount.active != $scope.vm.picked.amount.closed) {
									if ($scope.vm.picked.amount.active == true) {
										$scope.vm.searchData.amount = "TRUE";
									} else {
										$scope.vm.searchData.amount = "FALSE";
									}
								} else {
									$scope.vm.searchData.amount = null;
								}

								loadData();
							}

							$scope.deleteSetting = function(id) {
								TaxesInBackOfficeService.deleteData(id).then(
										function() {
											loadData();
										})
							}

							// settingForm : {
							// id : null,
							// tax : null,
							// city : {},
							// country : {},
							// partnerId : null,
							// salesPartnerId : null,
							// services : [],
							// amount : "",
							// status : "",

							$scope.validate = function() {
								var errors = [];
								if ($scope.vm.editData.partners == ""
										&& $scope.vm.editData.salesPartners == "") {
									errors
											.push("Set Partner or Sales Partner \n");
								}
								if ($scope.vm.editData.partners != ""
										&& $scope.vm.editData.salesPartners != "") {
									errors
											.push("Select an option Partner or Sales Partner \n");
								}
								if ($scope.vm.settingForm.services.length == 0) {
									errors.push("Service is not set\n");
								}
								if ($scope.vm.settingForm.tax == null) {
									errors.push("Tax is not set\n");
								}
								if ($scope.vm.settingForm.amount == null) {
									errors
											.push("Set On Profit Amount or On Total Amount\n");
								}

								return errors;
							}

							$scope.disabledCountry = function() {
								$scope.vm.disabledCountry = false;
							}

							$scope.disabledCity = function() {
								$scope.vm.disabledCity = false;
							}

							$scope.disabledPartner = function() {
								$scope.vm.disabledPartner = false;
							}
							$scope.disabledService = function() {
								$scope.vm.disabledService = false;
							}
							$scope.disabledSalesPartner = function() {
								$scope.vm.disabledSalesPartner = false;
							}
							$scope.disabledTax = function() {
								$scope.vm.disabledTax = false;
							}

							suggestTypeOfService();

							$scope.suggestServiceEdit = function(query) {
								var services = [];
								for ( var key in $scope.vm.serviceType) {
									if ($scope.vm.serviceType[key].name
											.toLowerCase().indexOf(
													query.toLowerCase()) != -1) {
										services
												.push($scope.vm.serviceType[key]);
									}
								}
								return services;
							}

							function suggestTypeOfService() {
								TaxesInBackOfficeService.suggestTypeOfService()
										.then(function(data) {

											$scope.vm.serviceType = data.list;

										}, function(errorMessage) {
											console.log(errorMessage);
											showErrorMessage(errorMessage);
										});
							}

							suggestTypeOfCompany();

							$scope.suggestCategory = function(query) {
								var categories = [];
								for ( var key in $scope.vm.companyType) {
									if ($scope.vm.companyType[key].name
											.toLowerCase().indexOf(
													query.toLowerCase()) == 0) {
										categories
												.push($scope.vm.companyType[key]);
									}
								}
								return categories;
							}

							function suggestTypeOfCompany() {
								TaxesInBackOfficeService.suggestTypeOfCompany()
										.then(function(data) {

											$scope.vm.companyType = data.list;

										}, function(errorMessage) {
											console.log(errorMessage);
											showErrorMessage(errorMessage);
										});
							}

							loadData();

							function loadData() {
								TaxesInBackOfficeService
										.loadData($scope.vm.searchData)
										.then(
												function(data) {
													$scope.vm.list = data.data;
													$scope.vm.totalPages = Math
															.ceil(data.RecordsNumber
																	/ $scope.vm.searchData.limit);
													$scope.vm.disabledCountry = true;
													$scope.vm.disabledCity = true;
													$scope.vm.disabledPartner = true;
													$scope.vm.disabledSalesPartner = true;
													$scope.vm.disabledService = true;
													$scope.vm.disabledTax = true;
												})
							}
							// ----------------- Suggest Login, Roles etc.
							// -----------------
							SuggestService
									.suggest('LOGINROLE')
									.then(
											function(data) {
												$scope.suggest.userLogin = data.login[0];
												$scope.suggest.userRole = data.role;
											})
						} ])
