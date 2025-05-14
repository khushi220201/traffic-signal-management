import { body } from "express-validator";

export const saveTrafficSignalConfigRules = [
  body("intersectionType")
    .isIn(["THREE_WAY", "FOUR_WAY_TYPE1", "FOUR_WAY_TYPE2", "FIVE_WAY"])
    .withMessage("Invalid intersectionType it must be one of THREE_WAY, FOUR_WAY_TYPE1, FOUR_WAY_TYPE2, FIVE_WAY"),

  body("signal1Time")
    .notEmpty()
    .withMessage("signal1Time is required")
    .isInt({ min: 10, max: 300 })
    .withMessage("signal1Time must be an integer between 10 and 300 seconds"),

  body("signal2Time")
    .notEmpty()
    .withMessage("signal2Time is required")
    .isInt({ min: 10, max: 300 })
    .withMessage("signal2Time must be an integer between 10 and 300 seconds"),

  body("signal3Time")
    .notEmpty()
    .withMessage("signal3Time is required")
    .isInt({ min: 10, max: 300 })
    .withMessage("signal3Time must be an integer between 10 and 300 seconds"),

  body("signal4Time")
    .if(
      body("intersectionType").isIn([
        "FOUR_WAY_TYPE1",
        "FOUR_WAY_TYPE2",
        "FIVE_WAY",
      ])
    )
    .notEmpty()
    .withMessage("signal4Time is required for this intersectionType")
    .isInt({ min: 10, max: 300 })
    .withMessage("signal4Time must be an integer between 10 and 300 seconds"),

  body("signal5Time")
    .if(body("intersectionType").equals("FIVE_WAY"))
    .notEmpty()
    .withMessage("signal5Time is required for FIVE_WAY")
    .isInt({ min: 10, max: 300 })
    .withMessage("signal5Time must be an integer between 10 and 300 seconds"),
];
