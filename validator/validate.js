const { check, validationResult } = require("express-validator/check");

exports.validateRequest= [
    check("teacher_name", "please include name").not().isEmpty().isLength({ min: 3 }).withMessage("Name is Required"),
    check("email", "please mention a valid email").isEmail().withMessage("Valid email is required"),
    check('Date_of_birth').not().isEmpty().isDate(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }).withMessage("password must be at least 6 character long"),
  ]

  exports.isVaidated=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array()[0].msg });
    }  
  }