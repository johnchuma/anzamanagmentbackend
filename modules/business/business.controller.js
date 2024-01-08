const { errorResponse, successResponse } = require("../../utils/responses")
const {Business,User,BusinessSector} = require("../../models");
const { sendEmail } = require("../../utils/send_email");

const createBusiness = async(req,res)=>{
    try {
        const {
            // reviewer_uuid,
            registration,
            stage,
            problem,
            solution,
            team,
            business_sector_uuid,
            traction,
            // status,
        } = req.body;
        
        const user = req.user
        const businessSector = await BusinessSector.findOne({
            where:{
                uuid: business_sector_uuid
            }
        })
        const response = await Business.create({
            // reviewerId,
            registration,
            stage,
            problem,
            solution,
            team,
            userId:user.id,
            businessSectorId: businessSector.id,
            traction,
            // status,
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getUserBusiness = async(req,res)=>{
    try {
        const user = req.user
        const response = await Business.findOne({
            where:{
                userId:user.id
            }
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const updateBusiness = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const {status} = req.body
        const business = await Business.findOne({
            where:{
                uuid
            }
        });
        //find user
        const user = await User.findOne({
            where:{id:business.userId}
        })
        sendEmail(req, res, user, status)
        const response = await business.update(req.body)
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

// const applicationFeedbackEmail = async (req, res,user,status) => {
//     // res.status(200).send(user.email+","+status);
//     try {
//       let promises = []; // Array to hold promises
//       var subject = '',message = '';
//   var response;
//       switch (status) {
//         case "accepted":
//             subject = 'Your seller application to anza marketplace is accepted'
//             message = 'Hello '+user.name+',<br>This is to inform you that we have accepted your request to be a seller,<br>You can now start adding your products to Anza marketplace store.'
//         response =   await sendMail(user, subject, message, status);
//           break;
//         case "rejected":
//             subject = 'Your seller application to anza marketplace is rejected'
//             message = 'Hello '+user.name+',<br>This is to inform you that we have rejected your request to be a seller,<br>You can contact us for more information through phone: +255 000 000 0000,email: anza@email.com.'
//         response =   await sendMail(user, subject, message, status);
          
//           break;
//         default:
//           break;
//       }
  
//       await Promise.all(promises);
  
//       successResponse(res, response);
//     } catch (error) {
//       errorResponse(res, error);
//     }
// }

const deleteBusiness = async(req,res)=>{
    try {
        let {
            name
        } = req.body;
        const uuid = req.params.uuid
        const Business = await Business.findOne({
            where:{
                uuid
            }
        });
        const response = await Business.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getCategories = async(req,res)=>{
    try {
        const response = await Business.findAll()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getAllBusiness = async(req, res) =>{
    try {
        const response = await Business.findAll()
        successResponse(res, response)
    } catch (error) {
        errorResponse(res, error)
    }
}

const getApprovedBusiness = async(req, res) =>{
    try {
        let {page,limit} = req.query
        page = parseInt(page)
        limit = parseInt(limit)
        const offset = (page-1)*limit
        
        const {count, rows} = await Business.findAndCountAll({
            offset: offset, //ruka ngapi
            limit: limit, //leta ngapi
            distinct:true,
            where:{
                status: "accepted",
            },
            // attributes:{
            //     exclude: ["BusinessId"],
            //     include: [
            //         [
            //             Sequelize.literal(`(
            //                 SELECT AVG(rate)
            //                 FROM Reviews AS review
            //                 WHERE
            //                     productId = Product.id
            //             )`),
            //             'rating'
            //         ],
            //         [
            //             Sequelize.literal(`(
            //                 SELECT count(*)
            //                 FROM Reviews AS review
            //                 WHERE
            //                     productId = Product.id
            //             )`),
            //             'ratingCount'
            //         ]
            //     ],
            // },
            // include: {
            //     model:ProductImage,
            //     required: true,
            //     order: [
            //         ['createdAt', 'ASC']
            //     ],
            // }
        })
        const totalPages = (count%limit)>0?parseInt(count/limit)+1:parseInt(count/limit)
        successResponse(res, {count, data:rows, page, totalPages})
    } catch (error) {
        errorResponse(res, error)
    }
}

const getSellersApplications = async(req, res) =>{
    try {
        const response = await Business.findAll({
            where:{
                status:"waiting"
            },
            include: [User,BusinessSector]
        })
        successResponse(res, response)
    } catch (error) {
        errorResponse(res, error)
    }
}


module.exports = {
    createBusiness,updateBusiness,getCategories,deleteBusiness,getUserBusiness,getAllBusiness,getSellersApplications,getApprovedBusiness
}