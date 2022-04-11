import { query } from "./db";
import { Transaction } from "../types";
import { Schema, model } from 'mongoose';

type Setting = {
  //id: number;
  key: string;
  value: string;
};
const schema = new Schema<Setting>({
  key: {type:String, required: true},
  value: {type:String, required: true}
})

const SettingModel = model<Setting>('Setting', schema);

export const getSetting = async (key: string) => {
  // return await SettingModel.find({key:key});
  const result = await SettingModel.find({key:key}) as Setting[]
  return result.length ? result[0].value : null; 
};

export const setSetting = async (key: string, value: string) => {
  const createdSetting = await SettingModel.create({
    key:key,
    value:value
  })
  createdSetting.save();
};
