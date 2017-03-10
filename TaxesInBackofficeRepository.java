package com.connectflexi.backoffice.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.connectflexi.backoffice.model.ExtraServiceAccomodation;
import com.connectflexi.backoffice.model.TaxesInBackoffice;

@Repository
public interface TaxesInBackofficeRepository extends CrudRepository<TaxesInBackoffice, String> {
	
	@Query ("select t from TaxesInBackoffice t")
	public List<TaxesInBackoffice> findAll();

	public TaxesInBackoffice findById(String id);
}
