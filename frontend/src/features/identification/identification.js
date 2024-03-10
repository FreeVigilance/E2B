export class Identification {
    constructor () {
        this.C_1_1_SenderSafetyReportUniqueId = { value: null };
        this.C_1_2_DateCreation = { value: null };
        this.C_1_3_TypeReport = { value: null };
        this.C_1_4_DateReportFirstReceivedSource = { value: null };
        this.C_1_5_DateMostRecentInformation = { value: null };
        this.C_1_6_1_AdditionalDocumentsAvailable = { value: null };
        this.C_1_7_FulfilLocalCriteriaExpeditedReport = { value: null, nullFlavor: null };
        this.C_1_8_1_WorldwideUniqueCaseIdentificationNumber = { value: null };
        this.C_1_8_2_FirstSender = { value: null };
        this.C_1_9_1_OtherCaseIdsPreviousTransmissions = { value: null, nullFlavor: null };
        this.C_1_11_1_ReportNullificationAmendment = { value: null };
        this.C_1_11_2_ReasonNullificationAmendment = { value: null };
    }
}

export class DocumentsHeldBySender {
    constructor () {
        this.C_1_6_1_r_1_DocumentsHeldSender = { value: null };
    }
}

export class OtherIdentifiers {
    constructor () {
        this.C_1_9_1_r_1_SourceCaseId = { value: null };
        this.C_1_9_1_r_2_CaseId = { value: null };
    }
}

export class IdentificationNumber {
    constructor () {
        this.C_1_10_r_IdentificationNumberReportLinked = { value: null };
    }
}
