const sql = require("./db_model");

const LAMP = function (LAMp) {
    this.id = LAMp.id;
    this.title = LAMp.title;
    this.serialNumber = LAMp.serialNumber;
    this.operationalNumber = LAMp.operationalNumber;
};

exports.getLAMPS = async function() {
    async function lamp() {
        const queryALL = `SELECT * FROM lamp`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; // объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей из 1 массива
    };
    let info = await lamp();
    return info;
};
