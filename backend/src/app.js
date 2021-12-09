const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const bodyparser = require("body-parser");
app.use(bodyparser());
app.use(cors());
require("./connection/dbCon");
const path = require('path')
const UserFilesModel = require("./schema/UserFilesModel");
const SettingsModel = require("./schema/SettingsModel");
const MembersModel = require("./schema/MembersSchema");
var ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
app.use(express.static('./public/'));

//Intimation Background Image Upload
const storage = multer.diskStorage({
  destination: "./public/BackgroundImages",
  filename: function (req, file, cb) {
    cb(null, "IntimationBackgroundPicture.jpg");
  }
});

const upload = multer({
  storage: storage,
}).single("IntimationFormBackgroundPicture");

//Intimation Background Image Upload
const storagebookingform = multer.diskStorage({
  destination: "./public/BackgroundImages/",
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
    IssueDate,
    UserID: "",
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
  const AllFiles = await UserFilesModel.find({ Status: true });
  try {
    AllFiles ? res.send(AllFiles) : res.send(false);
  } catch {
    res.send(false);
  }
});

app.get("/loadfiles/:id", async (req, res) => {
  const AllFiles = await UserFilesModel.find({ UserID: req.params.id, Status: true });
  try {
    AllFiles ? res.send(AllFiles) : res.send(false);
  } catch {
    res.send(false);
  }
});

//Delete specific data
app.put(`/deletefile/:id`, async (req, res) => {
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
    const UserExist = await UserFilesModel.findOne({
      RegistrationNo: req.body.registrationno,
      IntinitationLetterSerial: req.body.securitykey
    });
    try {
      UserExist ? res.send(UserExist) : res.send(false);
    } catch (err) {
      res.send(err);
    }
  }
  else {
    const UserExist = await UserFilesModel.findOne({
      RegistrationNo: req.body.registrationno,
      BookingFormSerial: req.body.securitykey
    });
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


//Add New Member with Upload Image
const MemberStorage = multer.diskStorage({
  destination: "./public/memberpictures/",
  filename: function (req, file, cb) {
    cb(null, "ProfileImage" + Date.now() + path.extname(file.originalname));
  }
});

const uploadMemberPicture = multer({
  storage: MemberStorage,
}).single("ProfileImage");


app.post("/uploadprofileimage", uploadMemberPicture, async (req, res) => {
  try {
    res.send(req.file.filename)
  }
  catch (err) {
    res.send(err)
  }
});

//New Member
app.post("/addnewmember", async (req, res) => {
  const {
    FullName,
    FatherName,
    MembershipNo,
    CNIC,
    PhoneNo,
    Address,
    Picture,
  } = req.body;
  const obj = new MembersModel({
    FullName,
    FatherName,
    MembershipNo,
    CNIC,
    PhoneNo,
    Address,
    Picture,
    Status: true,
    PrefixReg: "RGC-2021-",
  });
  const MemberCreated = await obj.save();
  try {
    MemberCreated ? res.send(true) : res.send(false);
  } catch (err) {
    res.send(err);
  }

});


//Load All User's Files
app.get("/loadmembers", async (req, res) => {
  const AllMembers = await MembersModel.find({ Status: true });
  try {
    AllMembers ? res.send(AllMembers) : res.send(false);
  } catch {
    res.send(false);
  }
});


//Load One Specific Member
app.get("/loadonemember/:id", async (req, res) => {
  const MemberFound = await MembersModel.findOne({ _id: req.params.id });
  try {
    MemberFound ? res.send(MemberFound) : res.send(false);
  } catch {
    res.send();
  }
});

//Update Member
app.put(`/updatemember/:id`, async (req, res) => {
  console.log(req.body)
  const {
    FullName,
    FatherName,
    MembershipNo,
    CNIC,
    PhoneNo,
    Address,
    Picture
  } = req.body;
  const UpdatedMember = await MembersModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        FullName,
        FatherName,
        MembershipNo,
        CNIC,
        PhoneNo,
        Address,
        Picture
      },

    }
  );

  try {
    UpdatedMember ? res.send(true) : res.send(false);
  } catch {
    console.log("Something wrong");
  }
});

//Delete Member
app.put(`/deletemember/:id`, async (req, res) => {
  const DeleteUser = await MembersModel.findOneAndUpdate(
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

//Update Member
app.put(`/assignfile/:id`, async (req, res) => {

  const { RegistrationKey } = req.body;
  const RegistrationFound = await UserFilesModel.findOne({ RegistrationNo: RegistrationKey })
  if (!RegistrationFound) {
    res.send({ status: 101 })// RegNo Not Exist
  }
  else 
  {
    const UserIdFound = await UserFilesModel.findOne({ RegistrationNo: RegistrationKey, UserID:"" })
    if (!UserIdFound) 
    {
        res.send({ status: 102 })// UserId Already Exist
    }

    else 
    {
        const FileAssigned = await UserFilesModel.findOneAndUpdate(
          { RegistrationNo: RegistrationKey },
          {
            $set: {
              UserID: req.params.id,
            },

          }
          );

          try {
            FileAssigned ? res.send(true) : res.send(false);
          } catch (err){
            res.send(err)
          }
    }
  }

});





//Listen from Server
app.listen(port, console.log(`Server is Running at port-${port}`));


