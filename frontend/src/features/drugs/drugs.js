export class Drug {
    constructor() {
        this.G_k_1_CharacterisationDrugRole = {"value": null}
        this.G_k_2_1_1a_MPIDVersion = {"value": null}
        this.G_k_2_1_1b_MPID = {"value": null}
        this.G_k_2_1_2a_PhPIDVersion = {"value": null}
        this.G_k_2_1_2b_PhPID = {"value": null}
        this.G_k_2_2_MedicinalProductNamePrimarySource = {"value": null}
        this.G_k_2_4_IdentificationCountryDrugObtained = {"value": null}
        this.G_k_2_5_InvestigationalProductBlinded = {"value": null}
        this.G_k_3_1_AuthorisationApplicationNumber = {"value": null}
        this.G_k_3_2_CountryAuthorisationApplication = {"value": null}
        this.G_k_3_3_NameHolderApplicant = {"value": null}
        this.G_k_5a_CumulativeDoseFirstReactionNum = {"value": null}
        this.G_k_5b_CumulativeDoseFirstReactionUnit = {"value": null}
        this.G_k_6a_GestationPeriodExposureNum = {"value": null}
        this.G_k_6b_GestationPeriodExposureUnit = {"value": null}
        this.G_k_8_ActionTakenDrug = {"value": null}
        this.G_k_11_AdditionalInformationDrug = {"value": null}
        this.id = null
    }
}

export class Substance {
    constructor() {
        this.G_k_2_3_r_1_SubstanceName = {"value": null}
        this.G_k_2_3_r_2a_SubstanceTermIDVersion = {"value": null}
        this.G_k_2_3_r_2b_SubstanceTermID = {"value": null}
        this.G_k_2_3_r_3a_StrengthNum = {"value": null}
        this.G_k_2_3_r_3b_StrengthUnit = {"value": null}
        this.id = null
    }
}

export class Dosage {
    constructor() {
        this.G_k_4_r_1a_DoseNum = {"value": null}
        this.G_k_4_r_1b_DoseUnit = {"value": null}
        this.G_k_4_r_2_NumberUnitsInterval = {"value": null}
        this.G_k_4_r_3_DefinitionIntervalUnit = {"value": null}
        this.G_k_4_r_4_DateTimeDrug = {"value": null, "nullFlavor": null}
        this.G_k_4_r_5_DateTimeLastAdministration = {"value": null, "nullFlavor": null}
        this.G_k_4_r_6a_DurationDrugAdministrationNum = {"value": null}
        this.G_k_4_r_6b_DurationDrugAdministrationUnit = {"value": null}
        this.G_k_4_r_7_BatchLotNumber = {"value": null}
        this.G_k_4_r_8_DosageText = {"value": null}
        this.G_k_4_r_9_1_PharmaceuticalDoseForm = {"value": null, "nullFlavor": null}
        this.G_k_4_r_9_2a_PharmaceuticalDoseFormTermIDVersion = {"value": null}
        this.G_k_4_r_9_2b_PharmaceuticalDoseFormTermID = {"value": null}
        this.G_k_4_r_10_1_RouteAdministration = {"value": null, "nullFlavor": null}
        this.G_k_4_r_10_2a_RouteAdministrationTermIDVersion = {"value": null}
        this.G_k_4_r_10_2b_RouteAdministrationTermID = {"value": null}
        this.G_k_4_r_11_1_ParentRouteAdministration = {"value": null, "nullFlavor": null}
        this.G_k_4_r_11_2a_ParentRouteAdministrationTermIDVersion = {"value": null}
        this.G_k_4_r_11_2b_ParentRouteAdministrationTermID = {"value": null}
        this.id = null
    }
}

export class IndicationForUse {
    constructor() {
        this.G_k_7_r_1_IndicationPrimarySource = {"value": null, "nullFlavor": null}
        this.G_k_7_r_2a_MedDRAVersionIndication = {"value": null}
        this.G_k_7_r_2b_IndicationMedDRACode = {"value": null}
        this.id = null
    }
}

export class DrugReactionMatrix {
    constructor() {
        this.G_k_9_i_3_1a_IntervalDrugAdministrationReactionNum = {"value": null}
        this.G_k_9_i_3_1b_IntervalDrugAdministrationReactionUnit = {"value": null}
        this.G_k_9_i_3_2a_IntervalLastDoseDrugReactionNum = {"value": null}
        this.G_k_9_i_3_2b_IntervalLastDoseDrugReactionUnit = {"value": null}
        this.G_k_9_i_4_ReactionRecurReadministration = {"value": null}
        this.id = null
    }
}

export class Relatedness {
    constructor() {
        this.G_k_9_i_2_r_1_SourceAssessment = {"value": null}
        this.G_k_9_i_2_r_2_MethodAssessment = {"value": null}
        this.G_k_9_i_2_r_3_ResultAssessment = {"value": null}
        this.id = null
    }
}

export class AdditionalInfo {
    constructor() {
        this.G_k_10_r_AdditionalInformationDrug = {"value": null}
        this.id = null
    }
}