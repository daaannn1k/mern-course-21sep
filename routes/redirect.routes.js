import { Router } from "express";
import Link from "../models/Link.js";

const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      link.click++;
      await link.save();
      return res.redirect(link.from);
    }
    res.status(401).json({ message: "Link not found" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
  }
});

export default router;
