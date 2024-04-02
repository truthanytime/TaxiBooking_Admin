export const LedgerTypes = {
    UNDEFINEDENTRY: 0,
    COMMISSION: 1,
    SWAP: 2,
    CLOSED_POSITION: 3,
    DEPOSIT: 4,
    WITHDRAWAL: 5,
    CREDIT_IN: 6,
    CREDIT_OUT: 7,
    AGENT_COMMISSION: 8,
}
export const LedgerTypesNames = [
    "Undefinedentry",  "Commission", "Swap", "Closed Position", "Deposit", "Withdrawal", "Credit In", "Credit Out", "Agent Commission"
]

export const kycStatus = {
    APPROVED: "VERIFIED", 
    REJECTED: "REJECTED",
    PENDING: "PENDING",
    NEW: "NEW",
    DONE: "DONE"
}
export const DepositStatus = {
    APPROVED: "APPROVED", 
    REJECTED: "REJECTED",
    PENDING: "PENDING",
    NEW: "NEW",
    DONE: "DONE"
}
export const WithdrawStatus = {
    APPROVED: "APPROVED", 
    REJECTED: "REJECTED",
    PENDING: "PENDING",
    NEW: "NEW",
    DONE: "DONE"
}

export const VerificationStatus = {
    NEW: "New",
    VERIFIED: "Verified", 
    BLOCKED: "Blocked", 
    EMAIL_NOT_VERIFIED: "Email Not Verified", 
    PENDING_VEFIFICATION:"Pending Verification", 
    REJECTED: "Rejected",
    APPROVED: "Approved"
}
export const VerifyStatusKeys = [
    {value:"NEW", label: "New" },
    {value:"VERIFIED", label: "Verified" },
    {value:"BLOCKED", label: "Blocked" },
    {value:"REJECTED", label: "Rejected" },
    {value:"PENDING_VEFIFICATION", label: "Pending Verification" },
    {value:"EMAIL_NOT_VERIFIED", label: "Email Not Verified"},
    {value: "APPROVED", label: "Approved"}
]

export const AccountTypeStatus = {
    RETAIL:"Retail",
    EXPERIENCED : "Experienced",
    PROFESSIONAL :"Professional",
}
export const AccountTypes = [
    {value: "RETAIL", label: "Retail"},
    {value: "EXPERIENCED", label: "Experienced"},
    {value: "PROFESSIONAL", label: "Professional"},
]

export const RoleStatus = {
    USER: "User", 
    ADMIN : "Admin", 
    BRANCH_ADMIN: "Branch Admin", 
    IB: "IB", 
    SUB_IB: "Sub IB", 
    LEAD_PROVIDER: "Lead Provider", 
    CONVERSATION_AGENT: "Conversation Agent",
    RETENTION_AGENT: "Retention Agent",
    RETENTION_TEAM_LEADER:"Retention Team Leader",
    ACCOUNT_MANAGER:"Account Manager",
    SUPPORT_CUSTOMER_SERVICE:"Support & Customer Service",
    FINANCE:"Finance",
    KYC: "KYC", 
    GUEST: "Guest"
}
export const RoleOptions = [
    {value:"USER", label: "User"}, 
    {value:"ADMIN", label : "Admin"}, 
    {value:"BRANCH_ADMIN", label: "Branch Admin"}, 
    {value:"IB", label: "IB"}, 
    {value:"SUB_IB", label: "Sub IB"}, 
    {value:"LEAD_PROVIDER", label: "Lead Provider"}, 
    {value:"CONVERSATION_AGENT", label: "Conversation Agent"},
    {value:"RETENTION_AGENT", label: "Retention Agent"},
    {value:"RETENTION_TEAM_LEADER", label:"Retention Team Leader"},
    {value:"ACCOUNT_MANAGER", label:"Account Manager"},
    {value:"SUPPORT_CUSTOMER_SERVICE", label:"Support & Customer Service"},
    {value:"FINANCE", label:"Finance"},
    {value:"KYC", label: "KYC"}, 
    {value:"GUEST", label: "Guest"}
]

export const KYCItmes = [
    {
        value: "FIRST_NAME" , label: "First Name"
    },
    {
        value: "LAST_NAME", label: "Last Name"
    },
    {
        value: "BIRTH_DATE", label: "Bithday"
    },
    {
        value:"PHONE", label: "Phone"
    },
    {
        value:"COUNTRY", label: "Country"
    },
    {
        value:"STATE", label: "State"
    },
    {
        value:"CITY", label: "City"
    },
    {
        value:"ZIP_CODE", label: "Zip Code"
    },
    {
        value:"STREET", label: "Street"
    },
    {
        value:"FAX_NUMBER", label: "Fax number"
    },
    {
        value:"PASSPORT_ID_NUMBER", label: "Passport Id"
    },
    {
        value:"PASSPORT_ID_COUNTRY", label: "Passport Country"
    },
    {
        value:"TAX_IDENTIFICATION_NUMBER", label: "Tax ID"
    },
    {
        value:"CITIZENSHIP", label: "Citizenship"
    },
    {
        value:"MARITAL_STATUS", label: "Marital Status"
    }
]

export const DemoKYCItmes = [
    {
        value: "DEMO_FIRST_NAME" , label: "First Name"
    },
    {
        value: "DEMO_LAST_NAME", label: "Last Name"
    },
    {
        value: "DEMO_BIRTH_DATE", label: "Bithday"
    },
    {
        value: "DEMO_PHONE", label: "Phone"
    },
    {
        value: "DEMO_COUNTRY", label: "Country"
    },
    {
        value: "DEMO_STATE", label: "State"
    },
    {
        value: "DEMO_CITY", label: "City"
    },
    {
        value: "DEMO_ZIP_CODE", label: "Zip Code"
    },
    {
        value: "DEMO_STREET", label: "Street"
    },
    {
        value: "DEMO_FAX_NUMBER", label: "Fax number"
    },
    {
        value: "DEMO_PASSPORT_ID_NUMBER", label: "Passport Id"
    },
    {
        value: "DEMO_PASSPORT_ID_COUNTRY", label: "Passport Country"
    },
    {
        value: "DEMO_TAX_IDENTIFICATION_NUMBER", label: "Tax ID"
    },
    {
        value: "DEMO_CITIZENSHIP", label: "Citizenship"
    },
    {
        value: "DEMO_MARITAL_STATUS", label: "Marital Status"
    }
]

export const BranchStatus = {
    ACTIVE: "ACTIVE", 
    INACTIVE: "INACTIVE"
}

export const actionStatus = {
    SUCCESS: "Success" , 
    ERROR: "Error", 
    INFO: "Info"
}
export const accountType = {
    REAL: "Real", 
    DEMO: "Demo",
    IB: "IB"
}

export const analyticsMode = {
    WEEK: "WEEK",
    MONTH: "MONTH"
}

export const depositType ={
    GATEWAY: "Payment Gateway",
    MANUAL: "Manual",
    INTERNAL: "Internal",
    IB_COMMISSION: "IB Commission",
    INITIAL: "INITIAL"
}
export const ibState = {
    IB_APPROVED: "APPROVED", 
    IB_NEW: "NEW", 
    IB_DECLINED: "DECLINED"
}

export const SocialAccountStatus = {
    APPROVED: "APPROVED", 
    DECLINED: "DECLINED",
    PENDING: "PENDING",
    NEW: "NEW"
}