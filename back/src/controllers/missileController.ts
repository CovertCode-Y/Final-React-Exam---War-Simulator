import Missile from "../models/Missile";
import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";

interface IMissileType extends Document {
  name: string;
  speed: number;
  description: string;
  intercepts: string[];
  price: number;
}

export const getAllMissiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const missiles = await Missile.find();
    res.json(missiles);
  } catch (error) {
    console.error("Error fetching missiles:", error);
    res.status(500).json({ message: 'שגיאה באחזור טילים' });
  }
};

export const launchMissile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, region, usedBy } = req.body;

    if (!mongoose.connection.db) {
      res.status(500).json({ message: "חיבור ל־MongoDB לא הושלם." });
      return;
    }

    const missileTypeData = await mongoose.connection.db
      .collection("missiles")
      .findOne({ name: type }) as IMissileType | null;

    if (!missileTypeData) {
      res.status(404).json({ message: "סוג הטיל לא נמצא במסד הנתונים" });
      return;
    }

    const newMissile = new Missile({
      type,
      region,
      interceptionSpeed: missileTypeData.speed,
      status: 'pending',
      usedBy,
      timeout: new Date(Date.now() + 60000)
    });

    await newMissile.save();

    res.status(201).json(newMissile);
  } catch (error) {
    console.error("שגיאה בשיגור הטיל:", error);
    res.status(500).json({ message: 'שגיאה בשיגור הטיל' });
  }
};

export const interceptMissile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { missileId, interceptorSpeed } = req.body;

    const missile = await Missile.findById(missileId);
    if (!missile) {
      res.status(404).json({ message: 'הטיל לא נמצא' });
      return;
    }

    if (interceptorSpeed >= missile.interceptionSpeed) {
      missile.status = 'hit';
    } else {
      missile.status = 'miss';
    }

    await missile.save();

    res.json({ message: 'היירוט הושלם', missile });
  } catch (error) {
    console.error("שגיאה ביירוט הטיל:", error);
    res.status(500).json({ message: 'שגיאה במהלך יירוט טילים' });
  }
};
