const sql = require("./db_model");

const worker = function (Worker) {
    this.id = Worker.id;
    this.positionID = Worker.positionID;
    this.employeeID = Worker.employeeID;
    this.companyID = Worker.companyID;
};

exports.getWorkers = async function() {
    async function worker() {
        const queryALL = `SELECT * FROM worker`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; //объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей из 1 массива
    };
    let info = await worker();
    return info;
};
