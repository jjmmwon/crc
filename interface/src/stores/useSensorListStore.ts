import { TSensorKey } from "@model";
import { create } from "zustand";

interface ISensorStore {
  sensorList: TSensorKey[];
  addSensor: (data: TSensorKey) => void;
}

const useSensorListStore = create<ISensorStore>()((set) => ({
  sensorList: [],
  addSensor: (data) =>
    set((state) => {
      const exists = state.sensorList.some((item) => item === data);

      // 이미 존재하면 제거
      if (exists) {
        return { sensorList: state.sensorList.filter((item) => item !== data) };
      }

      // 길이가 10이면 추가하지 않음
      if (state.sensorList.length >= 10) {
        return state;
      }

      // 새 데이터 추가
      return { sensorList: [...state.sensorList, data] };
    }),
}));

export default useSensorListStore;
