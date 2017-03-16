var adminApp = angular.module('adminApp', [ 'ngRoute', 'frontendServices',
		'spring-security-csrf-token-interceptor', 'ngTagsInput',
		'angularjs-datetime-picker' ]);

adminApp.config(function(csrfProvider, $httpProvider) {
	// optional configurations
	csrfProvider.config({
		url : '/',
	})
	$httpProvider.interceptors.push('responseObserver');
});

adminApp.factory('responseObserver', function responseObserver($q, $window) {
	return {
		'responseError' : function(errorResponse) {
			switch (errorResponse.status) {
			case 403:
				console.log("got error by angular!");
				$window.location.reload();
				break;
			case 500:
				$window.location.reload();
				break;
			}
			return $q.reject(errorResponse);
		}
	};
});

adminApp
		.controller(
				'ExtraServicesAccomodationCtrl',
				[
						'$scope',
						'$window',
						'$document',
						'$location',
						'tags',
						'ExtraServicesAccomodationService',
						'UserService',
						'SuggestService',
						'$timeout',
						'$rootScope',
						function($scope, $window, $document, $location, tags,
								ExtraServicesAccomodationService, UserService,
								SuggestService, $timeout, $rootScope) {

							pageNumber = 1;

							uniqData = {};

							$scope.id = 0;

							$scope.RESULT_LIMIT = 6;

							$scope.basicrooms = [],

							$scope.suggest = {
								userLogin : "",
								userRole : [],
							}

							$scope.settingForm = {
								id : "",
								basicroom : "",
								extraService : "",
								price : "",
								ageFrom : "",
								ageTill : "",
								currencyId : "",
								reservationDateMadeFromFilterNew : "",
								reservationDateMadeTillFilterNew : "",
								reservationDateItemFromFilterNew : "",
								reservationDateItemTillFilterNew : "",
								minNightsOfStay : "",
								maxNightsOfStay : "",
								paymentDays : "",
								basedPerPerson : false,
								basedPerChild : false,
								basedPerInfant : false,
								payableOfAccommodation : false,
								oneTimePaymentForWholeStay : false,
								basedPerRoomApartBungalowVilla : false,
								perDayCharge : false,
								obligatedToPay : false,
								paymentDays : "",
								status : "",
								murkUp : "",
							}

							$scope.extraCharges = {
								settingForm : [],
							}

							$scope.vm = {

								showSettingForm : false,
								head : "",
								list : [],
								basicRooms : [],

								searchData : {
									countries : [],
									cities : [],
									idCodeFilter : null,
									accommodationNameFilter : null,
									partnerFilter : null,
									salesPartnerFilter : null,
									currentPage : 1,
									totalPages : 0,
									reservationDateMadeFromFilter : null,
									reservationDateMadeTillFilter : null,
									reservationDateItemFromFilter : null,
									reservationDateItemTillFilter : null,

								},
								newData : {
									country : {},
									city : {},
									accommodationName : null,
									salesPartner : null,
									countryForSales : {},
									indicateNationalities : null,
									b2cWebSite : null,
									partner : null,
								},

								picked : {
									cityFilter : [],
									countryFilter : [],
									basicroom : [],
									countrySales : [],
									partnerFilter : [],
								}
							};

							$scope.SettingForService = function() {
								this.id = "";
								this.basicroom = "";
								this.extraservice = "";
								this.price = "";
								this.ageFrom = "";
								this.ageTill = "";
								this.currencyId = "";
								this.reservationDateMadeFromFilterNew = "";
								this.reservationDateMadeTillFilterNew = "";
								this.reservationDateItemFromFilterNew = "";
								this.reservationDateItemTillFilterNew = "";
								this.minNightsOfStay = "";
								this.maxNightsOfStay = "";
								this.paymentDays = "";
								this.basedPerPerson = false;
								this.basedPerChild = false;
								this.basedPerInfant = false;
								this.payableOfAccommodation = false;
								this.oneTimePaymentForWholeStay = false;
								this.basedPerRoomApartBungalowVilla = false;
								this.perDayCharge = false;
								this.obligatedToPay = false;
								this.paymentDays = "";
								this.murkUp = "", this.status = "ACTIVE";
							};

							$scope.extraCharges.settingForm = [ new $scope.SettingForService ];

							$scope.createExtraCharges = function() {
								// $scope.vm.Setting = true;
								// $scope.extraCharges.settingForm = [ new
								// $scope.SettingForService ];

								$window
										.open('/resources/admin/extraservicesaccomodation/create.html');
							}

							$scope.back = function() {
								// $scope.vm.Setting = false;
								$window
										.close('/resources/admin/extraservicesaccomodation/create.html');
								// $window
								// .open('/resources/admin/extraservicesaccomodation/menu.html');
							};

							// paginator
							$scope.next = function(index) {
								if ($scope.vm.searchData.currentPage < $scope.vm.searchData.totalPages) {
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
								for (i = 1; i <= ($scope.vm.searchData.totalPages); i++) {
									$scope.tempPage.push(i);
								}
								return $scope.tempPage;
							};

							// Add and Remove Tags
							$scope.addCountry = function(tag) {
								if ($scope.vm.picked.countryFilter != undefined
										&& $scope.vm.picked.countryFilter != null) {
									$scope.vm.picked.countryFilter
											.forEach(function(row) {
												$scope.vm.searchData.countries
														.push(row.id);
											});
									$scope.vm.newData.country = $scope.vm.picked.countryFilter[0];
								}
								if ($scope.vm.picked.countrySales != undefined
										&& $scope.vm.picked.countrySales != null) {
									$scope.vm.newData.countryForSales = $scope.vm.picked.countrySales[0];

								}
								loadData();
							}

							$scope.removeCountry = function(tag) {
								$scope.vm.picked.country = [];
								$scope.vm.searchData.countries = null;

								loadData();
							}

							$scope.addCity = function(tag) {

								if ($scope.vm.picked.cityFilter != undefined
										&& $scope.vm.picked.cityFilter != null) {
									$scope.vm.picked.cityFilter
											.forEach(function(row) {
												$scope.vm.searchData.cities
														.push(row.id);
											});
									$scope.vm.newData.city = $scope.vm.picked.cityFilter[0];
								}
								loadData();
							}

							$scope.removeCity = function(tag) {
								$scope.vm.picked.city = [];
								$scope.vm.searchData.cities = null;

								loadData();
							}

							$scope.basicroomAddForm = function(tag) {
								if ($scope.vm.picked.basicroom.length > 1) {
									$scope.vm.picked.basicroom = [];
									$scope.vm.picked.basicroom.push(tag);
								}
								$scope.settingForm.basicroom = tag.id;
							}

							$scope.addBasicRoomForSave = function(tag, i) {
								if ($scope.extraCharges.settingForm[i].basicroom != "") {
									$scope.extraCharges.settingForm[i].basicroom = "";
								}
								$scope.extraCharges.settingForm[i].basicroom = tag.id;
							}

							$scope.removeBasicRoomForSave = function(i) {
								$scope.extraCharges.settingForm[i].basicroom.length = 0;
							}

							$scope.addPartner = function(tag) {
								if ($scope.vm.picked.partnerFilter.length > 1) {
									$scope.vm.picked.partnerFilter = [];
									$scope.vm.picked.partnerFilter.push(tag);
								}
								$scope.vm.newData.partner = tag.id;
							}

							$scope.removePartner = function(tag) {
								$scope.vm.newData.partner = "";
							}

							$scope.basicroomRemovedForm = function() {
								$scope.settingForm.basicroom = "";
							}

							$scope.suggestBasicRoom = function(query) {
								var basicRooms = [];
								for ( var key in $scope.vm.basicRooms) {
									if ($scope.vm.basicRooms[key].name
											.toLowerCase().indexOf(
													query.toLowerCase()) != -1) {
										basicRooms
												.push($scope.vm.basicRooms[key]);
									}
								}
								return basicRooms;
							}

							$scope.suggestPartner = function(query) {
								var partners = [];
								for ( var key in $scope.vm.partners) {
									if ($scope.vm.partners[key].id
											.toLowerCase().indexOf(
													query.toLowerCase()) != -1) {
										partners.push($scope.vm.partners[key]);
									}
								}
								return partners;
							}

							$scope.saveSettings = function() {
								ExtraServicesAccomodationService.changeData(
										$scope.settingForm).then(function() {
									loadData();
									$scope.vm.showSettingForm = false;
								})
							}

							$scope.addSettingForService = function() {
								$scope.extraCharges.settingForm
										.push(new $scope.SettingForService);
							}

							$scope.removeSettingForService = function() {
								if ($scope.extraCharges.settingForm.length > 1) {
									$scope.extraCharges.settingForm.splice(-1,
											1);
								}
							}

							$scope.saveData = function() {

								var settingForm = [];

								if ($scope.validate().length == 0) {
									for (var i = 0; i < $scope.extraCharges.settingForm.length; i++) {
										var tempSettingForExtra = new $scope.SettingForService;
										tempSettingForExtra.id = $scope.extraCharges.settingForm[i].id;
										tempSettingForExtra.basicroom = $scope.extraCharges.settingForm[i].basicroom;
										tempSettingForExtra.extraService = $scope.extraCharges.settingForm[i].extraservice;
										tempSettingForExtra.price = $scope.extraCharges.settingForm[i].price;
										tempSettingForExtra.ageFrom = $scope.extraCharges.settingForm[i].ageFrom;
										tempSettingForExtra.ageTill = $scope.extraCharges.settingForm[i].ageTill;
										tempSettingForExtra.currencyId = $scope.extraCharges.settingForm[i].currencyId;
										tempSettingForExtra.reservationDateMadeFromFilterNew = $scope.extraCharges.settingForm[i].reservationDateMadeFromFilterNew;
										tempSettingForExtra.reservationDateMadeTillFilterNew = $scope.extraCharges.settingForm[i].reservationDateMadeTillFilterNew;
										tempSettingForExtra.reservationDateItemFromFilterNew = $scope.extraCharges.settingForm[i].reservationDateItemFromFilterNew;
										tempSettingForExtra.reservationDateItemTillFilterNew = $scope.extraCharges.settingForm[i].reservationDateItemTillFilterNew;
										tempSettingForExtra.minNightsOfStay = $scope.extraCharges.settingForm[i].minNightsOfStay;
										tempSettingForExtra.maxNightsOfStay = $scope.extraCharges.settingForm[i].maxNightsOfStay;
										tempSettingForExtra.paymentDays = $scope.extraCharges.settingForm[i].paymentDays;
										tempSettingForExtra.basedPerPerson = $scope.extraCharges.settingForm[i].basedPerPerson;
										tempSettingForExtra.basedPerChild = $scope.extraCharges.settingForm[i].basedPerChild;
										tempSettingForExtra.basedPerInfant = $scope.extraCharges.settingForm[i].basedPerInfant;
										tempSettingForExtra.payableOfAccommodation = $scope.extraCharges.settingForm[i].payableOfAccommodation;
										tempSettingForExtra.oneTimePaymentForWholeStay = $scope.extraCharges.settingForm[i].oneTimePaymentForWholeStay;
										tempSettingForExtra.basedPerRoomApartBungalowVilla = $scope.extraCharges.settingForm[i].basedPerRoomApartBungalowVilla;
										tempSettingForExtra.perDayCharge = $scope.extraCharges.settingForm[i].perDayCharge;
										tempSettingForExtra.obligatedToPay = $scope.extraCharges.settingForm[i].obligatedToPay;
										tempSettingForExtra.paymentDays = $scope.extraCharges.settingForm[i].paymentDays;
										tempSettingForExtra.paymentUponBooking = $scope.extraCharges.settingForm[i].paymentUponBooking;
										tempSettingForExtra.murkUp = $scope.extraCharges.settingForm[i].murkUp;
										tempSettingForExtra.status = $scope.extraCharges.settingForm[i].status;
										settingForm.push(tempSettingForExtra);
									}
									ExtraServicesAccomodationService
											.saveData($scope.vm.newData,
													settingForm)
											.then(
													function(data) {
														// $scope.vm.Setting =
														// false;
														loadData();
														$scope.id = data.id;

														$window
																.close('/resources/admin/extraservicesaccomodation/create.html');
														$window
																.open('/resources/admin/extraservicesaccomodation/menu.html');
													})
								} else {
									alert($scope.validate());
								}
							}

							$scope.closeSettingForm = function() {
								$scope.vm.showSettingForm = false;
							}

							$scope.closeSettingForm2 = function() {
								$scope.vm.showSettingForm2 = false;
							}

							$scope.search = function() {
								$scope.vm.searchData.currentPage = 1;
								$scope.vm.searchData.idCodeFilter = $scope.idCodeFilter == undefined ? ''
										: $scope.idCodeFilter;
								$scope.vm.searchData.accommodationNameFilter = $scope.accommodationNameFilter == undefined ? ''
										: $scope.accommodationNameFilter;
								$scope.vm.searchData.partnerFilter = $scope.partnerFilter == undefined ? ''
										: $scope.partnerFilter;
								$scope.vm.searchData.salesPartnerFilter = $scope.salesPartnerFilter == undefined ? ''
										: $scope.salesPartnerFilter;
								$scope.vm.searchData.reservationDateMadeFromFilter = $scope.reservationDateMadeFromFilter == undefined ? ''
										: $scope.reservationDateMadeFromFilter;
								$scope.vm.searchData.reservationDateMadeTillFilter = $scope.reservationDateMadeTillFilter == undefined ? ''
										: $scope.reservationDateMadeTillFilter;
								$scope.vm.searchData.reservationDateItemFromFilter = $scope.reservationDateItemFromFilter == undefined ? ''
										: $scope.reservationDateItemFromFilter;
								$scope.vm.searchData.reservationDateItemTillFilter = $scope.reservationDateItemTillFilter == undefined ? ''
										: $scope.reservationDateItemTillFilter;
								loadData();
							}

							$scope.suggestCountryNames = function(query) {
								$scope.vm.searchData.currentPage = 1;
								return tags.load(query, 'COUNTRIES');
							}

							$scope.suggestCitiesWithCountries = function(
									countryName, cityName) {
								if ($scope.vm.picked.countryFilter.length == 0) {
									var countryName = "";
									$scope.vm.searchData.currentPage = 1;
									return tags.loadCitiesWithCountry(
											countryName, cityName,
											'CITIES_WITH_COUNTRIES');
								} else {
									var countryName = $scope.vm.picked.countryFilter[0].name;
									return tags.loadCitiesWithCountry(
											countryName, cityName,
											'CITIES_WITH_COUNTRIES');
								}
							};

							loadData();

							function loadData() {
								ExtraServicesAccomodationService
										.loadData($scope.vm.searchData)
										.then(
												function(data) {
													$scope.vm.list = data.extraServiceAccomodation;
													$scope.vm.searchData.totalPages = Math
															.ceil(data.RecordsNumber
																	/ $scope.RESULT_LIMIT);
												})

							}

							suggestCurrency();

							function suggestCurrency() {
								ExtraServicesAccomodationService
										.suggestCurrency().then(function(data) {

											$scope.vm.currencies = data.list;

										}, function(errorMessage) {
											console.log(errorMessage);
											showErrorMessage(errorMessage);
										});
							}

							suggestProvider();

							function suggestProvider() {
								ExtraServicesAccomodationService
										.suggestProvider().then(function(data) {

											$scope.vm.partners = data.list;

										}, function(errorMessage) {
											console.log(errorMessage);
											showErrorMessage(errorMessage);
										});
							}

							suggestData();

							function suggestData() {
								ExtraServicesAccomodationService.suggestData()
										.then(function(data) {

											$scope.vm.basicRooms = data.list;

										}, function(errorMessage) {
											console.log(errorMessage);
											showErrorMessage(errorMessage);
										});
							}

							$scope.deleteSetting = function(id) {
								ExtraServicesAccomodationService.deleteData(id)
										.then(function() {
											loadData();
										})
							}

							$scope.editSettings = function(id) {
								$scope.settingForm.currencyId = "";
								$scope.vm.head = "Extra Charge";
								$scope.vm.showSettingForm = true;
								$scope.settingForm.id = id;
								var i = 0;
								var id;
								var v = 0;
								for (i = 0; i < $scope.vm.list.length; i++) {
									if ($scope.vm.list[i].id == $scope.settingForm.id) {
										id = $scope.settingForm.id;
										v = i;
										break;
									}
								}
								$scope.vm.picked.basicroom = [];
								$scope.vm.list[v].id = id;
								if ($scope.vm.list[v].basicroom != null) {

									$scope.vm.picked.basicroom = [ $scope.vm.list[v].basicroom.name ];
								}

								$scope.settingForm.extraService = $scope.vm.list[v].extraservice;
								$scope.settingForm.price = $scope.vm.list[v].price;
								$scope.settingForm.ageFrom = $scope.vm.list[v].ageFrom;
								$scope.settingForm.ageTill = $scope.vm.list[v].ageTill;
								$scope.settingForm.reservationDateMadeFromFilterNew = $scope.vm.list[v].periodMadeFrom;
								$scope.settingForm.reservationDateMadeTillFilterNew = $scope.vm.list[v].periodMadeTill;
								$scope.settingForm.reservationDateItemFromFilterNew = $scope.vm.list[v].periodItemFrom;
								$scope.settingForm.reservationDateItemTillFilterNew = $scope.vm.list[v].periodItemTill;
								$scope.settingForm.minNightsOfStay = $scope.vm.list[v].minNights;
								$scope.settingForm.maxNightsOfStay = $scope.vm.list[v].maxNights;
								$scope.settingForm.basedPerPerson = $scope.vm.list[v].perPerson;
								$scope.settingForm.basedPerChild = $scope.vm.list[v].child;
								$scope.settingForm.basedPerInfant = $scope.vm.list[v].infant;
								$scope.settingForm.payableOfAccommodation = $scope.vm.list[v].payAbleHotel;
								$scope.settingForm.oneTimePaymentForWholeStay = $scope.vm.list[v].firstpayment;
								$scope.settingForm.basedPerRoomApartBungalowVilla = $scope.vm.list[v].perRoom;
								$scope.settingForm.perDayCharge = $scope.vm.list[v].perDay;
								$scope.settingForm.obligatedToPay = $scope.vm.list[v].obligatedPay;
								$scope.settingForm.paymentDays = $scope.vm.list[v].paymentdays;
								$scope.settingForm.status = $scope.vm.list[v].status;
								$scope.settingForm.paymentDays = $scope.vm.list[v].paymentdays;
								$scope.settingForm.paymentUponBooking = $scope.vm.list[v].paymentUponBooking;
								$scope.settingForm.currencyId = $scope.vm.currencies[v].id;
								$scope.settingForm.murkUp = $scope.vm.list[v].murkUp;
							}

							$scope.validate = function() {
								var errors = [];
								if ($scope.vm.picked.countryFilter == "") {
									errors.push("Country is not set\n");
								}
								if ($scope.vm.picked.cityFilter == "") {
									errors.push("City is not set\n");
								}
								return errors;
							}

							$scope.logout = function() {
								UserService.logout();
							}

							SuggestService
									.suggest('LOGINROLE')
									.then(
											function(data) {
												$scope.suggest.userLogin = data.login[0];
												$scope.suggest.userRole = data.role;
											})

						} ]);