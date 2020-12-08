import { ModelDefineType, UniModel, ModelDefineArgsType, CsvSample, CsvDataset } from '@pipcook/pipcook-core';

const MyModelDefine: ModelDefineType = async (dataset: CsvDataset, args: ModelDefineArgsType): Promise<UniModel> => {
  const { recoverPath } = args;
  let model: any;

  if (recoverPath) {
    // load model
  }

  return {
    model: null,
    predict: function (sample: CsvSample) {
      // TODO
    }
  } as UniModel;
};

export default MyModelDefine;
