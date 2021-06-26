const mysql = require('mysql')
// const jwt = require('jsonwentoken')
const bcrypt = require('bcryptjs')

const db = mysql.createConnection({
  user: process.env.DB_USER,
  user: process.env.DB_NAME,
  user: process.env.DB_PASSWORD,
});

exports.register = (req,res) => {
    console.log(req.body)


    const { name, email, password} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results)=>{
      if(error) {
        console.log(error);
      }
      if(password !== password) {
        return res.render('register', {
          message: 'Incorrect password'
        });
      }

      let hashedPassword = await bcrypt .hash(password, 8);
      console.log(hashedPassword);

      db.query('INSERT INT users SET ?' ,{name: name, email: email, password: hashedPassword}, (error, results) =>{
        if (error) {
          console.log(error);
        } else {
          console.log(results);
          return res.render('register', {
            message: 'User registered'
          })
        }
      })
    });
}