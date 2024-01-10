const {Router} = require('express')
const { validateJWT } = require("../../utils/validateJWT")
const { createProgramApplication, updateProgramApplication, deleteProgramApplication, getUserProgramApplication, getAllProgramApplications, getReviewersStatus,
getBfaProgramApplications,getIraProgramApplications,getProgramApplicationDetails,deleteProgramApplicationRequirement } = require('./program_application.controller');

const router = Router()
router.post("/",createProgramApplication)
router.get('/user',validateJWT,getUserProgramApplication)
// business UUID
// ret reviewers,status()
router.get('/reviewers/:uuid',validateJWT,getReviewersStatus)
router.get('/',validateJWT,getAllProgramApplications)
router.get('/bfa',validateJWT,getBfaProgramApplications)
router.get('/ira',validateJWT,getIraProgramApplications)
router.get('/:uuid',validateJWT,getProgramApplicationDetails)
router.patch('/:uuid',validateJWT,updateProgramApplication)
router.delete('/:uuid',validateJWT,deleteProgramApplication)
router.delete('ProgramApplication_requirement/:uuid',validateJWT,deleteProgramApplicationRequirement)

module.exports = router