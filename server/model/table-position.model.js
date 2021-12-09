const sql = require("./db_model");

const position = function (Position) {
    this.id = Position.id;
    this.title = Position.title;
};

exports.getPositions = async function() {
    async function position() {
        const queryALL = `SELECT * FROM position`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; //объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей из 1 массива
    };
    let info = await position();
    return info;
};
