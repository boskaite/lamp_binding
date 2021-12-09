const sql = require("./db_model");

const company = function (Company) {
    this.id = Company.id;
    this.title = Company.title;
    this.upperCompanyID = Company.upperCompanyID;
};

exports.getCompanies = async function() {
    async function company() {
        const queryALL = `SELECT * FROM company`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; //объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей иp 1 массива
    };
    let info = await company();
    return info;
};
