const express = require("express");
const {
  getCareers,
  getLocations,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} = require("../Controller/careerController");

const router = express.Router();

router.get("/locations", getLocations); // must be before "/:id"

router.route("/").get(getCareers).post(createCareer);

router.route("/:id").get(getCareerById).put(updateCareer).delete(deleteCareer);

module.exports = router;