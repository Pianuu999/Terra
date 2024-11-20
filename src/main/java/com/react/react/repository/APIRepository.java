package com.react.react.repository;

import com.react.react.entity.APIEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface APIRepository extends JpaRepository<APIEntity, Integer> {
}
