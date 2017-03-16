package com.connectflexi.backoffice.dto.extraservicesaccommodation;

import java.sql.Date;

import com.connectflexi.backoffice.model.ExtraServiceAccomodation.Status;

public class ExtraServicesAccommodationEditDTO {
	
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
	private Boolean basedPerChild;
	private Boolean basedPerInfant;
	private Boolean payableOfAccommodation;
	private Boolean oneTimePaymentForWholeStay;
	private Boolean basedPerRoomApartBungalowVilla;
	private Boolean perDayCharge;
	private Boolean obligatedToPay;
	private Status status;
	private String currencyId;
	private Boolean paymentUponBooking;
	private String murkUp;
	
	public String getCurrencyId() {
		return currencyId;
	}
	public void setCurrenceId(String currencyId) {
		this.currencyId = currencyId;
	}
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
	public Boolean getBasedPerChild() {
		return basedPerChild;
	}
	public void setBasedPerChild(Boolean basedPerChild) {
		this.basedPerChild = basedPerChild;
	}
	public Boolean getBasedPerInfant() {
		return basedPerInfant;
	}
	public void setBasedPerInfant(Boolean basedPerInfant) {
		this.basedPerInfant = basedPerInfant;
	}
	public Boolean getPayableOfAccommodation() {
		return payableOfAccommodation;
	}
	public void setPayableOfAccommodation(Boolean payableOfAccommodation) {
		this.payableOfAccommodation = payableOfAccommodation;
	}
	public Boolean getOneTimePaymentForWholeStay() {
		return oneTimePaymentForWholeStay;
	}
	public void setOneTimePaymentForWholeStay(Boolean oneTimePaymentForWholeStay) {
		this.oneTimePaymentForWholeStay = oneTimePaymentForWholeStay;
	}
	public Boolean getBasedPerRoomApartBungalowVilla() {
		return basedPerRoomApartBungalowVilla;
	}
	public void setBasedPerRoomApartBungalowVilla(Boolean basedPerRoomApartBungalowVilla) {
		this.basedPerRoomApartBungalowVilla = basedPerRoomApartBungalowVilla;
	}
	public Boolean getPerDayCharge() {
		return perDayCharge;
	}
	public void setPerDayCharge(Boolean perDayCharge) {
		this.perDayCharge = perDayCharge;
	}
	public Boolean getObligatedToPay() {
		return obligatedToPay;
	}
	public void setObligatedToPay(Boolean obligatedToPay) {
		this.obligatedToPay = obligatedToPay;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public void setCurrencyId(String currencyId) {
		this.currencyId = currencyId;
	}
	public Boolean getPaymentUponBooking() {
		return paymentUponBooking;
	}
	public void setPaymentUponBooking(Boolean paymentUponBooking) {
		this.paymentUponBooking = paymentUponBooking;
	}
	public String getMurkUp() {
		return murkUp;
	}
	public void setMurkUp(String murkUp) {
		this.murkUp = murkUp;
	}
	
		
}
