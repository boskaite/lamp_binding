const sql = require("./db_model");

const status = function (Status) {
    this.id = Status.id;
    this.title = Status.title;
};

exports.getStatuses = async function() {
    async function status() {
        const queryALL = `SELECT * FROM status`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; //объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей из 1 массива
    };
    let info = await status();
    return info;
};
