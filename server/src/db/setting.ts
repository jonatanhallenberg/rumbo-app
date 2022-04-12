import SettingModel from "./models/setting";

export const getSetting = async (key: string) => {
  return SettingModel.findOne({ key: key });
}

export const setSetting = async (key: string, value: string) => {
  const setting = await SettingModel.findOne({ key: key });
  if (setting) {
    setting.value = value;
    await setting.save();
  } else {
    await SettingModel.create({ key: key, value: value });
  }
}