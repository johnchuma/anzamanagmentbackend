const express = require('express')
const bodyParser = require("body-parser");

const UserRoutes =  require("./modules/user/user.routes")
const RoleRoutes =  require("./modules/role/role.routes")
const PermissionRoutes =  require("./modules/permission/permission.routes")
const UserRoleRoutes =  require("./modules/user_role/user_role.routes")
const UserPermissionRoutes =  require("./modules/user_permission/user_permission.routes")
const ApplicationRoutes =  require("./modules/application/application.routes")
const ApplicationReviewRoutes =  require("./modules/application_review/application_review.routes")
const AttachmentRoutes =  require("./modules/attachment/attachment.routes")
const BusinessRoutes =  require("./modules/business/business.routes")
const BusinessReviewRoutes =  require("./modules/business_review/business_review.routes")
// ********************
const ProductRoutes =  require("./modules/product/product.routes")
const WishlistRoutes =  require("./modules/wishlist/wishlist.routes")
const OrderRoutes =  require("./modules/order/order.routes")
const ProductImageRoutes =  require("./modules/product_image/product_image.routes")
const BusinessSectors =  require("./modules/sector/sector.routes")
const Reviews =  require("./modules/review/review.routes")
const Favourites =  require("./modules/favourite/favourite.routes")
const Promotions =  require("./modules/promotion/promotion.routes")
const Payments =  require("./modules/payment/payment.routes")
const Admin =  require("./modules/admin/admin.routes")
const Seller =  require("./modules/seller/seller.routes")
// const BusinessSectorRoutes =  require("./modules/business_sector/business_sector.routes")

const Subscription =  require("./modules/subscription/subscription.routes")
// ********************

const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static("files"));
app.use(bodyParser.text({ type: "/" }));

app.use("/user",UserRoutes)
app.use("/role",RoleRoutes)
app.use("/permission",PermissionRoutes)
app.use("/user_role",UserRoleRoutes)
app.use("/user_permission",UserPermissionRoutes)
app.use("/application",ApplicationRoutes)
app.use("/application_review",ApplicationReviewRoutes)
app.use("/attachment",AttachmentRoutes)
app.use("/business",BusinessRoutes)
// app.use("/business_sector",BusinessSectorRoutes)
app.use("/business_review",BusinessReviewRoutes)
// *************
app.use("/product",ProductRoutes)
app.use("/order",OrderRoutes)
app.use("/wishlist",WishlistRoutes)
app.use("/sector",BusinessSectors)
app.use("/review",Reviews)
app.use("/favourite",Favourites)
app.use("/promotion",Promotions)
app.use("/payment",Payments)
app.use("/admin",Admin)
app.use("/seller",Seller)
app.use("/subscription",Subscription)
// *************

app.get('/',(req,res)=>{
    res.send("Anza management system API's are okay!")
})
app.listen(5000,()=>{
  console.log("Server started at port 5000")
})