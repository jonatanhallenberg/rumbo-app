import SettingModel from './models/setting';

export const getSetting = async (key: string) => {
  const setting = await SettingModel.findOne({ key });
  return setting ? setting.value : null;
};

export const setSetting = async (key: string, value: string) => {
  const setting = await SettingModel.findOneAndUpdate({ key }, { key, value }, { upsert: true });
  return setting;
}