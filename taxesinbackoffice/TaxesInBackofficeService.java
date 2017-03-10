package com.connectflexi.backoffice.service.taxesinbackoffice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.connectflexi.backoffice.dao.repository.CompanyRepository;
import com.connectflexi.backoffice.dao.repository.SalesAndSupplyCountryRepository;
import com.connectflexi.backoffice.dao.repository.ServiceForTaxesInBackOfficeRepository;
import com.connectflexi.backoffice.dao.repository.ServiceTypeRepository;
import com.connectflexi.backoffice.dao.repository.TaxesInBackOfficeCustomRepository;
import com.connectflexi.backoffice.dao.repository.TaxesInBackofficeRepository;
import com.connectflexi.backoffice.dto.country.CountryDTO;
import com.connectflexi.backoffice.dto.taxesinbackoffice.TaxesInBackOfficeSaveDTO;
import com.connectflexi.backoffice.dto.taxesinbackoffice.TaxesInBackOfficeSearchDTO;
import com.connectflexi.backoffice.model.Company;
import com.connectflexi.backoffice.model.SalesAndSupplyCountry;
import com.connectflexi.backoffice.model.ServiceForTaxesInBackOffice;
import com.connectflexi.backoffice.model.ServiceType;
import com.connectflexi.backoffice.model.TaxesInBackoffice;
import com.connectflexi.backoffice.model.TaxesInBackoffice.Status;

@Service
@Transactional
public class TaxesInBackofficeService {

	@Autowired
	TaxesInBackofficeRepository taxesInBackofficeRepository;

	@Autowired
	TaxesInBackOfficeCustomRepository taxesInBackOfficeCustomRepository;

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	ServiceTypeRepository serviceTypeRepository;

	@Autowired
	ServiceForTaxesInBackOfficeRepository serviceForTaxesInBackOfficeRepository;
	
	@Transactional
	public Map<String, Object> loadData(TaxesInBackOfficeSearchDTO params) {

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", taxesInBackOfficeCustomRepository.loadData(params));
		result.put("RecordsNumber", taxesInBackOfficeCustomRepository.getRecordsNumber(params));
		return result;
	}

	public void saveData(TaxesInBackOfficeSaveDTO params) {

		TaxesInBackoffice taxesInBackoffice;
		if (params.getId() == null) {
			taxesInBackoffice = new TaxesInBackoffice();
			taxesInBackoffice.setId(taxesInBackoffice.generateId());
			
		} else {
			taxesInBackoffice = taxesInBackofficeRepository.findById(params.getId());
			taxesInBackoffice.setId(params.getId());
			List<ServiceForTaxesInBackOffice> oldServiceForTaxesInBackOfficeList = serviceForTaxesInBackOfficeRepository.findByTaxesInBackoffice(taxesInBackoffice);
			serviceForTaxesInBackOfficeRepository.delete(oldServiceForTaxesInBackOfficeList);
		}
		if (params.getAmount() != null) {
			taxesInBackoffice.setAmount(params.getAmount());
		} else {
			taxesInBackoffice.setAmount(TaxesInBackoffice.Amount.TRUE);
		}
		taxesInBackoffice.setAmount(params.getAmount());
		taxesInBackoffice.setCityId(params.getCityId());
		taxesInBackoffice.setCityName(params.getCityName());
		taxesInBackoffice.setCountryId(params.getCountryId());
		taxesInBackoffice.setCountryName(params.getCountryName());

		Company partner = companyRepository.findById(params.getPartnerId());
		taxesInBackoffice.setPartner(partner);

		Company companySalesPartner = companyRepository.findById(params.getSalesPartnerId());
		taxesInBackoffice.setSalesPartner(companySalesPartner);
		
		if (params.getStatus() != null) {
			taxesInBackoffice.setStatus(params.getStatus());
		} else {
			taxesInBackoffice.setStatus(TaxesInBackoffice.Status.ACTIVE);
		}
		taxesInBackoffice.setTax(params.getTax());
		
		taxesInBackofficeRepository.save(taxesInBackoffice);
		
		
		List<ServiceForTaxesInBackOffice> newServiceForTaxesInBackOfficeList = new ArrayList<ServiceForTaxesInBackOffice>();
		if (params.getServices() != null) {
			for (int i = 0; i < params.getServices().size(); i++) {
				ServiceForTaxesInBackOffice serviceForTaxesInBackOffice = new ServiceForTaxesInBackOffice();
				//ServiceType serviceType = serviceTypeRepository.findById(params.getServices().get(i).getId());
				ServiceType serviceType = params.getServices().get(i);
				serviceForTaxesInBackOffice.setTaxesInBackoffice(taxesInBackoffice);
				serviceForTaxesInBackOffice.setId(serviceForTaxesInBackOffice.generateId());
				serviceForTaxesInBackOffice.setService(serviceType);
				newServiceForTaxesInBackOfficeList.add(serviceForTaxesInBackOffice);
			}
		}
		serviceForTaxesInBackOfficeRepository.save(newServiceForTaxesInBackOfficeList);
		
		taxesInBackoffice.setService(newServiceForTaxesInBackOfficeList);
		
		taxesInBackofficeRepository.save(taxesInBackoffice);
		
	}

	@Transactional
	public void delete(String id) {
		TaxesInBackoffice taxesInBackoffice = taxesInBackofficeRepository.findById(id);
		taxesInBackoffice.setStatus(Status.DELETED);
	}
}