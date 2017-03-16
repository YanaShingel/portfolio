package com.connectflexi.backoffice.dto.extraservicesaccommodation;

import java.util.List;

public class GeneralAccommodationDTO {

	private ExtraServiceAccommodationBasicDTO basicForm;
	private List<ExtraServicesAccommodationEditDTO> settingForm;
	
	public ExtraServiceAccommodationBasicDTO getBasicForm() {
		return basicForm;
	}
	public void setBasicForm(ExtraServiceAccommodationBasicDTO basicForm) {
		this.basicForm = basicForm;
	}
	public List<ExtraServicesAccommodationEditDTO> getSettingForm() {
		return settingForm;
	}
	public void setSettingForm(List<ExtraServicesAccommodationEditDTO> settingForm) {
		this.settingForm = settingForm;
	}
		
}
