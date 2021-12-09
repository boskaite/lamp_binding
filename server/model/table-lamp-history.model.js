const sql = require("./db_model");

const HISTORY = function (historY) {
    this.id = historY.id;
    this.lamp_id = historY.lamp_id;
    this.datetime = historY.datetime;
    this.statusID = historY.statusID;
    this.description = historY.description;
};

exports.getHistories = async function() {
    async function history() {
        const queryALL = `SELECT * FROM lamp_history`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; //объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей из 1 массива
    };
    let info = await history();
    return info;
};