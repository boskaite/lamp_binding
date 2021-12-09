
const tableCompany = require("../model/table-company.model");
const tableEmployee = require("../model/table-employee.model");
const tableLamp = require("../model/table-lamp.model");
const tableNet = require("../model/table-lamp-binding-net.model");
const tableLampBinding = require("../model/table-lamp-binding-worker.module");
const tableLampHistory = require("../model/table-lamp-history.model");
const tablePosition = require("../model/table-position.model");
const tableStatus = require("../model/table-status.model");
const tableWorker = require("../model/table-worker.module");

exports.getBinding = (req, res) => {
    async function Bind() {
        let lamp = await tableLamp.getLAMPS();
        console.log(Object.keys(lamp[0]));
        let company = await tableCompany.getCompanies();
        let employee = await tableEmployee.getEmployees();
        let net = await tableNet.getLampBindingNets();
        let lampBinding = await tableLampBinding.getLampBindingWorkers();
        let lampHistory = await tableLampHistory.getHistories();
        let position = await tablePosition.getPositions();
        let status = await tableStatus.getStatuses();
        let worker = await tableWorker.getWorkers();
        let binding = {};
        binding = lamp;
        for (let key in lamp) {
            for (let i in net)
                if (binding[key]['id'] === net[i]['lamp_id']) {
                    binding[key].netID = net[i]['net_id'];
                }
            binding[key].hour = 0;
            for (let i in lampHistory) {
                if (binding[key]['id'] === lampHistory[i]['lamp_id']) {
                    if (lampHistory[i]['status_id'] === 4) {
                        binding[key].dateOperation = Intl.DateTimeFormat().format(lampHistory[i]['date_time']);
                    }
                    if (lampHistory[i]['status_id'] === 5) {
                        binding[key].dateTO = Intl.DateTimeFormat().format(lampHistory[i]['date_time']);
                    }
                    let hour = 0;
                    if ((lampHistory[i]['status_id'] ===  2) || (lampHistory[i]['status_id'] ===  3)) {
                        binding[key].dateBinding = lampHistory[i]['date_time'].toLocaleString();
                        for (let y in lampHistory) {
                            if (lampHistory[y]['status_id'] === 7 && lampHistory[i]['lamp_id'] === lampHistory[y]['lamp_id']) {
                                let start = new Date(lampHistory[i]['date_time']);
                                let end = new Date(lampHistory[y]['date_time']);
                                if (end.getFullYear() === start.getFullYear() && end.getMonth()===start.getMonth() && end.getDate()===start.getDate()) {
                                    console.log(end);
                                    console.log(start);
                                    hour = hour + (end-start)/3600000;
                                    console.log(hour);
                                    binding[key].hour = binding[key].hour + hour;
                                }
                            }
                        }
                        binding[key].hour=Math.round(binding[key].hour);
                    }else {
                        binding[key].dateBinding = '-';
                    }
                }
            }
            for (let i in lampBinding) {
                if (binding[key]['id'] === lampBinding[i]['lamp_id']) {
                    for (let j in status)
                        if (lampBinding[i]['status_id'] === status[j]['id']) {
                            binding[key].status = status[j]['id'];
                        }
                    if(lampBinding[i]['status_id'] != 1) {
                        for (let k in worker) {
                            if (lampBinding[i]['worker_id'] === worker[k]['id']) {
                                for (let j in employee) {
                                    if (worker[k]['employee_id'] === employee[j]['id']) {
                                        binding[key].info = employee[j]['surname'] + " " + employee[j]['first_name']+ " " + employee[j]['patromumic'] + " | " + employee[j]['service_number'] + ', ';
                                        break;
                                    }
                                }
                                for (let j in position) {
                                    if (worker[k]['position_id'] === position[j]['id'])
                                        binding[key].info = binding[key].info + position[j]['title'];
                                }
                                for (let j in company) {
                                    if (worker[k]['company_id'] === company[j]['id']) {
                                        binding[key].company = company[j]['title'];
                                        for (let h in company)
                                            if (company[j]['upper_company_id'] === company[h]['id'])
                                                binding[key].company = binding[key].company + " / " + company[h]['title'];
                                    }
                                }
                                break;
                            } else {
                                binding[key].info = 'Резервный';
                                binding[key].company = '-';
                                binding[key].upperCompany = '-';
                            }
                        }
                    }else {
                        binding[key].info = 'Резервный';
                        binding[key].company = '-';
                        binding[key].upperCompany = '-';
                    };
                }
            };
            if (binding[key].hour === 0)
            {
                binding[key].hour = '-';
            }
        };
        res.json(binding);
    };
    Bind();
};




