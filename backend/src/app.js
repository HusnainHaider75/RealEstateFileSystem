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
const Multer = require('multer');

//Create New File
app.post("/createuser", async (req, res) => {
  const {
    RegistrationNo,
    IntinitationLetterSerial,
    BookingFormSerial,
    CreatedBy,
    Detail,
  } = req.body;
  const obj = new UserFilesModel({
    RegistrationNo,
    IntinitationLetterSerial,
    BookingFormSerial,
    CreatedBy,
    Status: true,
    Detail,
  });
  const UserCreated = await obj.save();
  try {
    UserCreated ? res.send(true) : res.send(false);
  } catch (err) {
    res.send(err);
  }
});

//Load All User's Files
app.get("/loaduser", async (req, res) => {
  const AllUser = await UserFilesModel.find({ Status: true });
  try {
    AllUser ? res.send(AllUser) : res.send(false);
  } catch {
    res.send();
  }
});

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
app.post(`/pagesetting`, async (req, res) => {

  SettingString = JSON.stringify(req.body);

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
      PageSettingString : SettingString
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

app.use('uploadimage', async (req, res) => {

})




//Listen from Server
app.listen(port, console.log("Server is Running at port-4000"));
