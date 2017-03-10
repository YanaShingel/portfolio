package com.connectflexi.backoffice.controller.taxesinbackoffice;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.connectflexi.backoffice.dto.taxesinbackoffice.TaxesInBackOfficeSaveDTO;
import com.connectflexi.backoffice.dto.taxesinbackoffice.TaxesInBackOfficeSearchDTO;
import com.connectflexi.backoffice.model.TaxesInBackoffice;
import com.connectflexi.backoffice.service.taxesinbackoffice.TaxesInBackofficeService;

@Controller
@RequestMapping("/taxesinbackoffice")
public class TaxesInBackofficeController {
	
	@Autowired
	private TaxesInBackofficeService taxesInBackofficeService;

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public Map<String, Object> loadData(@RequestBody TaxesInBackOfficeSearchDTO params) {
		
		return taxesInBackofficeService.loadData(params);
	}
	
	@ResponseBody
	@RequestMapping(value="/saveData", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public void saveData(@RequestBody TaxesInBackOfficeSaveDTO params) {
		
		taxesInBackofficeService.saveData(params);
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteName(@RequestParam(value="Id") String id) {
		taxesInBackofficeService.delete(id);	
	}
}
