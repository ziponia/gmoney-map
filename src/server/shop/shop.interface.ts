import { Document } from "mongoose";
import { GmoneyApiInterface } from "../gmoney/gmoney.interface";

export interface IShop extends GmoneyApiInterface {
  location: {
    type: "Point";
    coordinates: number[];
  };
}

export interface IShopDocument extends Document, IShop {
  distance: number;
}
