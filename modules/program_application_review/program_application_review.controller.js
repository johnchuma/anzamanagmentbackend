const { errorResponse, successResponse } = require("../../utils/responses")
const {ProgramApplicationReview,User,Business,Sequelize,ProgramRequirement} = require("../../models");
const { sendEmail } = require("../../utils/send_email");

const createProgramApplicationReview = async(req,res)=>{
    try {
        const response = await ProgramApplicationReview.create({...req.body})
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getUserProgramApplicationReview = async(req,res)=>{
    try {
        const user = req.user
        const response = await ProgramApplicationReview.findOne({
            where:{
                userId:user.id
            },
            include:{
                model: business,
                required: true
            }
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const updateProgramApplicationReview = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const {status} = req.body
        const ProgramApplicationReview = await ProgramApplicationReview.findOne({
            where:{
                uuid
            }
        });
        //find user
        const user = await User.findOne({
            where:{id:ProgramApplicationReview.userId}
        })
        sendEmail(req, res, user, status)
        const response = await ProgramApplicationReview.update(req.body)
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteProgramApplicationReview = async(req,res)=>{
    try {
        let {
            name
        } = req.body;
        const uuid = req.params.uuid
        const ProgramApplicationReview = await ProgramApplicationReview.findOne({
            where:{
                uuid
            }
        });
        const response = await ProgramApplicationReview.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteProgramRequirement = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const ProgramRequirement = await ProgramRequirement.findOne({
            where:{
                uuid
            }
        });
        const response = await ProgramRequirement.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getAllProgramApplicationReviews = async(req, res) =>{
    // res.status(200).json({"k":"v"});
    try {
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit

        const {count, rows} = await ProgramApplicationReview.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            // distinct:true,
            include:{
                model: ProgramRequirement,
                // required: true,
            }

        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res, error)
    }
}

const getBfaProgramApplicationReviews = async(req, res) =>{
    try {
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit

        const {count, rows} = await ProgramApplicationReview.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            // distinct:true,
            where:{type:'bfa'},
            include:{
                model: ProgramRequirement,
                // required: true,
            }
        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res, error)
    }
}

const getIraProgramApplicationReviews = async(req, res) =>{
    try {
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit

        const {count, rows} = await ProgramApplicationReview.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            // distinct:true,
            where:{type:'ira'},
            include:{
                model: ProgramRequirement,
                // required: true,
            }
        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res, error)
    }
}

const getProgramApplicationReviewDetails = async(req, res) =>{
    try {
        const uuid = req.params.uuid

        const response = await ProgramApplicationReview.findOne({
            where:{uuid},
            include:{
                model: ProgramRequirement,
                // required: true,
            }
        })
        successResponse(res, response)
    } catch (error) {
        errorResponse(res, error)
    }
}

const getReviewersStatus = async(req, res) =>{
    try {
        const uuid = req.params.uuid
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit

        const {count, rows} = await User.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            distinct:true,
            where:{role:"customer"},
            include:{
                model: Business,
                where:{uuid},
                required: true
            },
            include:{
                model: ProgramApplicationReview,
                // required: true
            },
            attributes:{
                // exclude:["BusinessId"],

                // ProgramApplicationReview: title,type,
                // ProgramRequirement: name,ProgramApplicationReviewid
                // return ProgramApplicationReview + ProgramRequirement
                // ProgramApplicationReviewapplication: userid,ProgramApplicationReviewid,status(wait/reje/acce)
                // ProgramApplicationReviewappliccationdocument: ProgramApplicationReviewapplicationid,filelink,filename
                // ProgramApplicationReviewapplicationreview: ProgramApplicationReviewapplicationid,status,userid,feedback

                include: [
                    [
                        // SELECT userId
                        Sequelize.literal(`(
                            SELECT count(*)
                            FROM ProgramApplicationReviews AS ProgramApplicationReview
                            WHERE
                                userId = User.id
                        )`),
                        'status'
                    ],
                ],
            }
        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res, error)
    }
}


module.exports = {
    createProgramApplicationReview,updateProgramApplicationReview,deleteProgramApplicationReview,getUserProgramApplicationReview,getAllProgramApplicationReviews,getReviewersStatus,
    getBfaProgramApplicationReviews,getIraProgramApplicationReviews,getProgramApplicationReviewDetails,deleteProgramRequirement
}