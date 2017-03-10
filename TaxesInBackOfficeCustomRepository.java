package com.connectflexi.backoffice.dao.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.connectflexi.backoffice.dto.extraservicesaccommodation.ExtraServicesAccomodationDTO;
import com.connectflexi.backoffice.dto.taxesinbackoffice.TaxesInBackOfficeSearchDTO;
import com.connectflexi.backoffice.model.ExtraServiceAccomodation;
import com.connectflexi.backoffice.model.TaxesInBackoffice;

@Repository
public class TaxesInBackOfficeCustomRepository {

	@PersistenceContext
	EntityManager em;

	public List<TaxesInBackoffice> loadData(TaxesInBackOfficeSearchDTO params) {
		String hql = "";
		
		
		
		hql += "SELECT t FROM TaxesInBackoffice t WHERE t.status IS NOT 'DELETED' "
				+ "AND ((:CATEGORYFILTER) IS NULL OR t.category.id IN (:CATEGORYFILTER) ) "
				+ "AND ((:CITYFILTER) IS NULL OR t.cityId IN (:CITYFILTER) ) "
				+ "AND ((:PARTNERFILTER) IS NULL OR t.partner.id IN (:PARTNERFILTER) ) "
				+ "AND ((:COUNTRYFILTER) IS NULL OR t.countryId IN (:COUNTRYFILTER))"
				+ "AND ((:SALESPARTNERFILTER) IS NULL OR t.salesPartner.id IN (:SALESPARTNERFILTER) ) "
				+ "AND (:TAXSEARCH IS NULL OR t.tax LIKE :TAXSEARCH ) "
				+ "AND (:AMOUNTFILTER IS NULL OR t.amount IN :AMOUNTFILTER ) ";

		Query query = em.createQuery(hql)
				.setParameter("CATEGORYFILTER",
						(params.getCategories().isEmpty() || params.getCategories() == null) ? null
								: params.getCategories())
				.setParameter("CITYFILTER",
						(params.getCities() == null || params.getCities().isEmpty()) ? null : params.getCities())
				.setParameter("COUNTRYFILTER",
						(params.getCountries() == null || params.getCountries().isEmpty()) ? null
								: params.getCountries())
				.setParameter("PARTNERFILTER",
						(params.getPartners() == null || params.getPartners().isEmpty()) ? null : params.getPartners())
				.setParameter("SALESPARTNERFILTER",
						(params.getSalesPartners() == null || params.getSalesPartners().isEmpty()) ? null
								: params.getSalesPartners())
				.setParameter("TAXSEARCH",
						(params.getTax() == null || params.getTax().isEmpty()) ? null : params.getTax())
				.setParameter("AMOUNTFILTER", (params.getAmount() == null) ? null
						: params.getAmount());

		Integer currentPage = params.getCurrentPage();
		// if (currentPage == null)
		// currentPage = 0;
		// currentPage--;
		Integer start = (params.getCurrentPage() - 1) * params.getLimit();

		return query.setFirstResult(start).setMaxResults(params.getLimit()).getResultList();
	}

	public Long getRecordsNumber(TaxesInBackOfficeSearchDTO params) {
		String hql = "";
		hql += "SELECT COUNT(t) FROM TaxesInBackoffice t WHERE t.status IS NOT 'DELETED' "
				+ "AND ((:CATEGORYFILTER) IS NULL OR t.category.id IN (:CATEGORYFILTER) ) "

				+ "AND ((:CITYFILTER) IS NULL OR t.cityId IN (:CITYFILTER) ) "
				+ "AND ((:PARTNERFILTER) IS NULL OR t.partner.id IN (:PARTNERFILTER) ) "
				+ "AND ((:COUNTRYFILTER) IS NULL OR t.countryId IN (:COUNTRYFILTER))"
				+ "AND ((:SALESPARTNERFILTER) IS NULL OR t.salesPartner.id IN (:SALESPARTNERFILTER) ) "
				+ "AND (:TAXSEARCH IS NULL OR t.tax LIKE :TAXSEARCH ) "
				+ "AND (:TAXSEARCH IS NULL OR t.tax LIKE :TAXSEARCH ) "
				+ "AND (:AMOUNTFILTER IS NULL OR t.amount IN :AMOUNTFILTER ) ";

		Query query = em.createQuery(hql)
				.setParameter("CATEGORYFILTER", (params.getCategories().isEmpty() || params.getCategories() == null) ? null : params.getCategories())
				.setParameter("CITYFILTER",
						(params.getCities() == null || params.getCities().isEmpty()) ? null : params.getCities())
				.setParameter("COUNTRYFILTER",
						(params.getCountries() == null || params.getCountries().isEmpty()) ? null
								: params.getCountries())
				.setParameter("PARTNERFILTER",
						(params.getPartners() == null || params.getPartners().isEmpty()) ? null : params.getPartners())
				.setParameter("SALESPARTNERFILTER",
						(params.getSalesPartners() == null || params.getSalesPartners().isEmpty()) ? null
								: params.getSalesPartners())
				.setParameter("TAXSEARCH",
						(params.getTax() == null || params.getTax().isEmpty()) ? null : params.getTax())
				.setParameter("AMOUNTFILTER", (params.getAmount() == null) ? null
						: params.getAmount());
		return (Long) query.getSingleResult();
	}
}
