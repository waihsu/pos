import { Request, Response } from "express";
import { fileUpload } from "../utils/fileUpload";

export const imageUpload = async (req: Request, res: Response) => {
  try {
    fileUpload(req, res, async (error) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.status(200).json({ assetUrl });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
