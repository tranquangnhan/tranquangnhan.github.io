const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
//kết nối database

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { //kiểm tra xem có nhập vào email và password k nếu k báo lỗi
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            })
        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async(error, results) => {
            console.log(results) //dấu hỏi có nghĩa là email bên phải truyền vào
            if (results.length == 0) {
                res.status(401).render('login', {
                    message: 'Email hoặc password không đúng !'
                });
            }
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'Email hoặc password không đúng !'
                });
            } else {
                const id = results[0].id; // tìm id

                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                //tạo ra một cái token
                console.log("the token is: " + token);

                const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }
                    //tạo ra cookie
                res.cookie('jwt', token, cookieOptions); // set cookie 
                res.status(200).redirect('/');
            };
        });

    } catch (error) {
        console.log(error)
    }
}

exports.register = (req, res) => {

    const { name, email, password, passwordConfirm } = req.body; /// khai báo name, email, password
    db.query('SELECT email From users WHERE email = ?', [email], async(error, results) => {
        // query select email                       //dấu hỏi có nghĩa là email bên phải truyền vào
        if (error) {
            console.log(error); //nếu lỗi trả về lỗi
        }
        if (results.length > 0) { //nếu đã có trong database báo đã có
            return res.render('register', {
                message: 'Email đã được sử dụng !'
            })
        } else if (password !== passwordConfirm) { // nếu password và passwordConfirm khác nhau 
            return res.render('register', { //thì trả về register
                message: 'Password và password confirm không trùng khớp !'
            });
        }
        let hashPassword = await bcrypt.hash(password, 8); //hash password
        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashPassword }, (error, results) => {
            if (error) { //insert data vào data base
                throw error;
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'Đã tạo tài khoản !' // thông báo đã tạo tài khoản
                });
            }

        });
        res.redirect('/', {
            name: name
        })
    });

}