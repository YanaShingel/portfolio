package com.connectflexi.backoffice.dto.extraservicesaccommodation;

import java.sql.Date;
import java.util.List;

import com.connectflexi.backoffice.dto.locationfrommapping.CityMappingDTO;
import com.connectflexi.backoffice.dto.locationfrommapping.CountryMappingDTO;
import com.connectflexi.backoffice.model.Provider;

public class ExtraServiceAccommodationBasicDTO {

	private CountryMappingDTO country;
	private CityMappingDTO city;
	private String accommodationName;
	private String partner;
	private String salesPartner;
	private CountryMappingDTO countryForSales;
	private String indicateNationalities;
	private String b2cWebSite;
	private String extraService;
//	private String price;
//	private String ageFrom;
//	private String ageTill;
//	private String oneTimePaymentForWholeStay;
//	private String basedPerRoomApartBungalowVilla;
//	private String perDayCharge;
//	private String obligatedToPay;
//	private Date reservationDateMadeFromFilterNew;
//	private Date reservationDateMadeTillFilterNew;
//	private Date reservationDateItemFromFilterNew;
//	private Date reservationDateItemTillFilterNew;
//	private String minNightsOfStay;
//	private String maxNightsOfStay;
//	private String paymentDays;
//	private Boolean basedPerPerson;
//	private Boolean basedPerChild;
//	private Boolean basedPerInfant;
//	private Boolean payableOfAccommodation;
	
	public CountryMappingDTO getCountry() {
		return country;
	}
	public void setCountry(CountryMappingDTO country) {
		this.country = country;
	}
	public CityMappingDTO getCity() {
		return city;
	}
	public void setCity(CityMappingDTO city) {
		this.city = city;
	}
	public CountryMappingDTO getCountryForSales() {
		return countryForSales;
	}
	public void setCountryForSales(CountryMappingDTO countryForSales) {
		this.countryForSales = countryForSales;
	}
	public String getAccommodationName() {
		return accommodationName;
	}
	public void setAccommodationName(String accommodationName) {
		this.accommodationName = accommodationName;
	}
	
	public String getPartner() {
		return partner;
	}
	public void setPartner(String partner) {
		this.partner = partner;
	}
	public String getSalesPartner() {
		return salesPartner;
	}
	public void setSalesPartner(String salesPartner) {
		this.salesPartner = salesPartner;
	}
	public String getIndicateNationalities() {
		return indicateNationalities;
	}
	public void setIndicateNationalities(String indicateNationalities) {
		this.indicateNationalities = indicateNationalities;
	}
	public String getB2cWebSite() {
		return b2cWebSite;
	}
	public void setB2cWebSite(String b2cWebSite) {
		this.b2cWebSite = b2cWebSite;
	}
	
}
