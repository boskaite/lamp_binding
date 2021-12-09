const sql = require("./db_model");

const netNumber = function (NetNumber) {
    this.id = NetNumber.id;
    this.lampID = NetNumber.lampID;
    this.netID = NetNumber.netID;
};

exports.getLampBindingNets = async function() {
    async function lampBDNnet() {
        const queryALL = `SELECT * FROM lamp_binding_net`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; //объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей из 1 массива
    };
    let info = await lampBDNnet();
    return info;
};
