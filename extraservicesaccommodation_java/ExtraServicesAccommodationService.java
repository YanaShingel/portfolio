package com.connectflexi.backoffice.service.extraservicesaccommodation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.connectflexi.backoffice.dao.repository.BasicRoomRepository;
import com.connectflexi.backoffice.dao.repository.CurrencyRepository;
import com.connectflexi.backoffice.dao.repository.ExtraServicesAccommodationCustomRepository;
import com.connectflexi.backoffice.dao.repository.ExtraServicesAccomodationRepository;
import com.connectflexi.backoffice.dao.repository.ProviderRepository;
import com.connectflexi.backoffice.dto.currency.CurrencyDTO;
import com.connectflexi.backoffice.dto.extraservicesaccommodation.BasicRoomsDTO;
import com.connectflexi.backoffice.dto.extraservicesaccommodation.ExtraServiceAccommodationBasicDTO;
import com.connectflexi.backoffice.dto.extraservicesaccommodation.ExtraServicesAccommodationEditDTO;
import com.connectflexi.backoffice.dto.extraservicesaccommodation.ExtraServicesAccomodationDTO;
import com.connectflexi.backoffice.dto.extraservicesaccommodation.ProviderDTO;
import com.connectflexi.backoffice.model.BasicRoom;
import com.connectflexi.backoffice.model.Currency;
import com.connectflexi.backoffice.model.ExtraServiceAccomodation;
import com.connectflexi.backoffice.model.ExtraServiceAccomodation.Status;
import com.connectflexi.backoffice.model.Provider;

@Service
@Transactional
public class ExtraServicesAccommodationService {

	@Autowired
	private ExtraServicesAccommodationCustomRepository extraServicesAccommodationCustomRepository;

	@Autowired
	private ExtraServicesAccomodationRepository extraServicesAccomodationRepository;

	@Autowired
	private BasicRoomRepository basicRoomRepository;

	@Autowired
	private CurrencyRepository currencyRepository;

	@Autowired
	private ProviderRepository providerRepository;

	@Transactional
	public Map<String, Object> loadData(ExtraServicesAccomodationDTO param) {
		Integer currentPage = param.getCurrentPage();
		if (currentPage == null)
			currentPage = 0;
		currentPage--;

		// Integer totalPages = itemCount / param.getLimit();
		// if (itemCount % 3 != 0) {
		// totalPages++;
		// }

		List<CurrencyDTO> currencyDTOs = CurrencyDTO.mapCurrencyEntities((List<Currency>) currencyRepository.findAll());

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("extraServiceAccomodation", extraServicesAccommodationCustomRepository.loadData(param));
		result.put("RecordsNumber", extraServicesAccommodationCustomRepository.getRecordsNumber(param));
		result.put("currencies", currencyDTOs);
		return result;
	}

	@Transactional(readOnly = true)
	public List<BasicRoomsDTO> findBasicRooms(String pattern) {
		List<BasicRoom> basicRooms = extraServicesAccomodationRepository.findBybasicroomLike(pattern + "%");
		return BasicRoomsDTO.mapBasicRoomsEntities(basicRooms);
	}

	// @Transactional(readOnly = true)
	// public List<ProviderDTO> findProviders(String pattern) {
	// List<Provider> provider =
	// extraServicesAccomodationRepository.findByProviderLike(pattern + "%");
	// return ProviderDTO.mapProviderEntities(provider);
	// }

	public void save(ExtraServiceAccomodation extraServiceAccomodation,
			List<ExtraServicesAccommodationEditDTO> params) {
		//List<ExtraServiceAccomodation> temp = new ArrayList<>();
		for (int i = 0; i < params.size(); i++) {
			extraServiceAccomodation.setId(extraServiceAccomodation.generateId());
			Currency cr = new Currency();
			if (params.get(i).getCurrencyId() != null) {
				cr = currencyRepository.findById(params.get(i).getCurrencyId());
			}

			BasicRoom br = basicRoomRepository.findById(params.get(i).getBasicroom());
			extraServiceAccomodation.setBasicroom(br);
			extraServiceAccomodation.setCurrency(cr);
			extraServiceAccomodation.setExtraservice(params.get(i).getExtraService());
			extraServiceAccomodation.setPrice(params.get(i).getPrice());
			extraServiceAccomodation.setAgeFrom(params.get(i).getAgeFrom());
			extraServiceAccomodation.setAgeTill(params.get(i).getAgeTill());
			extraServiceAccomodation.setPeriodMadeFrom(params.get(i).getReservationDateMadeFromFilterNew());
			extraServiceAccomodation.setPeriodMadeTill(params.get(i).getReservationDateMadeTillFilterNew());
			extraServiceAccomodation.setPeriodItemFrom(params.get(i).getReservationDateItemFromFilterNew());
			extraServiceAccomodation.setPeriodItemTill(params.get(i).getReservationDateItemTillFilterNew());
			extraServiceAccomodation.setFirstpayment(params.get(i).getOneTimePaymentForWholeStay());
			extraServiceAccomodation.setPerDay(params.get(i).getPerDayCharge());
			extraServiceAccomodation.setMinNights(params.get(i).getMinNightsOfStay());
			extraServiceAccomodation.setMaxNights(params.get(i).getMaxNightsOfStay());
			extraServiceAccomodation.setPerPerson(params.get(i).getBasedPerPerson());
			extraServiceAccomodation.setChild(params.get(i).getBasedPerChild());
			extraServiceAccomodation.setInfant(params.get(i).getBasedPerInfant());
			extraServiceAccomodation.setPayAbleHotel(params.get(i).getPayableOfAccommodation());
			extraServiceAccomodation.setPayAbleHotel(params.get(i).getOneTimePaymentForWholeStay());
			extraServiceAccomodation.setPerRoom(params.get(i).getBasedPerRoomApartBungalowVilla());
			extraServiceAccomodation.setCharges(params.get(i).getPerDayCharge());
			extraServiceAccomodation.setObligatedPay(params.get(i).getObligatedToPay());
			extraServiceAccomodation.setMurkUp(params.get(i).getMurkUp());
			
			if (params.get(i).getStatus() != null) {
				extraServiceAccomodation.setStatus(params.get(i).getStatus());
			} else {
				extraServiceAccomodation.setStatus(ExtraServiceAccomodation.Status.ACTIVE);
			}
			extraServiceAccomodation.setPaymentUponBooking(params.get(i).getPaymentUponBooking());
//			if (params.get(i).getPaymentUponBooking() == true) {
//				extraServiceAccomodation.setPaymentdays("100%");
//			}
//			else extraServiceAccomodation.setPaymentdays(params.get(i).getPaymentDays());
			extraServiceAccomodation.setPaymentdays(params.get(i).getPaymentDays());
			if (params.get(i).getPaymentUponBooking() != null) {
				if (params.get(i).getPaymentUponBooking()==true) {
					extraServiceAccomodation.setPaymentdays("100%");
				}
			}
			extraServicesAccomodationRepository.save(extraServiceAccomodation);
			//temp.add(extraServiceAccomodation);
		}
		//extraServicesAccomodationRepository.save(extraServiceAccomodation);
	}

	public void changeData(ExtraServicesAccommodationEditDTO params) {
		ExtraServiceAccomodation extraServiceAccomodation = extraServicesAccomodationRepository
				.findById(params.getId());
		extraServiceAccomodation.setId(params.getId());

		//extraServiceAccomodation.setId(extraServiceAccomodation.generateId());
		Currency cr = new Currency();
		if (params.getCurrencyId() != null) {
			cr = currencyRepository.findById(params.getCurrencyId());
		}
		BasicRoom br = basicRoomRepository.findById(params.getBasicroom());
		extraServiceAccomodation.setBasicroom(br);
		extraServiceAccomodation.setCurrency(cr);
		extraServiceAccomodation.setExtraservice(params.getExtraService());
		extraServiceAccomodation.setPrice(params.getPrice());
		extraServiceAccomodation.setAgeFrom(params.getAgeFrom());
		extraServiceAccomodation.setAgeTill(params.getAgeTill());
		extraServiceAccomodation.setPeriodMadeFrom(params.getReservationDateMadeFromFilterNew());
		extraServiceAccomodation.setPeriodMadeTill(params.getReservationDateMadeTillFilterNew());
		extraServiceAccomodation.setPeriodItemFrom(params.getReservationDateItemFromFilterNew());
		extraServiceAccomodation.setPeriodItemTill(params.getReservationDateItemTillFilterNew());
		extraServiceAccomodation.setFirstpayment(params.getOneTimePaymentForWholeStay());
		extraServiceAccomodation.setPerDay(params.getPerDayCharge());
		extraServiceAccomodation.setMinNights(params.getMinNightsOfStay());
		extraServiceAccomodation.setMaxNights(params.getMaxNightsOfStay());
		extraServiceAccomodation.setPaymentdays(params.getPaymentDays());
		extraServiceAccomodation.setPerPerson(params.getBasedPerPerson());
		extraServiceAccomodation.setChild(params.getBasedPerChild());
		extraServiceAccomodation.setInfant(params.getBasedPerInfant());
		extraServiceAccomodation.setPayAbleHotel(params.getPayableOfAccommodation());
		extraServiceAccomodation.setPayAbleHotel(params.getOneTimePaymentForWholeStay());
		extraServiceAccomodation.setPerRoom(params.getBasedPerRoomApartBungalowVilla());
		extraServiceAccomodation.setCharges(params.getPerDayCharge());
		extraServiceAccomodation.setObligatedPay(params.getObligatedToPay());
		extraServiceAccomodation.setMurkUp(params.getMurkUp());
		
		if (params.getStatus() != null) {
			extraServiceAccomodation.setStatus(params.getStatus());
		} else {
			extraServiceAccomodation.setStatus(ExtraServiceAccomodation.Status.ACTIVE);
		}
		extraServiceAccomodation.setPaymentUponBooking(params.getPaymentUponBooking());
		if (params.getPaymentUponBooking() != null) {
			if (params.getPaymentUponBooking()==true) {
				extraServiceAccomodation.setPaymentdays("100%");
			}
		}
		extraServicesAccomodationRepository.save(extraServiceAccomodation);
	}

	@Transactional(readOnly = false)
	public String saveData(ExtraServiceAccommodationBasicDTO basicForm,
			List<ExtraServicesAccommodationEditDTO> settingForm) {
		ExtraServiceAccomodation extraServiceAccomodation = new ExtraServiceAccomodation();
		// Provider provider = new Provider();
		// provider.setId(basicForm.getPartner());
		Provider pr = providerRepository.findById(basicForm.getPartner());
		extraServiceAccomodation.setPartner(pr);

		if (basicForm.getCountry() != null) {
			extraServiceAccomodation.setCountryId(basicForm.getCountry().getId());
			extraServiceAccomodation.setCountryName(basicForm.getCountry().getName());
		}
		if (basicForm.getCity() != null) {
			extraServiceAccomodation.setCityId(basicForm.getCity().getId());
			extraServiceAccomodation.setCityName(basicForm.getCity().getName());
		}
		extraServiceAccomodation.setAccommodationName(basicForm.getAccommodationName());
		extraServiceAccomodation.setSalesPartner(basicForm.getSalesPartner());
		if (basicForm.getCountryForSales() != null) {
			extraServiceAccomodation.setCountryForSales(basicForm.getCountryForSales().getName());
		}
		extraServiceAccomodation.setNationality(basicForm.getIndicateNationalities());
		extraServiceAccomodation.setB2c(basicForm.getB2cWebSite());

		save(extraServiceAccomodation, settingForm);
		return extraServiceAccomodation.getId();
	}
	
	@Transactional
	public void delete(String id){
		ExtraServiceAccomodation extraServiceAccomodation = extraServicesAccomodationRepository.findById(id);
		extraServiceAccomodation.setStatus(Status.DELETED);
	}
}
