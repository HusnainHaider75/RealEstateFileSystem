const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const bodyparser = require("body-parser");
app.use(bodyparser());
app.use(cors());
require("./connection/dbCon");
const UserFilesModel = require("./schema/UserFilesModel");
const SettingsModel = require("./schema/SettingsModel");
const MembersModel = require("./schema/MembersSchema");
const multer = require('multer');
app.use(express.static('./public/uploads'));


//Image Upload
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IntimationBackgroundPicture.jpg");
  }
});

const upload = multer({
  storage: storage,
}).single("myImage");

const storagebookingform = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "BookingFormBackgroundPicture.jpg");
  }
});

const uploadBookingForm = multer({
  storage: storagebookingform,
}).single("BookingFormBackgroundPicture");



//Create New File
app.post("/createfile", async (req, res) => {
  console.log(req.body);
  const {
    RegistrationNo,
    IntinitationLetterSerial,
    BookingFormSerial,
    CreatedBy,
    Detail,
    IssueDate
  } = req.body;
  const obj = new UserFilesModel({
    RegistrationNo,
    IntinitationLetterSerial,
    BookingFormSerial,
    CreatedBy,
    Status: true,
    Detail,
    IssueDate
  });
  const UserCreated = await obj.save();
  try {
    UserCreated ? res.send(true) : res.send(false);
  } catch (err) {
    res.send(err);
  }
});

//Load All User's Files
app.get("/loadfiles", async (req, res) => {
  const AllUser = await UserFilesModel.find({ Status: true });
  try {
    AllUser ? res.send(AllUser) : res.send(false);
  } catch {
    res.send(false);
  }
});

//Delete specific data
app.put(`/deleteuser/:id`, async (req, res) => {
  const DeleteUser = await UserFilesModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        Status: false,
      },
    }
  );

  try {
    DeleteUser ? res.send(true) : res.send(false);
  } catch {
    res.send();
  }
});

//Load Specific User's File For Update
app.get(`/loaduser/:id`, async (req, res) => {
  const UserData = await UserFilesModel.findOne({ _id: req.params.id });
  try {
    UserData ? res.send(UserData) : res.send(false);
  } catch {
    res.send();
  }
});

//update specific user
app.put(`/updateuser/:id`, async (req, res) => {
  const {
    RegistrationNo,
    IntinitationLetterSerial,
    BookingFormSerial,
    Detail,
  } = req.body;
  const UpdatedUser = await UserFilesModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        RegistrationNo,
        IntinitationLetterSerial,
        BookingFormSerial,
        Detail,
      },
    }
  );

  try {
    UpdatedUser ? res.send(true) : res.send(false);
  } catch {
    console.log("Something wrong");
  }
});


//Page Setting Alignment Attributes Load
app.get(`/loadpagesetting`, async (req, res) => {
  var size = 0;
  const PageSettingLoaded = await SettingsModel.find();
  PageSettingLoaded.map(() => {
    size = +1;
  })

  if (size > 0) {
    res.send(PageSettingLoaded)
  } else {
    res.send(false);
  }
});


//Change Values for fixing page Alignment (For QRCode)
app.post(`/pagesetting`, upload, async (req, res) => {

  console.log(req.body);
  let SettingString = JSON.stringify(req.body);
  let size = 0;
  const PageSettingExist = await SettingsModel.find();
  PageSettingExist.map(() => {
    size = +1;
  })

  if (size > 0) {
    const UpdatePageSetting = await SettingsModel.updateMany(
      {
        $set: {
          PageSettingString: SettingString
        },
      }
    )

    try {
      UpdatePageSetting ? res.send(true) : res.send(false);
    } catch {
      console.log("Something wrong");
    }
  }

  else {
    const obj = new SettingsModel({
      PageSettingString: SettingString
    });

    const UpdatePageSetting = obj.save();
    try {
      UpdatePageSetting ? res.send(true) : res.send(false);
    } catch (err) {
      res.send(err);
    }
  }

});


//Upload Image
app.post("/uploadintimationletter", upload, (req, res, err) => {

  if (!err)
    return res.send(200).end();
})
app.post("/uploadbookingform", uploadBookingForm, (req, res, err) => {

  if (!err)
    return res.send(200).end();
})


//Get Specific User's File Data
app.post(`/formdata`, async (req, res) => {
  if (req.body.type === "intimation") {
    const UserExist = await UserFilesModel.findOne({ RegistrationNo: req.body.registrationno, IntinitationLetterSerial: req.body.securitykey });
    try {
      UserExist ? res.send(UserExist) : res.send(false);
    } catch (err) {
      res.send(err);
    }
  }
  else {
    const UserExist = await UserFilesModel.findOne({ RegistrationNo: req.body.registrationno, BookingFormSerial: req.body.securitykey });
    try {
      UserExist ? res.send(UserExist) : res.send(false);
    } catch (err) {
      res.send(err);
    }
  }
});

//Load One File Data
app.get(`/loadfiledata/:RegNo`, async (req, res) => {
  const UserExist = await UserFilesModel.findOne({ RegistrationNo: req.params.RegNo });
  try {
    UserExist ? res.send(UserExist) : res.send(false);
  } catch (err) {
    res.send(err);
  }
});

//Add New Member
app.post("/addnewmember", async (req, res) => {
  console.log(req.body);
  const {
    FullName,
    FatherName,
    MembershipNo,
    CNIC,
    PhoneNo,
    Address
  } = req.body;
  const obj = new MembersModel({
    FullName,
    FatherName,
    MembershipNo,
    CNIC,
    PhoneNo,
    Address
  });
  const MemberCreated = await obj.save();
  try {
    MemberCreated ? res.send(true) : res.send(false);
  } catch (err) {
    res.send(err);
  }
});



//Listen from Server
app.listen(port, console.log(`Server is Running at port-${port}`));












// const jwt = require('express-jwt');
// const jwks = require('jwks-rsa');
// const axios = require('axios');


// //Auth0 Permissions and Roles Validation
// // var jwtCheck = jwt({
// //   secret: jwks.expressJwtSecret({
// //     cache: true,
// //     rateLimit: true,
// //     jwksRequestsPerMinute: 5,
// //     jwksUri: 'https://haiders715.us.auth0.com/.well-known/jwks.json'
// //   }),
// //   audience: 'https://royalgradencity/api',
// //   issuer: 'https://haiders715.us.auth0.com/',
// //   algorithms: ['RS256']
// // }).unless({ path: ['/'] })
// // app.use(jwtCheck);

// // app.get('/testapi', async (req, res) => {
// //     const accessToken = req.headers.authorization.split(' ')[1];
// //     const response = await axios.get('https://haiders715.us.auth0.com/userinfo',
// //       {
// //         headers: {
// //           Authorization: `Bearer ${accessToken}`
// //         }
// //       })
// //     const userInfo = response.data;
// //     console.log(userInfo)
// //     res.send(userInfo);

// // });
