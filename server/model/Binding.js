const sql = require("db_model");

const binding = function (Binding){
    this.lampID = Binding.lampID;
    this.serialNumber = Binding.serialNumber;
    this.operationalNumber = Binding.operationalNumber;
    this.netID = Binding.netID;
    this.dateOperation = Binding.dateOperation;
    this.status = Binding.status;
    this.info = Binding.info;
    this.company = Binding.company;
    this.upperCompany = Binding.upperCompany;
    this.dateBinding = Binding.dateBinding;
    this.hour = Binding.hour;
    this.dateTO = Binding.dateTO;
};
