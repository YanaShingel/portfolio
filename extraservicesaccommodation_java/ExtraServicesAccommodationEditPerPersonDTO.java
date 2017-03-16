package com.connectflexi.backoffice.dto.extraservicesaccommodation;

import java.sql.Date;

public class ExtraServicesAccommodationEditPerPersonDTO {

	private String id;
	private String basicroom;
	private String extraService;
	private Float price; 
	private Integer ageFrom;
	private Integer ageTill;
	private Date reservationDateMadeFromFilterNew;
	private Date reservationDateMadeTillFilterNew;
	private Date reservationDateItemFromFilterNew;
	private Date reservationDateItemTillFilterNew;
	private Integer minNightsOfStay;
	private Integer maxNightsOfStay;
	private String paymentDays;
	private Boolean basedPerPerson;
	private Boolean oneTimePaymentForWholeStay;
	private Boolean obligatedToPay;
	private Boolean active;
	private String currencyId;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getBasicroom() {
		return basicroom;
	}
	public void setBasicroom(String basicroom) {
		this.basicroom = basicroom;
	}
	public String getExtraService() {
		return extraService;
	}
	public void setExtraService(String extraService) {
		this.extraService = extraService;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	public Integer getAgeFrom() {
		return ageFrom;
	}
	public void setAgeFrom(Integer ageFrom) {
		this.ageFrom = ageFrom;
	}
	public Integer getAgeTill() {
		return ageTill;
	}
	public void setAgeTill(Integer ageTill) {
		this.ageTill = ageTill;
	}
	public Date getReservationDateMadeFromFilterNew() {
		return reservationDateMadeFromFilterNew;
	}
	public void setReservationDateMadeFromFilterNew(Date reservationDateMadeFromFilterNew) {
		this.reservationDateMadeFromFilterNew = reservationDateMadeFromFilterNew;
	}
	public Date getReservationDateMadeTillFilterNew() {
		return reservationDateMadeTillFilterNew;
	}
	public void setReservationDateMadeTillFilterNew(Date reservationDateMadeTillFilterNew) {
		this.reservationDateMadeTillFilterNew = reservationDateMadeTillFilterNew;
	}
	public Date getReservationDateItemFromFilterNew() {
		return reservationDateItemFromFilterNew;
	}
	public void setReservationDateItemFromFilterNew(Date reservationDateItemFromFilterNew) {
		this.reservationDateItemFromFilterNew = reservationDateItemFromFilterNew;
	}
	public Date getReservationDateItemTillFilterNew() {
		return reservationDateItemTillFilterNew;
	}
	public void setReservationDateItemTillFilterNew(Date reservationDateItemTillFilterNew) {
		this.reservationDateItemTillFilterNew = reservationDateItemTillFilterNew;
	}
	public Integer getMinNightsOfStay() {
		return minNightsOfStay;
	}
	public void setMinNightsOfStay(Integer minNightsOfStay) {
		this.minNightsOfStay = minNightsOfStay;
	}
	public Integer getMaxNightsOfStay() {
		return maxNightsOfStay;
	}
	public void setMaxNightsOfStay(Integer maxNightsOfStay) {
		this.maxNightsOfStay = maxNightsOfStay;
	}
	public String getPaymentDays() {
		return paymentDays;
	}
	public void setPaymentDays(String paymentDays) {
		this.paymentDays = paymentDays;
	}
	public Boolean getBasedPerPerson() {
		return basedPerPerson;
	}
	public void setBasedPerPerson(Boolean basedPerPerson) {
		this.basedPerPerson = basedPerPerson;
	}
	public Boolean getOneTimePaymentForWholeStay() {
		return oneTimePaymentForWholeStay;
	}
	public void setOneTimePaymentForWholeStay(Boolean oneTimePaymentForWholeStay) {
		this.oneTimePaymentForWholeStay = oneTimePaymentForWholeStay;
	}
	public Boolean getObligatedToPay() {
		return obligatedToPay;
	}
	public void setObligatedToPay(Boolean obligatedToPay) {
		this.obligatedToPay = obligatedToPay;
	}
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public String getCurrencyId() {
		return currencyId;
	}
	public void setCurrencyId(String currencyId) {
		this.currencyId = currencyId;
	}
}
