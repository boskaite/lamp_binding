const sql = require("./db_model");

const lampWorker = function (LampWorker) {
    this.id = LampWorker.id;
    this.lampID = LampWorker.lampID;
    this.workerID = LampWorker.workerID;
    this.dateBinding = LampWorker.dateBinding;
    this.statusID = LampWorker.statusID;
};

exports.getLampBindingWorkers = async function() {
    async function lampBDNWorker() {
        const queryALL = `SELECT * FROM lamp_binding_worker`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; //объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей из 1 массива
    };
    let info = await lampBDNWorker();
    return info;
};
