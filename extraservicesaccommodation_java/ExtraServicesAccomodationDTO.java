package com.connectflexi.backoffice.dto.extraservicesaccommodation;


import java.sql.Date;
import java.util.List;

import com.connectflexi.backoffice.dto.locationfrommapping.CityWithCountryDTO;
import com.connectflexi.backoffice.dto.locationfrommapping.CountryMappingDTO;
import com.connectflexi.backoffice.model.Currency;

public class ExtraServicesAccomodationDTO {

	private String idCodeFilter;
	private List<String> countries;
	private List<String> cities;
	private String accommodationNameFilter;
	private String partnerFilter;
	private String salesPartnerFilter;
	private Integer totalPages;
	private Integer currentPage;
	private Integer limit;
	private Date reservationDateMadeFromFilter;
	private Date reservationDateMadeTillFilter;
	private Date reservationDateItemFromFilter;
	private Date reservationDateItemTillFilter;

	public Date getReservationDateMadeFromFilter() {
		return reservationDateMadeFromFilter;
	}

	public void setReservationDateMadeFromFilter(Date reservationDateMadeFromFilter) {
		this.reservationDateMadeFromFilter = reservationDateMadeFromFilter;
	}

	public Date getReservationDateMadeTillFilter() {
		return reservationDateMadeTillFilter;
	}

	public void setReservationDateMadeTillFilter(Date reservationDateMadeTillFilter) {
		this.reservationDateMadeTillFilter = reservationDateMadeTillFilter;
	}

	public Date getReservationDateItemFromFilter() {
		return reservationDateItemFromFilter;
	}

	public void setReservationDateItemFromFilter(Date reservationDateItemFromFilter) {
		this.reservationDateItemFromFilter = reservationDateItemFromFilter;
	}

	public Date getReservationDateItemTillFilter() {
		return reservationDateItemTillFilter;
	}

	public void setReservationDateItemTillFilter(Date reservationDateItemTillFilter) {
		this.reservationDateItemTillFilter = reservationDateItemTillFilter;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(Integer totalPages) {
		this.totalPages = totalPages;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public List<String> getCountries() {
		return countries;
	}

	public void setCountries(List<String> countries) {
		this.countries = countries;
	}

	public List<String> getCities() {
		return cities;
	}

	public void setCities(List<String> cities) {
		this.cities = cities;
	}

	public String getIdCodeFilter() {
		return idCodeFilter;
	}

	public void setIdCodeFilter(String idCodeFilter) {
		this.idCodeFilter = idCodeFilter;
	}

	public String getAccommodationNameFilter() {
		return accommodationNameFilter;
	}

	public void setAccommodationNameFilter(String accommodationNameFilter) {
		this.accommodationNameFilter = accommodationNameFilter;
	}

	public String getPartnerFilter() {
		return partnerFilter;
	}

	public void setPartnerFilter(String partnerFilter) {
		this.partnerFilter = partnerFilter;
	}

	public String getSalesPartnerFilter() {
		return salesPartnerFilter;
	}

	public void setSalesPartnerFilter(String salesPartnerFilter) {
		this.salesPartnerFilter = salesPartnerFilter;
	}

}
