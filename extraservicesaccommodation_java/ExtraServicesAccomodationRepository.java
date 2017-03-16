package com.connectflexi.backoffice.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.connectflexi.backoffice.model.BasicRoom;
import com.connectflexi.backoffice.model.ExtraServiceAccomodation;
import com.connectflexi.backoffice.model.Provider;

@Repository
public interface ExtraServicesAccomodationRepository extends CrudRepository<ExtraServiceAccomodation, String> {

	@Query ("select t from ExtraServiceAccomodation t")
	public List<ExtraServiceAccomodation> findAll();
	
	List<BasicRoom> findBybasicroomLike(String basicroom);
	
	List<Provider> findBypartnerLike (String provider);

	ExtraServiceAccomodation findById(String id);
}
