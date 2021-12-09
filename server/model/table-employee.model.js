const sql = require("./db_model");

const employee = function (Employee) {
this.id = Employee.id;
this.surname = Employee.surname;
this.firstname = Employee.firstname;
this.patromumic = Employee.patromumic;
this.personalNumber = Employee.personalNumber;
this.phoneNumber = Employee.phoneNumber;
this.dateBirthday = Employee.dateBirthday;
};

exports.getEmployees = async function() {
    async function employee() {
        const queryALL = `SELECT * FROM employee`;
        let array = await sql.promise().query(queryALL)
            .then((data) => {
                return data;
            })
            .catch(console.log);
        return array[0]; //объект массив с двумя массивами: в 1 массиве - поля из БД и данные, во 2 массиве - свойства полей из 1 массива
    };
    let info = await employee();
    return info;
};