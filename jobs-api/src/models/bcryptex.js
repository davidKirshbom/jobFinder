const bcrypt = require('bcryptjs');
const password="1234"
const hashPassword = async (password) => {
    const hashPass = await bcrypt.hash(password, 8);

    const isAMach =await bcrypt.compare(password,hashPass)
}