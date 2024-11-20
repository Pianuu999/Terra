package com.react.react.entity;

import com.react.react.dto.APIDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="data")
public class APIEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String MODEL_NM;
    @Column
    private String SERIAL_NO;
    @Column
    private String SENSING_TIME;
    @Column
    private String REGION;
    @Column
    private String AUTONOMOUS_DISTRICT;
    @Column
    private String ADMINISTRATIVE_DISTRICT;
    @Column
    private String VISITOR_COUNT;
    @Column
    private String REG_DTTM;

    public static APIEntity toAPIEntity(APIDTO apiDto){
        APIEntity apiEntity = new APIEntity();
        apiEntity.setMODEL_NM(apiDto.getModelNm());
        apiEntity.setSERIAL_NO(apiDto.getSerialNo());
        apiEntity.setSENSING_TIME(apiDto.getSensingTime());
        apiEntity.setREGION(apiDto.getRegion());
        apiEntity.setAUTONOMOUS_DISTRICT(apiDto.getAutonomousDistrict());
        apiEntity.setADMINISTRATIVE_DISTRICT(apiDto.getAdministrativeDistrict());
        apiEntity.setVISITOR_COUNT(apiDto.getVisitorCount());
        apiEntity.setREG_DTTM(apiDto.getRegDttm().toString());
        return apiEntity;
    }
}
