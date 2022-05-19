
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const studentModule = require('../models/students');

const getStudents = async (req, res, next) => {
  let students;
  try {
    students = await studentModule.find();
  } 
  catch (err){
    const error = new HttpError('Fetching students failed, please try again later.',500 );
    return next(error);
  }
  return res.send(students);
}


const getStudentById = async (req, res,next) => {
  let student ;
  try{
    student = await studentModule.findById(req.params.id);  
  }
  catch{
      const error = new HttpError('Fetching student failed, please try again later.',500 );
      return next(error);
  }
  if (!student) 
    return new HttpError("Coudn't find a student with the given id",404 );

  return res.send(student);
  
};

const addStudent = async (req, res, next) => {
  //Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
  {
      return next( new HttpError('Invalid products passed, please check your data.', 422) );
  }

  const { FirstName, LastName, Mobile, Email, NationalID, Age } = req.body;
  //Check if found
  let existingStudent
  try {
    existingStudent = await studentModule.findOne({ NationalID });
  } 
  catch (err) {
      const error = new HttpError( 'Add New Student failed, please try again later.',500 );
      return next(error);
  }
  if (existingStudent)
      return next( new HttpError('Student exists already, please insert New Data.',422) );

  // Check Mobile & Email if Found
  try {
    existingStudent = await studentModule.findOne({ Mobile });
    if (existingStudent)
      return next( new HttpError('Mobile Student exists already, please insert New Mobile.',422) );
    
    existingStudent = await studentModule.findOne({ Email });
    if (existingStudent)
        return next( new HttpError('Email Student exists already, please insert New Email.',422) );
  } 
  catch (err) {
      const error = new HttpError( 'Add New Student failed, please try again later.',500 );
      return next(error);
  }
  
  const student = new studentModule({ FirstName, LastName, Mobile, Email, NationalID, Age  });
  await student.save();
  return res.send(student);
  
  
};

const deleteStudent = async (req, res,next) => {
  let student ;
  try{
    student = await studentModule.findByIdAndDelete(req.params.id);  
  }
  catch{
      const error = new HttpError('Fetching student failed, please try again later.',500 );
      return next(error);
  }
  if (!student) 
    return new HttpError("Coudn't find a student with the given id",404 );

  res.status(200).json({ message: 'Deleted Successfully.' }); //200 => OK
};


const updateStudent = async (req, res,next) => {
  //validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data.', 422)); //422 => Unprocessable Entity (The request was well-formed but was unable to be followed due to semantic errors.)
  }

  const { FirstName, LastName, Mobile, Email, Age } = req.body;
  let student ;
  try{ 
    student = await studentModule.findById(req.params.id);  
  }
  catch{
      const error = new HttpError('Fetching student failed, please try again later.',500 );
      return next(error);
  }
  if (!student) 
    return new HttpError("Coudn't find a student with the given id",404 );

    student.FirstName = FirstName;
    student.LastName = LastName;
    student.Email = Email;
    student.Mobile = Mobile;
    student.Age = Age;
  
    try {
      await student.save();  
      res.status(200).json({ message: 'updated Done' }); //200 => OK
    } 
    catch{
      const error = new HttpError('Something went wrong, could not update Student.',500 );
      return next(error);
    }
};

exports.getStudents=getStudents
exports.getStudentById=getStudentById;
exports.addStudent=addStudent;
exports.deleteStudent=deleteStudent;
exports.updateStudent=updateStudent;