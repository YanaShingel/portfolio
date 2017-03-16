package com.connectflexi.backoffice.dto.extraservicesaccommodation;

import java.util.List;
import java.util.stream.Collectors;

import com.connectflexi.backoffice.model.BasicRoom;
import com.connectflexi.backoffice.model.Provider;

public class ProviderDTO {
	
	private String id;
	private String agreementNumber;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getAgreementNumber() {
		return agreementNumber;
	}
	public void setAgreementNumber(String agreementNumber) {
		this.agreementNumber = agreementNumber;
	}
	
	public ProviderDTO (String id, String agreementNumber) {
		this.id = id;
		this.agreementNumber = agreementNumber;
	}
	
	public ProviderDTO () {
		
	}
	
	public static ProviderDTO mapProviderEntity(Provider provider) {
		ProviderDTO providerDTO = new ProviderDTO();
		providerDTO.setId(provider.getId());
		providerDTO.setAgreementNumber(provider.getAgreementNumber());
		return providerDTO;
	}

	public static List<ProviderDTO> mapProviderEntities(List<Provider> providers) {
		return providers.stream().map((provider) -> mapProviderEntity(provider)).collect(Collectors.toList());
	}
}
