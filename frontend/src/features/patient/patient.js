export class PatientInfo {
    constructor() {
        this.D_1_Patient = {"value": null, "nullFlavor": null}
        this.D_1_1_1_MedicalRecordNumberSourceGP = {"value": null, "nullFlavor": null}
        this.D_1_1_2_MedicalRecordNumberSourceSpecialist = {"value": null, "nullFlavor": null}
        this.D_1_1_3_MedicalRecordNumberSourceHospital = {"value": null, "nullFlavor": null}
        this.D_1_1_4_MedicalRecordNumberSourceInvestigation = {"value": null, "nullFlavor": null}
        this.D_2_1_DateBirth = {"value": null, "nullFlavor": null}
        this.D_2_2a_AgeOnsetReactionNum = {"value": null}
        this.D_2_2b_AgeOnsetReactionUnit = {"value": null}
        this.D_2_2_1a_GestationPeriodReactionFoetusNum = {"value": null}
        this.D_2_2_1b_GestationPeriodReactionFoetusUnit = {"value": null}
        this.D_2_3_PatientAgeGroup = {"value": null}
        this.D_3_BodyWeight = {"value": null}
        this.D_4_Height = {"value": null}
        this.D_5_Sex = {"value": null, "nullFlavor": null}
        this.D_6_LastMenstrualPeriodDate = {"value": null, "nullFlavor": null}
        this.D_7_2_TextMedicalHistory = {"value": null, "nullFlavor": null}
        this.D_7_3_ConcomitantTherapies = {"value": null}
        this.D_9_1_DateDeath = {"value": null, "nullFlavor": null}
        this.D_9_3_Autopsy = {"value": null, "nullFlavor": null}
        this.id = null
    }
}

export class MedHistory {
    constructor() {
        this.D_7_1_r_1a_MedDRAVersionMedicalHistory = {"value": null}
        this.D_7_1_r_1b_MedicalHistoryMedDRACode = {"value": null}
        this.D_7_1_r_2_StartDate = {"value": null, "nullFlavor": null}
        this.D_7_1_r_3_Continuing = {"value": null, "nullFlavor": null}
        this.D_7_1_r_4_EndDate = {"value": null, "nullFlavor": null}
        this.D_7_1_r_5_Comments = {"value": null}
        this.D_7_1_r_6_FamilyHistory = {"value": null}
        this.id = null
    }
}

export class DrugHistory {
    constructor() {
        this.D_8_r_1_NameDrug = {"value": null, "nullFlavor": null}
        this.D_8_r_2a_MPIDVersion = {"value": null}
        this.D_8_r_2b_MPID = {"value": null}
        this.D_8_r_3a_PhPIDVersion = {"value": null}
        this.D_8_r_3b_PhPID = {"value": null}
        this.D_8_r_4_StartDate = {"value": null, "nullFlavor": null}
        this.D_8_r_5_EndDate = {"value": null, "nullFlavor": null}
        this.D_8_r_6a_MedDRAVersionIndication = {"value": null}
        this.D_8_r_6b_IndicationMedDRACode = {"value": null}
        this.D_8_r_7a_MedDRAVersionReaction = {"value": null}
        this.D_8_r_7b_ReactionMedDRACode = {"value": null}
        this.id = null
    }
}

export class CauseOfDeath {
    constructor() {
        this.D_9_2_r_1a_MedDRAVersionCauseDeath = {"value": null}
        this.D_9_2_r_1b_CauseDeathMedDRACode = {"value": null}
        this.D_9_2_r_2_CauseDeath = {"value": null}
        this.id = null
    }
}

export class AutopsyData {
    constructor() {
        this.D_9_4_r_1a_MedDRAVersionAutopsyDeterminedCauseDeath = {"value": null}
        this.D_9_4_r_1b_AutopsyDeterminedCauseDeathMedDRACode = {"value": null}
        this.D_9_4_r_2_AutopsyDeterminedCauseDeath = {"value": null}
        this.id = null
    }
}

export class ParentChildData {
    constructor() {
        this.D_10_1_ParentIdentification = {"value": null, "nullFlavor": null}
        this.D_10_2_1_DateBirthParent = {"value": null, "nullFlavor": null}
        this.D_10_2_2a_AgeParentNum = {"value": null}
        this.D_10_2_2b_AgeParentUnit = {"value": null}
        this.D_10_3_LastMenstrualPeriodDateParent = {"value": null, "nullFlavor": null}
        this.D_10_4_BodyWeightParent = {"value": null}
        this.D_10_5_HeightParent = {"value": null}
        this.D_10_6_SexParent = {"value": null, "nullFlavor": null}
        this.id = null
    }
}

export class ParentHistoryData {
    constructor() {
        this.D_10_7_2_TextMedicalHistoryParent = {"value": null}
        this.id = null
    }
}

export class ParentData {
    constructor() {
        this.D_10_7_1_r_1a_MedDRAVersionMedicalHistory = {"value": null}
        this.D_10_7_1_r_1b_MedicalHistoryMedDRACode = {"value": null}
        this.D_10_7_1_r_2_StartDate = {"value": null, "nullFlavor": null}
        this.D_10_7_1_r_3_Continuing = {"value": null, "nullFlavor": null}
        this.D_10_7_1_r_4_EndDate = {"value": null, "nullFlavor": null}
        this.D_10_7_1_r_5_Comments = {"value": null}
        this.id = null
    }
}

export class ParentDrugHistory {
    constructor() {
        this.D_10_8_r_1_NameDrug = {"value": null}
        this.D_10_8_r_2a_MPIDVersion = {"value": null}
        this.D_10_8_r_2b_MPID = {"value": null}
        this.D_10_8_r_3a_PhPIDVersion = {"value": null}
        this.D_10_8_r_3b_PhPID = {"value": null}
        this.D_10_8_r_4_StartDate = {"value": null, "nullFlavor": null}
        this.D_10_8_r_5_EndDate = {"value": null, "nullFlavor": null}
        this.D_10_8_r_6a_MedDRAVersionIndication = {"value": null}
        this.D_10_8_r_6b_IndicationMedDRACode = {"value": null}
        this.D_10_8_r_7a_MedDRAVersionReaction = {"value": null}
        this.D_10_8_r_7b_ReactionsMedDRACode = {"value": null}
        this.id = null
    }
}

