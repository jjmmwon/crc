import { TSensorDist, TSensorKey } from "@model";
import { create } from "zustand";

interface ISensorDistStore {
  sensorDist: TSensorDist;
  updateSensorDist: (key: TSensorKey, dist: number) => void;
}

const useSensorDistStore = create<ISensorDistStore>()((set) => ({
  sensorDist: Object.fromEntries(
    Array.from({ length: 49 }, (_, i) => [`sensor${i + 1}`, 0])
  ) as TSensorDist,

  updateSensorDist: (key: TSensorKey, dist: number) =>
    set((state) => ({
      sensorDist: {
        ...state.sensorDist,
        [key]: dist,
      },
    })),
}));

export default useSensorDistStore;
