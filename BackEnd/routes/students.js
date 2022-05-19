const express = require('express');
const { check } = require('express-validator');
const studentsController = require('../controllers/students');

const router = express.Router();

router.get ('/',studentsController.getStudents);
router.get('/:id', studentsController.getStudentById);

//validation
router.post('/', 
        [
            check('FirstName').not().isEmpty(),
            check('LastName').not().isEmpty(),
            check('Mobile').isMobilePhone(),
            check('Email').isEmail(),
            check('NationalID').not().isEmpty().isLength({ min: 14 }, { max: 14 }),
            check('Age').not().isEmpty(),
        ], 
        studentsController.addStudent );
                    
router.delete('/:id', studentsController.deleteStudent);
router.put('/:id',
        [
            check('FirstName').not().isEmpty(),
            check('LastName').not().isEmpty(),
            check('Mobile').isMobilePhone(),
            check('Email').isEmail(),
            check('Age').not().isEmpty(),
        ],
        studentsController.updateStudent);

module.exports = router;